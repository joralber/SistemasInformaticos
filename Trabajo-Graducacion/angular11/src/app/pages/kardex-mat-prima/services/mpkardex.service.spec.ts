import { TestBed } from '@angular/core/testing';

import { MpkardexService } from './mpkardex.service';

describe('MpkardexService', () => {
  let service: MpkardexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MpkardexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
