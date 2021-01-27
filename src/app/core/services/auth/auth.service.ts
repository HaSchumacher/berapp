import { Inject, Injectable, Optional } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserCredential, User } from '@firebase/auth-types';
import { Logger, LOGGER } from '@model/logging';
import { CanAuthenticate } from '@model/auth';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanAuthenticate {
  public readonly user$: Observable<User>;

  constructor(
    private readonly firebaseAuth: AngularFireAuth,
    @Inject(LOGGER) @Optional() private readonly logger: Logger
  ) {
    this.user$ = firebaseAuth.user.pipe(
      tap(({ email, uid }) => this.logger?.trace('User', { email, uid })),
      shareReplay(1)
    );
  }

  public async signIn(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  public async signup(email: string, password: string): Promise<any> {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  public async signOut(): Promise<void> {
    return this.firebaseAuth.signOut();
  }
}
