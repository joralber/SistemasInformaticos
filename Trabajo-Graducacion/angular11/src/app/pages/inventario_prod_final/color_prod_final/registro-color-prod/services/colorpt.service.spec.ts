import { TestBed } from '@angular/core/testing';

import { ColorptService } from './colorpt.service';

describe('ColorptService', () => {
  let service: ColorptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
