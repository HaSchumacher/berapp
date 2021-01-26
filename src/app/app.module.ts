import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from '@core';
import { ShellModule } from '@features/shell';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, ShellModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
