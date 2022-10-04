import { TestBed } from '@angular/core/testing';

import { CustomSalesItemsService } from './custom-sales-items.service';

describe('CustomSalesItemsService', () => {
  let service: CustomSalesItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomSalesItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
