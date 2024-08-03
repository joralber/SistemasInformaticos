import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroProdFinalComponent } from './registro-prod-final.component';

describe('RegistroProdFinalComponent', () => {
  let component: RegistroProdFinalComponent;
  let fixture: ComponentFixture<RegistroProdFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroProdFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroProdFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
