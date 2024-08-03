import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDevProduccionComponent } from './registro-dev-produccion.component';

describe('RegistroDevProduccionComponent', () => {
  let component: RegistroDevProduccionComponent;
  let fixture: ComponentFixture<RegistroDevProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDevProduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDevProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
