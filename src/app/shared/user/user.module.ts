import { NgModule } from '@angular/core';
import { CoreModule } from '@shared/core';
import { UserTableComponent } from './user-table';
import { UserSelectPermissionsComponent } from './user-select-permissions';

@NgModule({
  declarations: [UserTableComponent, UserSelectPermissionsComponent],
  imports: [CoreModule],
  exports: [UserTableComponent],
})
export class UserModule {}
