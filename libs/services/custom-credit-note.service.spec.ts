import { TestBed } from '@angular/core/testing';

import { CustomCreditNoteService } from './custom-credit-note.service';

describe('CustomCreditNoteService', () => {
  let service: CustomCreditNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomCreditNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
