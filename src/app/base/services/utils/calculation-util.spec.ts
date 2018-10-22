import {TestBed} from '@angular/core/testing';

import {CalculationUtil} from './calculation-util';

describe('CalculationUtil', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalculationUtil = TestBed.get(CalculationUtil);
    expect(service).toBeTruthy();
  });
});
