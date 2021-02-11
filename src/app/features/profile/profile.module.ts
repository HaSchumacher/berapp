import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './pages/overview/overview.component';
import { SharedModule } from '@shared';
import { ProfileRoutingModule } from './routes/profile-routing.module';



@NgModule({
  declarations: [OverviewComponent],
  imports: [
    SharedModule,ProfileRoutingModule
  ]
})
export class ProfileModule { }
