import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserData } from '@model/auth';

@Component({
  selector: 'app-user-verified-checkbox',
  templateUrl: './user-verified-checkbox.component.html',
  styleUrls: ['./user-verified-checkbox.component.scss'],
})
export class UserVerifiedCheckboxComponent {
  @Input()
  public user: UserData;

  @Output()
  public readonly verifiedChange: EventEmitter<
    Partial<UserData>
  > = new EventEmitter<Partial<UserData>>();

  public onSelectionChange(verified: boolean) {
    const update: Partial<UserData> = {
      id: this.user.id,
      verified,
    };
    this.verifiedChange.emit(update);
  }
}
