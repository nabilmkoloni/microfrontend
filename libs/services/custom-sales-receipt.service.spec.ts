import { TestBed } from '@angular/core/testing';

import { CustomSalesReceiptService } from './custom-sales-receipt.service';

describe('CustomSalesReceiptService', () => {
  let service: CustomSalesReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomSalesReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
