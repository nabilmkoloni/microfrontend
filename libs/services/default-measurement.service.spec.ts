import { TestBed } from '@angular/core/testing';

import { DefaultMeasurementService } from './default-measurement.service';

describe('DefaultMeasurementService', () => {
  let service: DefaultMeasurementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultMeasurementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
