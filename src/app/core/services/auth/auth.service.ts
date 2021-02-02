import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserCredential, User } from '@firebase/auth-types';
import { AuthTask, CanAuthenticate } from '@model/auth';
import { Observable, Subject } from 'rxjs';
import { shareReplay, startWith } from 'rxjs/operators';

export interface AuthTaskInfo {
  success: boolean;
  task: AuthTask;
  error?: Error;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanAuthenticate {
  public readonly user$: Observable<User>;
  private readonly _task$: Subject<AuthTaskInfo> = new Subject<AuthTaskInfo>();
  /**
   * Latest auth task
   */
  public readonly task$: Observable<AuthTaskInfo> = this._task$
    .asObservable()
    .pipe(shareReplay(1));

  constructor(private readonly firebaseAuth: AngularFireAuth) {
    this.user$ = firebaseAuth.user.pipe(
      startWith(undefined as User),
      shareReplay(1)
    );
  }

  public async signIn(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((credentials) => {
        this._task$.next({ success: true, task: AuthTask.SIGN_IN });
        return credentials;
      })
      .catch((error) => {
        this._task$.next({ error, success: false, task: AuthTask.SIGN_IN });
        throw error;
      });
  }

  public async signup(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        this._task$.next({ success: true, task: AuthTask.SIGN_UP });
        return credentials;
      })
      .catch((error) => {
        this._task$.next({ error, success: false, task: AuthTask.SIGN_UP });
        throw error;
      });
  }

  public async signOut(): Promise<void> {
    return this.firebaseAuth
      .signOut()
      .then(() => this._task$.next({ success: true, task: AuthTask.SIGN_OUT }))
      .catch((error) => {
        this._task$.next({ error, success: false, task: AuthTask.SIGN_OUT });
        throw error;
      });
  }
}
