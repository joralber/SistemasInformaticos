import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarCostosProduccionComponent } from './registar-costos-produccion.component';

describe('RegistarCostosProduccionComponent', () => {
  let component: RegistarCostosProduccionComponent;
  let fixture: ComponentFixture<RegistarCostosProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistarCostosProduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistarCostosProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
