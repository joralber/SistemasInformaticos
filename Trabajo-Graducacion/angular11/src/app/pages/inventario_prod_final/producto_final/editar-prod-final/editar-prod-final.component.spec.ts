import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProdFinalComponent } from './editar-prod-final.component';

describe('EditarProdFinalComponent', () => {
  let component: EditarProdFinalComponent;
  let fixture: ComponentFixture<EditarProdFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarProdFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProdFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
