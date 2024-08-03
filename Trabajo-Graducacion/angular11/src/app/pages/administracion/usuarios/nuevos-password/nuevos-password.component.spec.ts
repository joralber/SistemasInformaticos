import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevosPasswordComponent } from './nuevos-password.component';

describe('NuevosPasswordComponent', () => {
  let component: NuevosPasswordComponent;
  let fixture: ComponentFixture<NuevosPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevosPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevosPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
