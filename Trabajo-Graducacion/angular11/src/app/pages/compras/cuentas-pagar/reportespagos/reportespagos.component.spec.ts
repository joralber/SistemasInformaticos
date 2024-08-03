import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportespagosComponent } from './reportespagos.component';

describe('ReportespagosComponent', () => {
  let component: ReportespagosComponent;
  let fixture: ComponentFixture<ReportespagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportespagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportespagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
