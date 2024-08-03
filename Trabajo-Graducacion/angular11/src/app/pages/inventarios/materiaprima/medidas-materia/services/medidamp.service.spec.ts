import { TestBed } from '@angular/core/testing';

import { MedidampService } from './medidamp.service';

describe('MedidampService', () => {
  let service: MedidampService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedidampService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
