import { NgModule } from '@angular/core';
import { PumpsystemsRoutingModule } from '@features/pumpsystems/routes';
import {
  PumpsystemsOverviewComponent,
  PumpsystemComponent,
} from '@features/pumpsystems/pages';
import {
  PumpsystemCardComponent,
  SlotsTimelineComponent,
  AddSlotFormComponent,
  SlotDataDialogComponent,
} from '@features/pumpsystems/components';
import { CoreModule } from '@shared/core';

@NgModule({
  declarations: [
    PumpsystemsOverviewComponent,
    PumpsystemCardComponent,
    PumpsystemComponent,
    SlotsTimelineComponent,
    AddSlotFormComponent,
    SlotDataDialogComponent,
  ],
  imports: [CoreModule, PumpsystemsRoutingModule],
})
export class PumpsystemsModule {}
