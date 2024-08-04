import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasfechaComponent } from './ventasfecha.component';

describe('VentasfechaComponent', () => {
  let component: VentasfechaComponent;
  let fixture: ComponentFixture<VentasfechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasfechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasfechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
