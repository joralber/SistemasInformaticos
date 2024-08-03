import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroOrdenProdSinteticosComponent } from './registro-orden-prod-sinteticos.component';

describe('RegistroOrdenProdSinteticosComponent', () => {
  let component: RegistroOrdenProdSinteticosComponent;
  let fixture: ComponentFixture<RegistroOrdenProdSinteticosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroOrdenProdSinteticosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroOrdenProdSinteticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
