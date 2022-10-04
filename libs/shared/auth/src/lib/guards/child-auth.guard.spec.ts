import { TestBed } from '@angular/core/testing';

import { ChildAuthGuard } from './child-auth.guard';

describe('ChildAuthGuard', () => {
  let guard: ChildAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChildAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
