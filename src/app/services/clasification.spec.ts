import { TestBed } from '@angular/core/testing';

import { Clasification } from './clasification';

describe('Clasification', () => {
  let service: Clasification;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Clasification);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
