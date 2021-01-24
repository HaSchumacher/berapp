import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Credentials } from '@model/auth';

@Component({
  selector: 'app-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.scss'],
})
export class CredentialsFormComponent {
  private readonly _emailControl: string = 'email';
  private readonly _passwordControl: string = 'password';
  public readonly form: FormGroup = new FormGroup({
    [this._emailControl]: new FormControl('', Validators.required),
    [this._passwordControl]: new FormControl('', Validators.required),
  });

  @Output()
  public readonly submit: EventEmitter<Credentials> = new EventEmitter<Credentials>();

  @Output()
  public readonly cancel: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  public submitButtonName: string = 'Submit';

  get emailControl(): FormControl {
    return this.form.controls[this._emailControl] as FormControl;
  }
  get passwordControl(): FormControl {
    return this.form.controls[this._passwordControl] as FormControl;
  }

  public _submit(): void {
    if (this.form.valid)
      this.submit.emit(
        new Credentials(this.emailControl.value, this.passwordControl.value)
      );
  }

  public _cancel(): void {
    this.cancel.emit();
  }
}
