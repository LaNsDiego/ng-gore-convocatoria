import { TestBed } from '@angular/core/testing';

import { SectorTypeService } from './sector-type.service';

describe('SectorTypeService', () => {
  let service: SectorTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectorTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
