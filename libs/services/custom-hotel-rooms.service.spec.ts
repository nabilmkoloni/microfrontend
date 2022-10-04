import { TestBed } from '@angular/core/testing';

import { CustomHotelRoomsService } from './custom-hotel-rooms.service';

describe('CustomHotelRoomsService', () => {
  let service: CustomHotelRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomHotelRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
