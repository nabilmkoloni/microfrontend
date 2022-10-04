import { TestBed } from '@angular/core/testing';

import { CustomSalesTaxService } from './custom-sales-tax.service';

describe('CustomSalesTaxService', () => {
  let service: CustomSalesTaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomSalesTaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
