import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '@model/auth';
import { FieldTemplate } from '@model/fieldTemplate';
import { isNonNull } from '@utilities';
import { concat, EMPTY, forkJoin, from, merge, Observable } from 'rxjs';
import { concatAll, filter, map, mergeAll, mergeMap, share, take, tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FieldTemplatesService {
  private readonly FIELDTEMPLATES: string = 'fieldTemplates';
  
  constructor(private readonly firestore: AngularFirestore, private readonly userService: UserService) {
  }
  
  //Return Observable for ten or less fields
  private fieldsHelper (of: User, arr: String[]) :Observable<FieldTemplate[]> {
    return this.firestore.collection<FieldTemplate>(
      this.FIELDTEMPLATES, (ref) => ref.where('__name__', 'in', arr))
      .valueChanges().pipe(share())
  }

  private splitArrayBySize (arr, size) {
    return arr.reduce((acc, val, i) => {
      let idx = Math.floor(i / size)
      let page = acc[idx] || (acc[idx] = [])
      page.push(val)
  
      return acc
    }, [])
  }
  
  //  Paginate when more then 10 values in fields !!!
   public getFields(of: User): Observable<FieldTemplate[]> {
    if (of == null || of.data == null || of.data.permissions == null)
      throw new Error(`No permissions in ${of}`);
      if(of.data.fields.length > 10){
        // building pagination for Fields
        const fieldarray = of.data.fields
        const pages:string[][] = this.splitArrayBySize(fieldarray, 10);
        return forkJoin(
          pages.map((page) => this.fieldsHelper(of,page))
          ).pipe(mergeMap(fields => fields))
            // map((fields) => flatten Array in Observer to match expection fields.reduce((sum,curr) => [...sum,...curr],[])
        
      } else {
        return this.fieldsHelper(of, of.data.fields);
      }
   }

   

   
   public addTemplate( template:FieldTemplate, of: User)  {
     if(
       template == null ||
       template.fieldRegion ==null ||
      
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
        const updatedarray = of.data.fields;
        /**update user object fields array 
         * update only partianal
         */
        ref.set(newdoc.ref, template).set(userref ,{fields: updatedarray}, {merge: true})
        
      })
    }
}
