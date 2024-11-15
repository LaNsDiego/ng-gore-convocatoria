import { TestBed } from '@angular/core/testing';

import { WantedPersonService } from './wanted-person.service';

describe('WantedPersonService', () => {
  let service: WantedPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WantedPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
