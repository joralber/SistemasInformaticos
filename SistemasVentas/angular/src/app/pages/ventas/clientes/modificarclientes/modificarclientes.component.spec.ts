import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarclientesComponent } from './modificarclientes.component';

describe('ModificarclientesComponent', () => {
  let component: ModificarclientesComponent;
  let fixture: ComponentFixture<ModificarclientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarclientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
