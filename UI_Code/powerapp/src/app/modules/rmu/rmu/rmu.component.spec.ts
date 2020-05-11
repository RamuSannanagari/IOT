import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmuComponent } from './rmu.component';

describe('RmuComponent', () => {
  let component: RmuComponent;
  let fixture: ComponentFixture<RmuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
