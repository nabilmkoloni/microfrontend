import { TestBed } from '@angular/core/testing';

import { OffenseEntityServiceService } from './offense-entity-service.service';

describe('OffenseEntityServiceService', () => {
  let service: OffenseEntityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffenseEntityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
