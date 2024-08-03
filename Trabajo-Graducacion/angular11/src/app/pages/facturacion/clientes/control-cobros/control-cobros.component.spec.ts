import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCobrosComponent } from './control-cobros.component';

describe('ControlCobrosComponent', () => {
  let component: ControlCobrosComponent;
  let fixture: ComponentFixture<ControlCobrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlCobrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
