import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompararEIComponent } from './comparar-ei.component';

describe('CompararEIComponent', () => {
  let component: CompararEIComponent;
  let fixture: ComponentFixture<CompararEIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompararEIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompararEIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
