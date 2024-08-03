import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEstilosComponent } from './listado-estilos.component';

describe('ListadoEstilosComponent', () => {
  let component: ListadoEstilosComponent;
  let fixture: ComponentFixture<ListadoEstilosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoEstilosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoEstilosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
