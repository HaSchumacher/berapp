import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SlotDataItem } from '@model';

@Component({
  selector: 'app-slot-data-dialog',
  templateUrl: './slot-data-dialog.component.html',
  styleUrls: ['./slot-data-dialog.component.scss'],
})
export class SlotDataDialogComponent {
  @Output()
  public readonly deleteClick: EventEmitter<SlotDataItem> = new EventEmitter<SlotDataItem>();
  constructor(@Inject(MAT_DIALOG_DATA) public readonly item: SlotDataItem) {}
}
