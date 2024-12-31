import { TestBed } from '@angular/core/testing';

import { PeriodRequirementDetailService } from './period-requirement-detail.service';

describe('PeriodRequirementDetailService', () => {
  let service: PeriodRequirementDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodRequirementDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
