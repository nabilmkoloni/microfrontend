import { TestBed } from '@angular/core/testing';

import { DefaultSalesItemsService } from './default-sales-items.service';

describe('DefaultSalesItemsService', () => {
  let service: DefaultSalesItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultSalesItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
