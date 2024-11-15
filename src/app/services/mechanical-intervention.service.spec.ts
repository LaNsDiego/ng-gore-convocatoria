import { TestBed } from '@angular/core/testing';

import { MechanicalInterventionService } from './mechanical-intervention.service';

describe('MechanicalInterventionService', () => {
  let service: MechanicalInterventionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MechanicalInterventionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
