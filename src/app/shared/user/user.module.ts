import { NgModule } from '@angular/core';
import { CoreModule } from '@shared/core';
import { UserTableComponent } from './user-table';
import { UserSelectPermissionsComponent } from './user-select-permissions';
import { UserVerifiedCheckboxComponent } from './user-verified-checkbox/user-verified-checkbox.component';

@NgModule({
  declarations: [UserTableComponent, UserSelectPermissionsComponent, UserVerifiedCheckboxComponent],
  imports: [CoreModule],
  exports: [UserTableComponent],
})
export class UserModule {}
