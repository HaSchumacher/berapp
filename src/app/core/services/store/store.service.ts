import { Inject, Injectable, Optional } from '@angular/core';
import { LOGGER, Logger, Pumpsystem, User } from '@model';
import { PumpsystemService, UserService } from '@core/services/data';
import { AuthService } from '@core/services/auth';
import { Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { isNonNull } from '@utilities';
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly _appName: string = 'berapp';
  private _user$: Observable<User>;
  private _pumpsystems$: Observable<Pumpsystem[]>;

  constructor(
    private readonly auth: AuthService,
    private readonly user: UserService,
    private readonly pumpsystem: PumpsystemService,
    @Inject(LOGGER) @Optional() private readonly logger: Logger
  ) {
    this._user$ = this.auth.user$.pipe(
      switchMap((user) =>
        isNonNull(user)
          ? this.user.getData(user).pipe(map((data) => ({ data, ...user })))
          : of(user)
      ),
      tap((user) => this.logger?.trace('User', user?.data)),
      shareReplay(1)
    );
    this._pumpsystems$ = this.user$.pipe(
      switchMap((user) =>
        isNonNull(user) ? this.pumpsystem.getPumpSystems(user) : of(null)
      ),
      tap((pumpsystems) => this.logger?.trace('Pumpsystems', pumpsystems)),
      shareReplay(1)
    );
  }

  public get appName(): string {
    return this._appName;
  }

  public get pumpSystems$(): Observable<Pumpsystem[]> {
    return this._pumpsystems$;
  }

  /**
   * undefinied until calculated, else user or null if does not exists
   */
  public get user$(): Observable<User> {
    return this._user$;
  }
}
