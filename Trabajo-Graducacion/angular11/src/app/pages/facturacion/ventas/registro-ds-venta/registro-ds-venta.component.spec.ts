import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDsVentaComponent } from './registro-ds-venta.component';

describe('RegistroDsVentaComponent', () => {
  let component: RegistroDsVentaComponent;
  let fixture: ComponentFixture<RegistroDsVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDsVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDsVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
