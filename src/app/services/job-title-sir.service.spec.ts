import { TestBed } from '@angular/core/testing';

import { JobTitleSirService } from './job-title-sir.service';

describe('JobTitleSirService', () => {
  let service: JobTitleSirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobTitleSirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
