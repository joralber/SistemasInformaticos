import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasCategComponent } from './ventas-categ.component';

describe('VentasCategComponent', () => {
  let component: VentasCategComponent;
  let fixture: ComponentFixture<VentasCategComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasCategComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasCategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
