import { NgModule } from '@angular/core';
import { PumpsystemsRoutingModule } from '@features/pumpsystems/routes';
import { PumpsystemsOverviewComponent } from '@features/pumpsystems/pages';
import { PumpsystemCardComponent } from '@features/pumpsystems/components';
import { CoreModule } from '@shared/core';

@NgModule({
  declarations: [PumpsystemsOverviewComponent, PumpsystemCardComponent],
  imports: [CoreModule, PumpsystemsRoutingModule],
})
export class PumpsystemsModule {}
