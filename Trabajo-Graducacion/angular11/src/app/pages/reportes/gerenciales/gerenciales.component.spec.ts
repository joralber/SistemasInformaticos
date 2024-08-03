import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerencialesComponent } from './gerenciales.component';

describe('GerencialesComponent', () => {
  let component: GerencialesComponent;
  let fixture: ComponentFixture<GerencialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerencialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerencialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
