import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarEstilosComponent } from './registrar-estilos.component';

describe('RegistrarEstilosComponent', () => {
  let component: RegistrarEstilosComponent;
  let fixture: ComponentFixture<RegistrarEstilosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarEstilosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarEstilosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
