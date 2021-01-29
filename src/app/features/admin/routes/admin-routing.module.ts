import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  OverviewComponent,
  PumpsystemsComponent,
  UsersComponent,
} from '@features/admin/pages';
import { OVERVIEW_PAGE, PUMPSYSTEMS_PAGE, USERS_PAGE } from './routes';

const routes: Routes = [
  {
    path: OVERVIEW_PAGE,
    component: OverviewComponent,
  },
  {
    path: USERS_PAGE,
    component: UsersComponent,
  },
  {
    path: PUMPSYSTEMS_PAGE,
    component: PumpsystemsComponent,
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
export class AdminRoutingModule {}
