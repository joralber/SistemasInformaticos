import { TestBed } from '@angular/core/testing';

import { DetalleEstiloService } from './detalle-estilo.service';

describe('DetalleEstiloService', () => {
  let service: DetalleEstiloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleEstiloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
