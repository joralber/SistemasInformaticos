import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTallasProdComponent } from './registro-tallas-prod.component';

describe('RegistroTallasProdComponent', () => {
  let component: RegistroTallasProdComponent;
  let fixture: ComponentFixture<RegistroTallasProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroTallasProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroTallasProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
