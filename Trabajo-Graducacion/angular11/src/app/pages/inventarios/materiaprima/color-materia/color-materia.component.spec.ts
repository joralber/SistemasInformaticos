import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorMateriaComponent } from './color-materia.component';

describe('ColorMateriaComponent', () => {
  let component: ColorMateriaComponent;
  let fixture: ComponentFixture<ColorMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorMateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
