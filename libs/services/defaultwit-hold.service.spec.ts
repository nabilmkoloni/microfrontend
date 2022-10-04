import { TestBed } from '@angular/core/testing';

import { DefaultwitHoldService } from './defaultwit-hold.service';

describe('DefaultwitHoldService', () => {
  let service: DefaultwitHoldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultwitHoldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
