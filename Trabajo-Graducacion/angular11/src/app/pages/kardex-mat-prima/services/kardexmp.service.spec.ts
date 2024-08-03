import { TestBed } from '@angular/core/testing';

import { KardexmpService } from './kardexmp.service';

describe('KardexmpService', () => {
  let service: KardexmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KardexmpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
