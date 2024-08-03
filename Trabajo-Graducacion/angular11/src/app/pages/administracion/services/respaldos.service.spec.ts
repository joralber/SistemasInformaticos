import { TestBed } from '@angular/core/testing';

import { RespaldosService } from './respaldos.service';

describe('RespaldosService', () => {
  let service: RespaldosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespaldosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
