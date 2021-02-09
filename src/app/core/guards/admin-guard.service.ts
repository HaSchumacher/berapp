import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { StoreService } from '@core/services';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService implements CanActivate {
  constructor(
    private readonly store: StoreService,
    private readonly authguard: AuthGuardService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authguard.canActivate(route, state).pipe(
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
