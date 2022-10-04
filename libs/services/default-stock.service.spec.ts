import { TestBed } from '@angular/core/testing';

import { DefaultStockService } from './default-stock.service';

describe('DefaultStockService', () => {
  let service: DefaultStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
