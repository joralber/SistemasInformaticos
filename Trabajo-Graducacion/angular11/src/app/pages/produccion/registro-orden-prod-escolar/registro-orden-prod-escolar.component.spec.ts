import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroOrdenProdEscolarComponent } from './registro-orden-prod-escolar.component';

describe('RegistroOrdenProdEscolarComponent', () => {
  let component: RegistroOrdenProdEscolarComponent;
  let fixture: ComponentFixture<RegistroOrdenProdEscolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroOrdenProdEscolarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroOrdenProdEscolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
