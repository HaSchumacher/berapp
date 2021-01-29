import { Injectable } from '@angular/core';
import { Pumpsystem } from '@model/pumpsystem';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '@model/auth';
import firebase from '@firebase/app';
import '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class PumpsystemService {
  private readonly PUMPSYSTEM_COLLECTION: string = 'pumpsystems';
  private readonly ID_MAPPER: string;

  constructor(private readonly firestore: AngularFirestore) {
    let helper: Pick<Pumpsystem, 'id'> = { id: null };
    this.ID_MAPPER = Object.keys(helper)[0];
  }

  public getPumpSystems(of: User): Observable<Pumpsystem[]> {
    if (of == null || of.data == null || of.data.permissions == null)
      throw new Error(`No permissions in ${of}`);
    return this.firestore
      .collection<Pumpsystem>(this.PUMPSYSTEM_COLLECTION, (ref) =>
        ref.where('__name__', 'in', Object.keys(of.data.permissions))
      )
      .valueChanges({ idField: this.ID_MAPPER });
  }
}
