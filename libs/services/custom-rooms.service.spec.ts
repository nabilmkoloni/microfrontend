import { TestBed } from '@angular/core/testing';

import { CustomRoomsService } from './custom-rooms.service';

describe('CustomRoomsService', () => {
  let service: CustomRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
