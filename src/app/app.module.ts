import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from '@core';
import { ShellModule } from '@features/shell';
import { AppRoutingModule } from './routes';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule, ShellModule, MatTableModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
