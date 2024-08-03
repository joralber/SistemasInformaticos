import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProdFinalComponent } from './listado-prod-final.component';

describe('ListadoProdFinalComponent', () => {
  let component: ListadoProdFinalComponent;
  let fixture: ComponentFixture<ListadoProdFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoProdFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoProdFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
