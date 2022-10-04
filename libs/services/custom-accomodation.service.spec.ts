import { TestBed } from '@angular/core/testing';

import { CustomAccomodationService } from './custom-accomodation.service';

describe('CustomAccomodationService', () => {
  let service: CustomAccomodationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomAccomodationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
