import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { GoogleChartsModule } from 'angular-google-charts';
/**
 * Core module for sharing base modules.
 */
@NgModule({
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    GoogleChartsModule,
  ],
})
export class CoreModule {}
