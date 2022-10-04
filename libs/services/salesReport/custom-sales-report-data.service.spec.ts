import { TestBed } from '@angular/core/testing';

import { CustomSalesReportDataService } from './custom-sales-report-data.service';

describe('CustomSalesReportDataService', () => {
  let service: CustomSalesReportDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomSalesReportDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
