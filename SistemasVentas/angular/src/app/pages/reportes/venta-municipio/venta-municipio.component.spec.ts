import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaMunicipioComponent } from './venta-municipio.component';

describe('VentaMunicipioComponent', () => {
  let component: VentaMunicipioComponent;
  let fixture: ComponentFixture<VentaMunicipioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaMunicipioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
