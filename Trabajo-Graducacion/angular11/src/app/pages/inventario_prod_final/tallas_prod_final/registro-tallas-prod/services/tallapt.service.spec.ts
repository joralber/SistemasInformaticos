import { TestBed } from '@angular/core/testing';

import { TallaptService } from './tallapt.service';

describe('TallaptService', () => {
  let service: TallaptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TallaptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
