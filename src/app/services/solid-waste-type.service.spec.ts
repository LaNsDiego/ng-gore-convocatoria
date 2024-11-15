import { TestBed } from '@angular/core/testing';

import { SolidWasteTypeService } from './solid-waste-type.service';

describe('SolidWasteTypeService', () => {
  let service: SolidWasteTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolidWasteTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
