import { TestBed } from '@angular/core/testing';

import { OffenseDataServiceService } from './offense-data-service.service';

describe('OffenseDataServiceService', () => {
  let service: OffenseDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffenseDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
