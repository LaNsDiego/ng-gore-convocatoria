import { TestBed } from '@angular/core/testing';

import { WantedVehicleService } from './wanted-vehicle.service';

describe('WantedVehicleService', () => {
  let service: WantedVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WantedVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
