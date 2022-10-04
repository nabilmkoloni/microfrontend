import { TestBed } from '@angular/core/testing';

import { DefaultAccomodationService } from './default-accomodation.service';

describe('DefaultAccomodationService', () => {
  let service: DefaultAccomodationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultAccomodationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
