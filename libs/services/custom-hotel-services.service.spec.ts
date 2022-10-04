import { TestBed } from '@angular/core/testing';

import { CustomHotelServicesService } from './custom-hotel-services.service';

describe('CustomHotelServicesService', () => {
  let service: CustomHotelServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomHotelServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
