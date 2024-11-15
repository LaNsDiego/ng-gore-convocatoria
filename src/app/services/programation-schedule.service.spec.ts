import { TestBed } from '@angular/core/testing';

import { ProgramationScheduleService } from './programation-schedule.service';

describe('ProgramationScheduleService', () => {
  let service: ProgramationScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramationScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
