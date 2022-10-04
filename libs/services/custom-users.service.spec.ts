import { TestBed } from '@angular/core/testing';

import { CustomUsersService } from './custom-users.service';

describe('CustomUsersService', () => {
  let service: CustomUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
