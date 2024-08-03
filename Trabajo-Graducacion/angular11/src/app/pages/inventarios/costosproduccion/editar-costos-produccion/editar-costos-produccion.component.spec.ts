import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCostosProduccionComponent } from './editar-costos-produccion.component';

describe('EditarCostosProduccionComponent', () => {
  let component: EditarCostosProduccionComponent;
  let fixture: ComponentFixture<EditarCostosProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCostosProduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCostosProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
