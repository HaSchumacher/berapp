import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

/**
 * Core module for sharing base modules.
 */
@NgModule({
  exports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class CoreModule {}
