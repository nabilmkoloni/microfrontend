import { TestBed } from '@angular/core/testing';

import { CustomMigrationsService } from './custom-migrations.service';

describe('CustomMigrationsService', () => {
  let service: CustomMigrationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomMigrationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
