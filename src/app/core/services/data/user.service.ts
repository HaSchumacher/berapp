import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserData } from '@model/auth';
import { Observable } from 'rxjs';
import { User } from '@firebase/auth-types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly USERS_COLLECTION: string = 'users';

  constructor(private readonly firestore: AngularFirestore) {}

  public getUserData(of: User): Observable<UserData> {
    if (of == null || of.uid == null) throw new Error('uid undefined');
    else
      return this.firestore
        .collection<UserData>(this.USERS_COLLECTION)
        .doc<UserData>(of.uid)
        .valueChanges();
  }
}
