import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasEmpleComponent } from './ventas-emple.component';

describe('VentasEmpleComponent', () => {
  let component: VentasEmpleComponent;
  let fixture: ComponentFixture<VentasEmpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasEmpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasEmpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
