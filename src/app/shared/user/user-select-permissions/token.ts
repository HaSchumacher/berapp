import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const USER_SELECT_ROLES_DATA: InjectionToken<
  Observable<any[]>
> = new InjectionToken<Observable<any[]>>('');
