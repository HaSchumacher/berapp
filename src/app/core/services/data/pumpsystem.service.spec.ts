import { TestBed } from '@angular/core/testing';

import { PumpsystemService } from './pumpsystem.service';

describe('PumpsystemService', () => {
  let service: PumpsystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PumpsystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
