import { TestBed } from '@angular/core/testing';

import { SlotDataDialogService } from './slot-data-dialog.service';

describe('SlotDataDialogService', () => {
  let service: SlotDataDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotDataDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
