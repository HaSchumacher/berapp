import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserData } from '@model/auth';
import { from, Observable } from 'rxjs';
import { User } from '@firebase/auth-types';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly USERS_COLLECTION: string = 'users';
  private readonly ROLES_COLLECTION: string = 'roles';
  private readonly ID_MAPPER: string;
  public readonly roles: Observable<string[]>;

  constructor(private readonly firestore: AngularFirestore) {
    let helper: Pick<UserData, 'id'> = { id: null };
    this.ID_MAPPER = Object.keys(helper)[0];
    this.roles = this.firestore
      .collection(this.ROLES_COLLECTION)
      .valueChanges({ idField: 'role' })
      .pipe(
        map((roles) => roles.map((wrapper) => wrapper.role)),
        shareReplay(1)
      );
  }

  public getData(of: User): Observable<UserData> {
    if (of == null || of.uid == null) throw new Error('uid undefined');
    else
      return this.firestore
        .collection<UserData>(this.USERS_COLLECTION)
        .doc<UserData>(of.uid)
        .valueChanges();
  }

  /** TODO impl pagination
   *
   * @param limit
   * @param startAt
   */
  public getUserData(): Observable<UserData[]> {
    //(startAt?: DocumentSnapshot<User>
    //limit: number = 25, filter?:string/Userdata/email/name/id??
    return this.firestore
      .collection<UserData>(this.USERS_COLLECTION)
      .valueChanges({ idField: this.ID_MAPPER });
  }

  public updateUserData(value: UserData): Observable<void> {
    if (value == null || value.id == null) throw new Error('id undefined');
    else
      return from(
        this.firestore
          .collection(this.USERS_COLLECTION)
          .doc(value.id)
          .update(value)
      );
  }
}
