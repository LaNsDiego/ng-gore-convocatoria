import { TestBed } from '@angular/core/testing';

import { JobProfileAssignedService } from './job-profile-assigned.service';

describe('JobProfileAssignedService', () => {
  let service: JobProfileAssignedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobProfileAssignedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
