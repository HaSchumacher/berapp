import { TestBed } from '@angular/core/testing';

import { AuthDialog } from './auth-dialog.service';

describe('AuthDialogServiceService', () => {
  let service: AuthDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthDialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
