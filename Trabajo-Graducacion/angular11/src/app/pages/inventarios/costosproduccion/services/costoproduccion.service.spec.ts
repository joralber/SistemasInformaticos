import { TestBed } from '@angular/core/testing';

import { CostoproduccionService } from './costoproduccion.service';

describe('CostoproduccionService', () => {
  let service: CostoproduccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostoproduccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
