import { NgModule } from '@angular/core';
import { PumpsystemsRoutingModule } from '@features/pumpsystems/routes';
import { PumpsystemsOverviewComponent } from '@features/pumpsystems/pages';
import { PumpsystemCardComponent } from '@features/pumpsystems/components';
import { CoreModule } from '@shared/core';
import { PumpsystemComponent } from './pages/pumpsystem/pumpsystem.component';

@NgModule({
  declarations: [PumpsystemsOverviewComponent, PumpsystemCardComponent, PumpsystemComponent],
  imports: [CoreModule, PumpsystemsRoutingModule],
})
export class PumpsystemsModule {}
