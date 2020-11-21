import { TestBed } from '@angular/core/testing';

import { SubCatService } from './sub-cat.service';

describe('SubCatService', () => {
  let service: SubCatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
