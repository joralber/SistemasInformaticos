import { TestBed } from '@angular/core/testing';

import { DetallecostoService } from './detallecosto.service';

describe('DetallecostoService', () => {
  let service: DetallecostoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallecostoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
