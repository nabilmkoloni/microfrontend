import { TestBed } from '@angular/core/testing';

import { CustomDevicesService } from './custom-devices.service';

describe('CustomDevicesService', () => {
  let service: CustomDevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomDevicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
