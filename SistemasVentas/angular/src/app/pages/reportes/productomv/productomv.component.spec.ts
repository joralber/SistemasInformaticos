import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductomvComponent } from './productomv.component';

describe('ProductomvComponent', () => {
  let component: ProductomvComponent;
  let fixture: ComponentFixture<ProductomvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductomvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductomvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
