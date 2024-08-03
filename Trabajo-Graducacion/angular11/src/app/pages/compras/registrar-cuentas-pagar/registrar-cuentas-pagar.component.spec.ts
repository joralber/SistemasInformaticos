import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCuentasPagarComponent } from './registrar-cuentas-pagar.component';

describe('RegistrarCuentasPagarComponent', () => {
  let component: RegistrarCuentasPagarComponent;
  let fixture: ComponentFixture<RegistrarCuentasPagarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarCuentasPagarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarCuentasPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
