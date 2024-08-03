import { TestBed } from '@angular/core/testing';

import { KardexpfService } from './kardexpf.service';

describe('KardexpfService', () => {
  let service: KardexpfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KardexpfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
