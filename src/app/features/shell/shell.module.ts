import { NgModule } from '@angular/core';

import { ShellComponent } from './components';
import { CoreModule } from '@shared/core';
import { AuthModule } from '@shared/auth';

@NgModule({
  declarations: [ShellComponent],
  imports: [CoreModule, AuthModule],
  exports: [ShellComponent],
})
export class ShellModule {}
