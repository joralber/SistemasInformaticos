import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KardexProdFinalComponent } from './kardex-prod-final.component';

describe('KardexProdFinalComponent', () => {
  let component: KardexProdFinalComponent;
  let fixture: ComponentFixture<KardexProdFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KardexProdFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KardexProdFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
