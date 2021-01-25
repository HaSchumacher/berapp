import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

/**
 * Internal module for shared modules.
 */
@NgModule({
  exports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class CoreModule {}
