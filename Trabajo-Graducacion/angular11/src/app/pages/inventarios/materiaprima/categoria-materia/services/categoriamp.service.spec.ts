import { TestBed } from '@angular/core/testing';

import { CategoriampService } from './categoriamp.service';

describe('CategoriampService', () => {
  let service: CategoriampService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriampService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
