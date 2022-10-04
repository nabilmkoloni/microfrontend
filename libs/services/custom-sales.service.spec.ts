import { TestBed } from '@angular/core/testing';

import { CustomSalesService } from './custom-sales.service';

describe('CustomSalesService', () => {
  let service: CustomSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
