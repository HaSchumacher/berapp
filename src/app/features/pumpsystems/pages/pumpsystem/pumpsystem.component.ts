import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PumpsystemService, StoreService } from '@core/services';
import { PUMPSYSTEM_QUERY_PARAM_ID } from '@features/pumpsystems/routes/routes';
import { Pumpsystem, Slot, Slots } from '@model/pumpsystem';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, mergeAll, pluck, scan, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pumpsystem',
  templateUrl: './pumpsystem.component.html',
  styleUrls: ['./pumpsystem.component.scss'],
})
export class PumpsystemComponent implements OnInit {
  private _pumpsystem$: Observable<Pumpsystem>;
  private _slots$: Observable<{ id: string; slots: Slots }[]>;

  constructor(
    private readonly route: ActivatedRoute,
    public readonly store: StoreService,
    private readonly pumpsystems: PumpsystemService
  ) {}

  ngOnInit(): void {
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
    this._slots$ = this.pumpsystem$.pipe(
      switchMap((pumpsystem) =>
        combineLatest(
          pumpsystem.slots.map((slot) =>
            this.pumpsystems
              .getSlots(new Date(), new Date(), pumpsystem.id, slot)
              .pipe(map((slots) => ({ id: slot, slots })))
          )
        )
      )
    );
  }

  public get pumpsystem$(): Observable<Pumpsystem> {
    return this._pumpsystem$;
  }

  public get slots$(): Observable<{ id: string; slots: Slots }[]> {
    return this._slots$;
  }
}
