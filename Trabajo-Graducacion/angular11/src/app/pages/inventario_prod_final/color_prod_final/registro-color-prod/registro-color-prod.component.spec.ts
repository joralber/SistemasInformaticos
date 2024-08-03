import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroColorProdComponent } from './registro-color-prod.component';

describe('RegistroColorProdComponent', () => {
  let component: RegistroColorProdComponent;
  let fixture: ComponentFixture<RegistroColorProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroColorProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroColorProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
