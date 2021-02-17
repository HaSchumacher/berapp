import { Injectable } from '@angular/core';
import { Pumpsystem, Slot, SlotData, SlotDataItem } from '@model/pumpsystem';
import { combineLatest, forkJoin, from, Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '@model/auth';
import '@firebase/firestore';
import { map, share, shareReplay, switchMap, take } from 'rxjs/operators';
import { add, divide, flatten, isNonNull } from '@utilities';
import { environment } from '@environment';
import { ID_MAPPER } from './IdMapper';
import { AuthService } from '../auth';

@Injectable({
  providedIn: 'root',
})
export class PumpsystemService {
  private readonly PUMPSYSTEM_COLLECTION: string = 'pumpsystems';
  /**
   * 3 Days
   */
  public readonly SLOT_MAX_RANGE: number = 3;

  constructor(private readonly firestore: AngularFirestore) {}

  public getPumpSystems(of: User): Observable<Pumpsystem[]> {
    if (of == null || of.data == null || of.data.permissions == null)
      throw new Error(`No permissions in ${of}`);
    return combineLatest(
      divide(
        Object.keys(of.data.permissions),
        environment.firebase.firestore.whereQuery_IN_maxArrayLength
      ).map((chunk) =>
        this.firestore
          .collection<Pumpsystem>(this.PUMPSYSTEM_COLLECTION, (ref) =>
            ref.where('__name__', 'in', chunk)
          )
          .valueChanges({ idField: ID_MAPPER })
          .pipe(shareReplay(1))
      )
    ).pipe(map(flatten));
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
          .where('from', '>=', add(from, -this.SLOT_MAX_RANGE))
          .where('from', '<=', to)
      )
      .valueChanges({ idField: ID_MAPPER })
      .pipe(
        map((data) =>
          data.map((x: any) => ({
            ...x,
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
                data.to.getTime() > x.from.getTime() &&
                data.from.getTime() < x.to.getTime()
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
                  to: add(data.to, -this.SLOT_MAX_RANGE),
                  from: null,
                  id: null,
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
                  from: add(data.from, this.SLOT_MAX_RANGE),
                  to: null,
                  id: null,
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
                  to: add(data.to, -this.SLOT_MAX_RANGE),
                  from: null,
                  id: null,
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
                  from: add(data.from, this.SLOT_MAX_RANGE),
                  to: null,
                  id: null,
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

  public deleteSlot(
    slot: SlotDataItem,
    pumpsystem: Pumpsystem
  ): Observable<void> {
    return from(
      this.firestore
        .collection(this.PUMPSYSTEM_COLLECTION)
        .doc(pumpsystem.id)
        .collection(slot.slotId)
        .doc(slot.id)
        .delete()
    );
  }
}
