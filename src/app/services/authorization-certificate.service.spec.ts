import { TestBed } from '@angular/core/testing';

import { AuthorizationCertificateService } from './authorization-certificate.service';

describe('AuthorizationCertificateService', () => {
  let service: AuthorizationCertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationCertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
