import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstilosComponent } from './editar-estilos.component';

describe('EditarEstilosComponent', () => {
  let component: EditarEstilosComponent;
  let fixture: ComponentFixture<EditarEstilosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEstilosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEstilosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
