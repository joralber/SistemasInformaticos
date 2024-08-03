import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaMateriaComponent } from './categoria-materia.component';

describe('CategoriaMateriaComponent', () => {
  let component: CategoriaMateriaComponent;
  let fixture: ComponentFixture<CategoriaMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaMateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
