import { TestBed } from '@angular/core/testing';

import { CategoriaptService } from './categoriapt.service';

describe('CategoriaptService', () => {
  let service: CategoriaptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
