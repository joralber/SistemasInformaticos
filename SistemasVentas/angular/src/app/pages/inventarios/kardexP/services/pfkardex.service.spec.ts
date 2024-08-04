import { TestBed } from '@angular/core/testing';

import { PfkardexService } from './pfkardex.service';

describe('PfkardexService', () => {
  let service: PfkardexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PfkardexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
