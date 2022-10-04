import { TestBed } from '@angular/core/testing';

import { DefaultDevicesService } from './default-devices.service';

describe('DefaultDevicesService', () => {
  let service: DefaultDevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultDevicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
