import { TestBed } from '@angular/core/testing';

import { CustomItemsCategoriesService } from './custom-items-categories.service';

describe('CustomItemsCategoriesService', () => {
  let service: CustomItemsCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomItemsCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
