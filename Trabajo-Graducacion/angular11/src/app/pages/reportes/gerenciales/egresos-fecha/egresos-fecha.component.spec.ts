import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresosFechaComponent } from './egresos-fecha.component';

describe('EgresosFechaComponent', () => {
  let component: EgresosFechaComponent;
  let fixture: ComponentFixture<EgresosFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgresosFechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EgresosFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
