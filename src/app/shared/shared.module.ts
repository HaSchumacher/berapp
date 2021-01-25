import { NgModule } from '@angular/core';
import { CoreModule } from '@shared/core';
import { AuthModule } from '@shared/auth';

@NgModule({
  exports: [CoreModule, AuthModule],
})
export class SharedModule {}
