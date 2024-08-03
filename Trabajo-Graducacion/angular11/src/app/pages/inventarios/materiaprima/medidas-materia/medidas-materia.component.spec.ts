import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidasMateriaComponent } from './medidas-materia.component';

describe('MedidasMateriaComponent', () => {
  let component: MedidasMateriaComponent;
  let fixture: ComponentFixture<MedidasMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedidasMateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidasMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
