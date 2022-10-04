import { TestBed } from '@angular/core/testing';

import { DefaultSalesReportEntityService } from './default-sales-report-entity.service';

describe('DefaultSalesReportEntityService', () => {
  let service: DefaultSalesReportEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultSalesReportEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
