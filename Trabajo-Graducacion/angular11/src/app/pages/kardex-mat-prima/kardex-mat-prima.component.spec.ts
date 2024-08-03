import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KardexMatPrimaComponent } from './kardex-mat-prima.component';

describe('KardexMatPrimaComponent', () => {
  let component: KardexMatPrimaComponent;
  let fixture: ComponentFixture<KardexMatPrimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KardexMatPrimaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KardexMatPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
