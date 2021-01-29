import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { StoreService } from '@core/services';
import { Observable, of } from 'rxjs';
import { filter, map, retry, retryWhen, switchMap } from 'rxjs/operators';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService implements CanLoad {
  constructor(
    private readonly store: StoreService,
    private readonly authguard: AuthGuardService
  ) {}
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.authguard.canLoad(route, segments).pipe(
      switchMap((passed) =>
        passed
          ? this.store.user$.pipe(
              filter((user) => user != null), //TODO should be !== undefined, no?!?!? Null means no user, wtf?
              map((user) => user.data.superadmin)
            )
          : of(false)
      )
    );
  }
}
