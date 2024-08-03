import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcdutoMasCComponent } from './procduto-mas-c.component';

describe('ProcdutoMasCComponent', () => {
  let component: ProcdutoMasCComponent;
  let fixture: ComponentFixture<ProcdutoMasCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcdutoMasCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcdutoMasCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
