import { TestBed } from '@angular/core/testing';

import { VatReturnsService } from './vat-returns.service';

describe('VatReturnsService', () => {
  let service: VatReturnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VatReturnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
