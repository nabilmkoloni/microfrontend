import { TestBed } from '@angular/core/testing';

import { DefaultSalesReceiptService } from './default-sales-receipt.service';

describe('DefaultSalesReceiptService', () => {
  let service: DefaultSalesReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultSalesReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
