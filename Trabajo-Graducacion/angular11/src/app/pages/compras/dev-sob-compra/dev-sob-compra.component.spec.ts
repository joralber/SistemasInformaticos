import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevSobCompraComponent } from './dev-sob-compra.component';

describe('DevSobCompraComponent', () => {
  let component: DevSobCompraComponent;
  let fixture: ComponentFixture<DevSobCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevSobCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevSobCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
