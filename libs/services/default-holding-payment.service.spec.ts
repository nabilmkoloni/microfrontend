import { TestBed } from '@angular/core/testing';

import { DefaultHoldingPaymentService } from './default-holding-payment.service';

describe('DefaultHoldingPaymentService', () => {
  let service: DefaultHoldingPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultHoldingPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
