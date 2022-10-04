import { TestBed } from '@angular/core/testing';

import { DefaultHotelServicesService } from './default-hotel-services.service';

describe('DefaultHotelServicesService', () => {
  let service: DefaultHotelServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultHotelServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
