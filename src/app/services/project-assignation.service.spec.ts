import { TestBed } from '@angular/core/testing';

import { ProjectAssignationService } from './project-assignation.service';

describe('ProjectAssignationService', () => {
  let service: ProjectAssignationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectAssignationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
