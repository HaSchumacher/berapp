import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@core/guards';
import { AdminGuardService } from '@core/guards/admin-guard.service';
import { ADMIN, PUMPSYSTEMS, ROOT } from './routes';

const routes: Routes = [
  {
    path: PUMPSYSTEMS,
    loadChildren: () =>
      import('@features/pumpsystems/pumpsystems.module').then(
        (module) => module.PumpsystemsModule
      ),
    canLoad: [AuthGuardService],
  },
  {
    path: ADMIN,
    loadChildren: () =>
      import('@features/admin/admin.module').then(
        (module) => module.AdminModule
      ),
    canLoad: [AdminGuardService],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ROOT,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
