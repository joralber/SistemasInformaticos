import { TestBed } from '@angular/core/testing';

import { ColormpService } from './colormp.service';

describe('ColormpService', () => {
  let service: ColormpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColormpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
