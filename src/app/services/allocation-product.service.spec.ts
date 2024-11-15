import { TestBed } from '@angular/core/testing';

import { AllocationProductService } from './allocation-product.service';

describe('AllocationProductService', () => {
  let service: AllocationProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllocationProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
