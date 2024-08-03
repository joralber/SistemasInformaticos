import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCateProdComponent } from './registro-cate-prod.component';

describe('RegistroCateProdComponent', () => {
  let component: RegistroCateProdComponent;
  let fixture: ComponentFixture<RegistroCateProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroCateProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCateProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
