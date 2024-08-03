import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperativosComponent } from './operativos.component';

describe('OperativosComponent', () => {
  let component: OperativosComponent;
  let fixture: ComponentFixture<OperativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperativosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
