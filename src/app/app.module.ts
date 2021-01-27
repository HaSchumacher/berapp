import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from '@core';
import { ShellModule } from '@features/shell';
import { AppRoutingModule } from './routes';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule, ShellModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
