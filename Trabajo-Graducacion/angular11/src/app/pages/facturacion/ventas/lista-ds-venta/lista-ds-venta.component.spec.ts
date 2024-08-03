import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDsVentaComponent } from './lista-ds-venta.component';

describe('ListaDsVentaComponent', () => {
  let component: ListaDsVentaComponent;
  let fixture: ComponentFixture<ListaDsVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDsVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDsVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
