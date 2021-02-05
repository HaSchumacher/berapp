import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PumpsystemService, StoreService } from '@core/services';
import { PUMPSYSTEM_QUERY_PARAM_ID } from '@features/pumpsystems/routes/routes';
import { Pumpsystem, Slot, SlotData } from '@model/pumpsystem';
import { addDays, isNonNull } from '@utilities';
import { combineLatest, Observable } from 'rxjs';
import {
  filter,
  map,
  pluck,
  startWith,
  switchMap,
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
  private _slots$: Observable<Slot[]>;

  private readonly controlName_from: string = 'from';
  private readonly controlName_to: string = 'to';

  public readonly timelineForm: FormGroup = new FormGroup({
    [this.controlName_from]: new FormControl(new Date()),
    [this.controlName_to]: new FormControl(
      addDays(new Date(), this.pumpsystemService.SLOT_MAX_RANGE)
    ),
  });

  constructor(
    private readonly route: ActivatedRoute,
    public readonly store: StoreService,
    private readonly pumpsystemService: PumpsystemService
  ) {}

  public ngOnInit(): void {
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
    this._slots$ = this.toControl.valueChanges.pipe(
      startWith(addDays(new Date(), this.pumpsystemService.SLOT_MAX_RANGE)),
      withLatestFrom(
        this.fromControl.valueChanges.pipe(startWith(new Date())),
        this.pumpsystem$,
        (to, from, pumpsystem) => ({ to, from, pumpsystem })
      ),
      filter(
        ({ from, to, pumpsystem }) =>
          isNonNull(from) && isNonNull(to) && isNonNull(pumpsystem)
      ),
      switchMap(({ from, to, pumpsystem }) =>
        combineLatest(
          pumpsystem.slots.map((id) =>
            this.pumpsystemService.getSlotsWithIn(
              new Date(from),
              new Date(to),
              pumpsystem.id,
              id
            )
          )
        )
      )
    );
  }

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

  public get slots$(): Observable<Slot[]> {
    return this._slots$;
  }

  public get toControl(): FormControl {
    return this.timelineForm.controls[this.controlName_to] as FormControl;
  }

  public get fromControl(): FormControl {
    return this.timelineForm.controls[this.controlName_from] as FormControl;
  }
}