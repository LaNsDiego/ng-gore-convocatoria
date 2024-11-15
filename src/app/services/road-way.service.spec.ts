import { TestBed } from '@angular/core/testing';

import { RoadWayService } from './road-way.service';

describe('RoadWayService', () => {
  let service: RoadWayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoadWayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
