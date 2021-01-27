import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { StoreService } from '@core/services';
import { AuthDialog } from '@shared/auth';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanLoad {
  constructor(
    private readonly store: StoreService,
    private readonly authDialog: AuthDialog
  ) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.store.user$.pipe(
      filter((user) => user !== undefined),
      map((user) => !!user),
      switchMap((authenticated) =>
        authenticated
          ? of(true)
          : this.authDialog.open().pipe(map((data) => !!data))
      )
    );
  }
}
