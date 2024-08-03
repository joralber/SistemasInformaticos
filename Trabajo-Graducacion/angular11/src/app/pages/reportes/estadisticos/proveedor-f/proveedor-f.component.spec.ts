import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorFComponent } from './proveedor-f.component';

describe('ProveedorFComponent', () => {
  let component: ProveedorFComponent;
  let fixture: ComponentFixture<ProveedorFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
