import { TestBed } from '@angular/core/testing';

import { NotificacionPTSService } from './notificacion-pts.service';

describe('NotificacionPTSService', () => {
  let service: NotificacionPTSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificacionPTSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
