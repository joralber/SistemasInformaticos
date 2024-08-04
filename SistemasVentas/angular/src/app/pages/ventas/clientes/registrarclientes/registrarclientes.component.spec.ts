import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarclientesComponent } from './registrarclientes.component';

describe('RegistrarclientesComponent', () => {
  let component: RegistrarclientesComponent;
  let fixture: ComponentFixture<RegistrarclientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarclientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
