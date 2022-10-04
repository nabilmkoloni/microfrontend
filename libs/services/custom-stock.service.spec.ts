import { TestBed } from '@angular/core/testing';

import { CustomStockService } from './custom-stock.service';

describe('CustomStockService', () => {
  let service: CustomStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
