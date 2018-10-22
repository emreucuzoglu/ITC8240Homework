import {TestBed} from '@angular/core/testing';

import {VigenereService} from './vigenere.service';

describe('VigenereService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VigenereService = TestBed.get(VigenereService);
    expect(service).toBeTruthy();
  });
});
