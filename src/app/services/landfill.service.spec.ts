import { TestBed } from '@angular/core/testing';

import { LandfillService } from './landfill.service';

describe('LandfillService', () => {
  let service: LandfillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandfillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
