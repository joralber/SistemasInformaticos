import { TestBed } from '@angular/core/testing';

import { ProductosTerminadosService } from './productos-terminados.service';

describe('ProductosTerminadosService', () => {
  let service: ProductosTerminadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosTerminadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
