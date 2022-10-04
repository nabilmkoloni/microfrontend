import { TestBed } from '@angular/core/testing';

import { CustomItemsService } from './custom-items.service';

describe('CustomItemsService', () => {
  let service: CustomItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
