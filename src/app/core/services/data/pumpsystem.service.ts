import { Injectable } from '@angular/core';
import { Pumpsystem, Slot, SlotData } from '@model/pumpsystem';
import { forkJoin, Observable, throwError } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '@model/auth';
import '@firebase/firestore';
import { map, share, switchMap, take } from 'rxjs/operators';
import { addDays } from '@utilities/date';
import { isNonNull } from '@utilities';

@Injectable({
  providedIn: 'root',
})
export class PumpsystemService {
  private readonly PUMPSYSTEM_COLLECTION: string = 'pumpsystems';
  private readonly ID_MAPPER: string;
  /**
   * 3 Days
   */
  public readonly SLOT_MAX_RANGE: number = 3;

  constructor(private readonly firestore: AngularFirestore) {
    let helper: Pick<Pumpsystem, 'id'> = { id: null };
    this.ID_MAPPER = Object.keys(helper)[0];
  }
  /**TODO query 'in' applicable for only 10 values 
   * workaround split query at 10 
  */
  public getPumpSystems(of: User): Observable<Pumpsystem[]> {
    if (of == null || of.data == null || of.data.permissions == null)
      throw new Error(`No permissions in ${of}`);
    return this.firestore
      .collection<Pumpsystem>(this.PUMPSYSTEM_COLLECTION, (ref) =>
        ref.where('__name__', 'in', Object.keys(of.data.permissions))
      )
      .valueChanges({ idField: this.ID_MAPPER })
      .pipe(share());
  }

  /**
   *
   * @param from
   * @param to
   * @param pumpsystemId
   * @param slotId
   */
  public getSlotsWithIn(
    from: Date,
    to: Date,
    pumpsystemId: string,
    slotId: string
  ): Observable<Slot> {
    const requestedRange: number = to.getTime() - from.getTime();
    if (requestedRange < 0)
      throw new Error(
        `${to.toDateString()} must be greater or equal than ${from.toDateString()}`
      );
    if (requestedRange > 1000 * 60 * 60 * 24 * this.SLOT_MAX_RANGE)
      throw new Error(
        `Cant request a range greater than ${this.SLOT_MAX_RANGE} days`
      );
    return this.firestore
      .collection(this.PUMPSYSTEM_COLLECTION)
      .doc(pumpsystemId)
      .collection<SlotData>(slotId, (ref) =>
        ref
          .where('from', '>=', addDays(from, -this.SLOT_MAX_RANGE))
          .where('from', '<=', to)
      )
      .valueChanges()
      .pipe(
        map((data) =>
          data.map((x: any) => ({
            by: x.by,
            from: x.from.toDate(),
            to: x.to.toDate(),
          }))
        ),
        map((data) => ({ id: slotId, data })),
        share()
      );
  }

  public addSlot(data: SlotData, pumpsystem: Pumpsystem): Observable<void> {
    if (
      data == null ||
      data.from == null ||
      data.to == null ||
      data.by == null ||
      pumpsystem == null ||
      pumpsystem.id == null ||
      pumpsystem.slots == null
    )
      throw new Error('Arguments must not be nullable!');
    return forkJoin(
      pumpsystem.slots.map((slot) =>
        this.getSlotsWithIn(data.from, data.to, pumpsystem.id, slot).pipe(
          take(1)
        )
      )
    ).pipe(
      map((slots) => {
        const freeSlots: Slot[] = slots.filter(
          (slot) =>
            !slot.data.some(
              (x) =>
                // overlap
                data.to.getTime() >= x.from.getTime() &&
                data.from.getTime() <= x.to.getTime()
            )
        );
        // find best slot: least time wasted to last and next slot
        if (freeSlots.length == 0) throw new Error('No free Slots');
        else
          return freeSlots.reduce((best, current) => {
            const bestLast: SlotData = best.data
              .filter((x) => x.to.getTime() < data.to.getTime())
              .reduce(
                (last, current) =>
                  (last =
                    current.to.getTime() > last.to.getTime() ? current : last),
                {
                  by: null,
                  to: addDays(data.to, -this.SLOT_MAX_RANGE),
                  from: null,
                }
              );

            const bestNext: SlotData = best.data
              .filter((x) => x.from.getTime() > data.from.getTime())
              .reduce(
                (last, current) =>
                  (last =
                    current.from.getTime() < last.from.getTime()
                      ? current
                      : last),
                {
                  by: null,
                  from: addDays(data.from, this.SLOT_MAX_RANGE),
                  to: null,
                }
              );

            const currentLast: SlotData = current.data
              .filter((x) => x.to.getTime() < data.to.getTime())
              .reduce(
                (last, current) =>
                  (last =
                    current.to.getTime() > last.to.getTime() ? current : last),
                {
                  by: null,
                  to: addDays(data.to, -this.SLOT_MAX_RANGE),
                  from: null,
                }
              );

            const currentNext: SlotData = current.data
              .filter((x) => x.from.getTime() > data.from.getTime())
              .reduce(
                (last, current) =>
                  (last =
                    current.from.getTime() < last.from.getTime()
                      ? current
                      : last),
                {
                  by: null,
                  from: addDays(data.from, this.SLOT_MAX_RANGE),
                  to: null,
                }
              );

            const bestRangeToLast = data.from.getTime() - bestLast.to.getTime();
            const bestRangeToNext = bestNext.from.getTime() - data.to.getTime();
            const currentRangeToLast =
              data.from.getTime() - currentLast.to.getTime();
            const currentRangeToNext =
              currentNext.from.getTime() - data.to.getTime();

            return bestRangeToLast + bestRangeToNext >
              currentRangeToLast + currentRangeToNext
              ? current
              : best;
          });
      }),
      switchMap((slot) =>
        this.firestore
          .collection(this.PUMPSYSTEM_COLLECTION)
          .doc(pumpsystem.id)
          .collection(slot.id)
          .add(data)
          .then((_) => null)
      )
    );
  }
}
