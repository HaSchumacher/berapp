import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PumpsystemsOverviewComponent } from '@features/pumpsystems/pages';
import { PumpsystemComponent } from '../pages/pumpsystem/pumpsystem.component';
import { OVERVIEW_PAGE, PUMPSYSTEM_PAGE } from './routes';

const routes: Routes = [
  {
    path: OVERVIEW_PAGE,
    component: PumpsystemsOverviewComponent,
  },
  {
    path: PUMPSYSTEM_PAGE,
    component: PumpsystemComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: OVERVIEW_PAGE,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PumpsystemsRoutingModule {}
