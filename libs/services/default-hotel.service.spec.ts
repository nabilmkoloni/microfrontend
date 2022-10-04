import { TestBed } from '@angular/core/testing';

import { DefaultHotelService } from './default-hotel.service';

describe('DefaultHotelService', () => {
  let service: DefaultHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
