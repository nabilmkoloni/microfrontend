import { TestBed } from '@angular/core/testing';

import { DefaultUnitsService } from './default-units.service';

describe('DefaultUnitsService', () => {
  let service: DefaultUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
