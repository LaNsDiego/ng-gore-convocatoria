import { TestBed } from '@angular/core/testing';

import { VolunteerCitizenService } from './volunteer-citizen.service';

describe('VolunteerCitizenService', () => {
  let service: VolunteerCitizenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolunteerCitizenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
