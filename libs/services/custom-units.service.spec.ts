import { TestBed } from '@angular/core/testing';

import { CustomUnitsService } from './custom-units.service';

describe('CustomUnitsService', () => {
  let service: CustomUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
