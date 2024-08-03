import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroOrdenProduccionComponent } from './registro-orden-produccion.component';

describe('RegistroOrdenProduccionComponent', () => {
  let component: RegistroOrdenProduccionComponent;
  let fixture: ComponentFixture<RegistroOrdenProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroOrdenProduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroOrdenProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
