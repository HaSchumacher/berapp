import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PumpsystemService, StoreService, UserService } from '@core/services';
import { SlotDataDialogService } from '@features/pumpsystems/components';
import { TimeLineData } from '@features/pumpsystems/components/slots-timeline';
import { PUMPSYSTEM_QUERY_PARAM_ID } from '@features/pumpsystems/routes/routes';
import { Pumpsystem, SlotData, SlotDataItem } from '@model/pumpsystem';
import { add, getStartOfToday, isNonNull } from '@utilities';
import { combineLatest, Observable, of } from 'rxjs';
import {
  filter,
  map,
  mapTo,
  pluck,
  startWith,
  switchMap,
  switchMapTo,
  take,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

@Component({
  selector: 'app-pumpsystem',
  templateUrl: './pumpsystem.component.html',
  styleUrls: ['./pumpsystem.component.scss'],
})
export class PumpsystemComponent implements OnInit {
  private _pumpsystem$: Observable<Pumpsystem>;
  private _timeLineData$: Observable<TimeLineData>;
  private _userNameCache: Map<string, string> = new Map<string, string>();

  private readonly controlName_from: string = 'from';
  private readonly controlName_to: string = 'to';

  private readonly initialFromValue: Date = getStartOfToday();
  private readonly initialToValue: Date = add(
    getStartOfToday(),
    this.pumpsystemService.SLOT_MAX_RANGE - 1
  );

  public readonly timelineForm: FormGroup = new FormGroup({
    [this.controlName_from]: new FormControl(this.initialFromValue),
    [this.controlName_to]: new FormControl(this.initialToValue),
  });

  constructor(
    private readonly route: ActivatedRoute,
    public readonly store: StoreService,
    private readonly pumpsystemService: PumpsystemService,
    private readonly userService: UserService,
    public readonly slotDataDialog: SlotDataDialogService
  ) {}

  public ngOnInit() {
    this._pumpsystem$ = this.route.queryParams.pipe(
      pluck(PUMPSYSTEM_QUERY_PARAM_ID),
      switchMap((id) =>
        this.store.pumpSystems$.pipe(
          map((pumpsystems) =>
            pumpsystems.find((pumpsystem) => pumpsystem.id === id)
          )
        )
      )
    );

    //this.timelineForm.valueChanges controls fire values weird
    this._timeLineData$ = this.toControl.valueChanges.pipe(
      startWith(this.initialToValue),

      withLatestFrom(
        this.fromControl.valueChanges.pipe(startWith(this.initialFromValue)),
        this.pumpsystem$,
        (to, from, pumpsystem) => ({ to, from, pumpsystem })
      ),
      filter(
        ({ from, to, pumpsystem }) =>
          isNonNull(from) && isNonNull(to) && isNonNull(pumpsystem)
      ),
      map((args) => ({
        ...args,
        to: add(args.to, 1),
      })),
      switchMap(({ from, to, pumpsystem }) => {
        try {
          return combineLatest(
            pumpsystem.slots.map((id) =>
              this.pumpsystemService
                .getSlotsWithIn(from, to, pumpsystem.id, id)
                .pipe(
                  switchMap(async (slot) => {
                    const userIds: Set<string> = new Set<string>();

                    slot.data
                      .map((data) => data.by)
                      .filter(isNonNull)
                      .forEach((id) => userIds.add(id));

                    const unknownIds: string[] = Array.from(
                      userIds.values()
                    ).filter((id) => !this._userNameCache.has(id));

                    await Promise.all(
                      unknownIds.map((id) =>
                        this.userService
                          .getData({ uid: id } as any)
                          .pipe(
                            take(1),
                            tap((user) =>
                              this._userNameCache.set(user.id, user.name)
                            )
                          )
                          .toPromise()
                      )
                    );
                    return slot;
                  })
                )
            )
          ).pipe(
            map((slots) => ({
              from,
              to,
              slots: slots.sort((a, b) => a.id.localeCompare(b.id)),
            }))
          );
        } catch (error) {
          console.error('TODO handle error', error);
          return of(null);
        }
      })
    );
  }

  public readonly dataLabelFn: (data: SlotData) => string = ({
    by,
  }: SlotData) => this._userNameCache.get(by) ?? 'Unknown';

  public addSlot(data: SlotData, pumpsystem: Pumpsystem): void {
    this.store.user$
      .pipe(
        switchMap((user) =>
          this.pumpsystemService.addSlot({ ...data, by: user.uid }, pumpsystem)
        )
      )
      .subscribe();
  }

  public get pumpsystem$(): Observable<Pumpsystem> {
    return this._pumpsystem$;
  }

  public get timeLineData$(): Observable<TimeLineData> {
    return this._timeLineData$;
  }

  public get toControl(): FormControl {
    return this.timelineForm.controls[this.controlName_to] as FormControl;
  }

  public get fromControl(): FormControl {
    return this.timelineForm.controls[this.controlName_from] as FormControl;
  }

  public openSlotDataDialog(item: SlotDataItem) {
    const closed$ = this.slotDataDialog.open(item);
    this.slotDataDialog.deleteClick$
      .pipe(
        takeUntil(closed$),
        withLatestFrom(this.pumpsystem$),
        switchMap(([data, pumpsystem]) =>
          this.pumpsystemService
            .deleteSlot(data, pumpsystem)
            .pipe(mapTo(this.slotDataDialog.close()))
        )
      )
      .subscribe();
  }
}
