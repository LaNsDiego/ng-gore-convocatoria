import { TestBed } from '@angular/core/testing';

import { UserSirService } from './user-sir.service';

describe('UserSirService', () => {
  let service: UserSirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
