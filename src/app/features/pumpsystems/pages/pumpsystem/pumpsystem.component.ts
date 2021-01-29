import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '@core/services';
import { PUMPSYSTEM_QUERY_PARAM_ID } from '@features/pumpsystems/routes/routes';
import { Pumpsystem } from '@model/pumpsystem';
import { Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pumpsystem',
  templateUrl: './pumpsystem.component.html',
  styleUrls: ['./pumpsystem.component.scss'],
})
export class PumpsystemComponent implements OnInit {
  private _pumpsystem$: Observable<Pumpsystem>;

  constructor(
    private readonly route: ActivatedRoute,
    public readonly store: StoreService
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
  }

  public get pumpsystem$(): Observable<Pumpsystem> {
    return this._pumpsystem$;
  }
}
