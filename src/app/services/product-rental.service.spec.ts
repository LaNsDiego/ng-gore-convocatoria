import { TestBed } from '@angular/core/testing';

import { ProductRentalService } from './product-rental.service';

describe('ProductRentalService', () => {
  let service: ProductRentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
