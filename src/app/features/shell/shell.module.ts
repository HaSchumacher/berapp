import { NgModule } from '@angular/core';

import { ShellComponent, RouteTreeComponent } from './components';
import { CoreModule } from '@shared/core';
import { AuthModule } from '@shared/auth';

@NgModule({
  declarations: [ShellComponent, RouteTreeComponent],
  imports: [CoreModule, AuthModule],
  exports: [ShellComponent],
})
export class ShellModule {}
