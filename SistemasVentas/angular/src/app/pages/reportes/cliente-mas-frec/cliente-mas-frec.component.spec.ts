import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteMasFrecComponent } from './cliente-mas-frec.component';

describe('ClienteMasFrecComponent', () => {
  let component: ClienteMasFrecComponent;
  let fixture: ComponentFixture<ClienteMasFrecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteMasFrecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteMasFrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
