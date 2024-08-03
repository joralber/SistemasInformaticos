import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCostosProduccionComponent } from './listado-costos-produccion.component';

describe('ListadoCostosProduccionComponent', () => {
  let component: ListadoCostosProduccionComponent;
  let fixture: ComponentFixture<ListadoCostosProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCostosProduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCostosProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
