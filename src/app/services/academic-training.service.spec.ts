import { TestBed } from '@angular/core/testing';

import { AcademicTrainingService } from './academic-training.service';

describe('AcademicTrainingService', () => {
  let service: AcademicTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
