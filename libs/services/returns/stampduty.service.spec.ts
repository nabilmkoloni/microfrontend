import { TestBed } from '@angular/core/testing';

import { StampdutyService } from './stampduty.service';

describe('StampdutyService', () => {
  let service: StampdutyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StampdutyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
