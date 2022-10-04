import { TestBed } from '@angular/core/testing';

import { DefaultUsersService } from './default-users.service';

describe('DefaultUsersService', () => {
  let service: DefaultUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
