import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { StoreService } from '@core/services';
import { AuthDialog } from '@shared/auth';
import { isNonNull } from '@utilities/isNonNull';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private readonly store: StoreService,
    private readonly authDialog: AuthDialog
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.user$.pipe(
      filter((user) => user !== undefined),
      switchMap((user) =>
        isNonNull(user)
          ? of(true)
          : this.authDialog.open().pipe(map((data) => !!data))
      )
    );
  }
}
