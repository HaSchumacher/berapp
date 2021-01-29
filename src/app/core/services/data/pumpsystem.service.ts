import { Injectable } from '@angular/core';
import { Pumpsystem, Slot } from '@model/pumpsystem';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '@model/auth';
import firebase from '@firebase/app';
import '@firebase/firestore';
import { tap } from 'rxjs/operators';

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

  public getSlots(
    from: Date,
    to: Date,
    pumpsystemId: string,
    slotId: string
  ): Observable<Slot[]> {
    return this.firestore
      .collection(this.PUMPSYSTEM_COLLECTION)
      .doc(pumpsystemId)
      .collection<Slot>(slotId, (ref) =>
        ref.where('from', '<=', from).where('from', '<=', to)
      )
      .valueChanges();
  }
}
