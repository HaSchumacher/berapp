import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SlotData } from '@model';

@Component({
  selector: 'app-add-slot-form',
  templateUrl: './add-slot-form.component.html',
  styleUrls: ['./add-slot-form.component.scss'],
})
export class AddSlotFormComponent {
  public readonly controlName_fromDate: string = 'fromDate';
  public readonly controlName_fromTime: string = 'fromTime';
  public readonly controlName_toDate: string = 'toDate';
  public readonly controlName_toTime: string = 'toTime';
  public readonly addSlotForm: FormGroup = new FormGroup({
    [this.controlName_fromDate]: new FormControl(),
    [this.controlName_fromTime]: new FormControl(),
    [this.controlName_toDate]: new FormControl(),
    [this.controlName_toTime]: new FormControl(),
  });

  @Output()
  public readonly submit: EventEmitter<
    Pick<SlotData, 'from' | 'to'>
  > = new EventEmitter<Pick<SlotData, 'from' | 'to'>>();

  public _onSubmit(): void {
    if (this.addSlotForm.valid) {
      const from: Date = this.addSlotForm.value[this.controlName_fromDate];
      const fromTime: string = this.addSlotForm.value[
        this.controlName_fromTime
      ];
      from.setHours(
        Number(fromTime.substring(0, 2)),
        Number(fromTime.substring(3, 5))
      );
      const to: Date = this.addSlotForm.value[this.controlName_toDate];
      const toTime: string = this.addSlotForm.value[this.controlName_toTime];
      to.setHours(
        Number(toTime.substring(0, 2)),
        Number(toTime.substring(3, 5))
      );
      this.submit.emit({ from, to });
    }
  }
}
