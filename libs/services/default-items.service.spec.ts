import { TestBed } from '@angular/core/testing';

import { DefaultItemsService } from './default-items.service';

describe('DefaultItemsService', () => {
  let service: DefaultItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
