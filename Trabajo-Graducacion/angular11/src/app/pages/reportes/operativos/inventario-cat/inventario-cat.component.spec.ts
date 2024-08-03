import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioCatComponent } from './inventario-cat.component';

describe('InventarioCatComponent', () => {
  let component: InventarioCatComponent;
  let fixture: ComponentFixture<InventarioCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
