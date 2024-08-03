import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosFechaComponent } from './ingresos-fecha.component';

describe('IngresosFechaComponent', () => {
  let component: IngresosFechaComponent;
  let fixture: ComponentFixture<IngresosFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresosFechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresosFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
