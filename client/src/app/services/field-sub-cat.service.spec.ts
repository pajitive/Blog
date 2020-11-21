import { TestBed } from '@angular/core/testing';

import { FieldSubCatService } from './field-sub-cat.service';

describe('FieldSubCatService', () => {
  let service: FieldSubCatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldSubCatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
