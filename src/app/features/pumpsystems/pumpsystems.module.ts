import { NgModule } from '@angular/core';
import { PumpsystemsRoutingModule } from '@features/pumpsystems/routes';
import {
  PumpsystemsOverviewComponent,
  PumpsystemComponent,
} from '@features/pumpsystems/pages';
import {
  PumpsystemCardComponent,
  SlotsTimelineComponent,
} from '@features/pumpsystems/components';
import { CoreModule } from '@shared/core';
import { AddSlotFormComponent } from './components/add-slot-form/add-slot-form.component';

@NgModule({
  declarations: [
    PumpsystemsOverviewComponent,
    PumpsystemCardComponent,
    PumpsystemComponent,
    SlotsTimelineComponent,
    AddSlotFormComponent,
  ],
  imports: [CoreModule, PumpsystemsRoutingModule],
})
export class PumpsystemsModule {}
