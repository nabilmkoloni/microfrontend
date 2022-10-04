import { TestBed } from '@angular/core/testing';

import { CustomHoldingPaymentService } from './custom-holding-payment.service';

describe('CustomHoldingPaymentService', () => {
  let service: CustomHoldingPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomHoldingPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
