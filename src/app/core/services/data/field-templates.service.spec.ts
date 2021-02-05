import { TestBed } from '@angular/core/testing';

import { FieldTemplatesService } from './field-templates.service';

describe('FieldTemplatesService', () => {
  let service: FieldTemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
