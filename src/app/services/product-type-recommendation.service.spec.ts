import { TestBed } from '@angular/core/testing';

import { ProductTypeRecommendationService } from './product-type-recommendation.service';

describe('ProductTypeRecomendationService', () => {
  let service: ProductTypeRecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductTypeRecommendationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
