import { NgModule } from '@angular/core';

import { AdminRoutingModule } from '@features/admin/routes';
import {
  OverviewComponent,
  PumpsystemsComponent,
  UsersComponent,
} from '@features/admin/pages';
import { CoreModule } from '@shared/core';
import { UserModule } from '@shared/user';

@NgModule({
  declarations: [OverviewComponent, UsersComponent, PumpsystemsComponent],
  imports: [CoreModule, UserModule, AdminRoutingModule],
})
export class AdminModule {}
