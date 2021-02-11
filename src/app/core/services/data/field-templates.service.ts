import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '@model/auth';
import { FieldTemplate } from '@model/fieldTemplate';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FieldTemplatesService {
  private readonly FIELDTEMPLATES: string = 'fieldTemplates';
  
  
  constructor(private readonly firestore: AngularFirestore, private readonly userService: UserService) {
  }
   
   public getFields(of: User): Observable<FieldTemplate[]> {
    if (of == null || of.data == null || of.data.permissions == null)
      throw new Error(`No permissions in ${of}`);
    return this.firestore.collection<FieldTemplate>(this.FIELDTEMPLATES, (ref) => 
      ref.where('__name__', 'in', of.data.fields)
    )
    .valueChanges()
    .pipe(share());
   }

   public addTemplate( template:FieldTemplate, of: User) {
    if(
      template == null ||
      template.fieldRegion ==null ||
      template.id == null ||
      template.name == null||
      of.data == null ||
      of == null||
      of.data.fields ==null 
    ) throw new Error ('Given Arguments must not be nullable!');

    this.firestore.firestore.runTransaction( async ref => 
      {
        //**set Template and get id?
        const newdoc = this.firestore.collection(this.FIELDTEMPLATES).doc();
        const userref = this.firestore.collection(this.userService.USERS_COLLECTION).doc(of.data.id).ref;
        of.data.fields.push(newdoc.ref.id);
        /**update user object fields array 
         * update only partianal
        */
        ref.set(newdoc.ref, template).update(userref, of);
        
      })

   }

}
