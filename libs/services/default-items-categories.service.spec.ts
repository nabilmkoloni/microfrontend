import { TestBed } from '@angular/core/testing';

import { DefaultItemsCategoriesService } from './default-items-categories.service';

describe('DefaultItemsCategoriesService', () => {
  let service: DefaultItemsCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultItemsCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
