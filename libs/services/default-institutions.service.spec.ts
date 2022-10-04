import { TestBed } from '@angular/core/testing';

import { DefaultInstitutionsService } from './default-institutions.service';

describe('DefaultInstitutionsService', () => {
  let service: DefaultInstitutionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultInstitutionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
