import { TestBed } from '@angular/core/testing';

import { CustomTaxpayerService } from './custom-taxpayer.service';

describe('CustomTaxpayerService', () => {
  let service: CustomTaxpayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomTaxpayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
