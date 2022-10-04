import { TestBed } from '@angular/core/testing';

import { DefaultSalesTaxService } from './default-sales-tax.service';

describe('DefaultSalesTaxService', () => {
  let service: DefaultSalesTaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultSalesTaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
