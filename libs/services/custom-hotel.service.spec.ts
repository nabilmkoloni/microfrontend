import { TestBed } from '@angular/core/testing';

import { CustomHotelService } from './custom-hotel.service';

describe('CustomHotelService', () => {
  let service: CustomHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
