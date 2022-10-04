import { TestBed } from '@angular/core/testing';

import { CustomInstitutionsService } from './custom-institutions.service';

describe('CustomInstitutionsService', () => {
  let service: CustomInstitutionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomInstitutionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
