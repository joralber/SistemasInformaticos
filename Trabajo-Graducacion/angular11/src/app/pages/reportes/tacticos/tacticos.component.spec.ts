import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticosComponent } from './tacticos.component';

describe('TacticosComponent', () => {
  let component: TacticosComponent;
  let fixture: ComponentFixture<TacticosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacticosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
