import { TestBed } from '@angular/core/testing';

import { CuentaspagarService } from './cuentaspagar.service';

describe('CuentaspagarService', () => {
  let service: CuentaspagarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentaspagarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
