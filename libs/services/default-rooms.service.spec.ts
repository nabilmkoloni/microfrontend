import { TestBed } from '@angular/core/testing';

import { DefaultRoomsService } from './default-rooms.service';

describe('DefaultRoomsService', () => {
  let service: DefaultRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
