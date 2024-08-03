import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosMasVComponent } from './productos-mas-v.component';

describe('ProductosMasVComponent', () => {
  let component: ProductosMasVComponent;
  let fixture: ComponentFixture<ProductosMasVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosMasVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosMasVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
