import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from '../pages/overview/overview.component';
import { OVERVIEW_PAGE } from './routes';

const routes: Routes = [
  {
    path: OVERVIEW_PAGE,
    component: OverviewComponent,
  },
  // {
  //   path: PUMPSYSTEM_PAGE,
  //   component: PumpsystemComponent,
  // },
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
export class ProfileRoutingModule {}
