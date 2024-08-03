import { TestBed } from '@angular/core/testing';

import { CodigoEstiloService } from './codigo-estilo.service';

describe('CodigoEstiloService', () => {
  let service: CodigoEstiloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodigoEstiloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
