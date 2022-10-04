import { TestBed } from '@angular/core/testing';

import { DefaultSalesService } from './default-sales.service';

describe('DefaultSalesService', () => {
  let service: DefaultSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
