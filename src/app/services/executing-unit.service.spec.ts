import { TestBed } from '@angular/core/testing';

import { ExecutingUnitService } from './executing-unit.service';

describe('ExecutingUnitService', () => {
  let service: ExecutingUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutingUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
