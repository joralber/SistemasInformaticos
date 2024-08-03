import { TestBed } from '@angular/core/testing';

import { DetalleCodigoEstiloService } from './detalle-codigo-estilo.service';

describe('DetalleCodigoEstiloService', () => {
  let service: DetalleCodigoEstiloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleCodigoEstiloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
