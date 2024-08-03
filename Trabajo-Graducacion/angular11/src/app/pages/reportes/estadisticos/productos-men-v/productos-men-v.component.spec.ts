import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosMenVComponent } from './productos-men-v.component';

describe('ProductosMenVComponent', () => {
  let component: ProductosMenVComponent;
  let fixture: ComponentFixture<ProductosMenVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosMenVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosMenVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
