import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDsCompraComponent } from './registro-ds-compra.component';

describe('RegistroDsCompraComponent', () => {
  let component: RegistroDsCompraComponent;
  let fixture: ComponentFixture<RegistroDsCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDsCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDsCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
