import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcdutoMasTComponent } from './procduto-mas-t.component';

describe('ProcdutoMasTComponent', () => {
  let component: ProcdutoMasTComponent;
  let fixture: ComponentFixture<ProcdutoMasTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcdutoMasTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcdutoMasTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
