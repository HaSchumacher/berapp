import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserCredential, User } from '@firebase/auth-types';
import { CanAuthenticate } from '@model/auth';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanAuthenticate {
  public readonly user$: Observable<User>;

  constructor(private readonly firebaseAuth: AngularFireAuth) {
    this.user$ = firebaseAuth.user.pipe(shareReplay(1));
  }

  public async signIn(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string): Promise<any> {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.firebaseAuth.signOut();
  }
}
