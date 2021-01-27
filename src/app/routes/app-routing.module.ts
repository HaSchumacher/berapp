import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@core/guards';
import { PUMPSYSTEMS } from './routes';

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
    path: '**',
    pathMatch: 'full',
    redirectTo: PUMPSYSTEMS,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
