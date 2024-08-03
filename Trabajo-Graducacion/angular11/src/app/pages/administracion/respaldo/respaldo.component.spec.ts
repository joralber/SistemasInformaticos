import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespaldoComponent } from './respaldo.component';

describe('RespaldoComponent', () => {
  let component: RespaldoComponent;
  let fixture: ComponentFixture<RespaldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespaldoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
