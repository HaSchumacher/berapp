import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SlotDataItem } from '@model';
import { Observable, Subject } from 'rxjs';
import { mapTo, share, takeUntil, tap } from 'rxjs/operators';
import { SlotDataDialogComponent } from './slot-data-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class SlotDataDialogService {
  private dialogRef: MatDialogRef<SlotDataDialogComponent>;
  private readonly _deleteClick: Subject<SlotDataItem> = new Subject<SlotDataItem>();
  public readonly deleteClick$: Observable<SlotDataItem> = this._deleteClick
    .asObservable()
    .pipe(share());

  constructor(private readonly dialog: MatDialog) {}

  public open(item: SlotDataItem): Observable<void> {
    this.dialogRef = this.dialog.open(SlotDataDialogComponent, { data: item });
    this.dialogRef.componentInstance.deleteClick
      .asObservable()
      .pipe(takeUntil(this.dialogRef.afterClosed()))
      .subscribe({
        next: (data) => this._deleteClick.next(data),
      });
    return this.dialogRef.afterClosed().pipe(
      tap((_) => (this.dialogRef = null)),
      mapTo(null)
    );
  }

  public close(): void {
    this.dialogRef?.close();
  }
}
