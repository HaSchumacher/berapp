import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  exports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
