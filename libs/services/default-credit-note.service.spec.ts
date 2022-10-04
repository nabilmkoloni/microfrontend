import { TestBed } from '@angular/core/testing';

import { DefaultCreditNoteService } from './default-credit-note.service';

describe('DefaultCreditNoteService', () => {
  let service: DefaultCreditNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultCreditNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
