import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevProduccionComponent } from './dev-produccion.component';

describe('DevProduccionComponent', () => {
  let component: DevProduccionComponent;
  let fixture: ComponentFixture<DevProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevProduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
