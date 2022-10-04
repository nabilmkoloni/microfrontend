import { TestBed } from '@angular/core/testing';

import { CustomWithHoldingsService } from './custom-with-holdings.service';

describe('CustomWithHoldingsService', () => {
  let service: CustomWithHoldingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomWithHoldingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
