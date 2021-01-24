import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserCredential } from '@firebase/auth-types';
import { CanAuthenticate } from '@model/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanAuthenticate {
  constructor(private readonly firebaseAuth: AngularFireAuth) {}

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
