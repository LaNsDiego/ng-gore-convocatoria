import { TestBed } from '@angular/core/testing';

import { WorkActivityService } from './work-activity.service';

describe('WorkActivityService', () => {
  let service: WorkActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
