import { Injectable } from '@angular/core';
import { User } from '@firebase/auth-types';
import { BehaviorSubject, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { AuthService } from '../auth';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _appName: string = 'berapp';
  private _user$: Observable<User>;

  constructor(private readonly auth: AuthService) {
    this._user$ = this.auth.user$.pipe(startWith(undefined as User));
  }

  public get appName(): string {
    return this._appName;
  }

  /**
   * undefinied until calculated, else user or null if does not exists
   */
  public get user$(): Observable<User> {
    return this._user$;
  }
}
