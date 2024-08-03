import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaOrdenCompraComponent } from './lista-orden-compra.component';

describe('ListaOrdenCompraComponent', () => {
  let component: ListaOrdenCompraComponent;
  let fixture: ComponentFixture<ListaOrdenCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaOrdenCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaOrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
