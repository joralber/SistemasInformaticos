import { TestBed } from '@angular/core/testing';

import { RegresarService } from './regresar.service';

describe('RegresarService', () => {
  let service: RegresarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegresarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
