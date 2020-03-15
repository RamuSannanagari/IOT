import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerControlComponent } from './tracker-control.component';

describe('TrackerControlComponent', () => {
  let component: TrackerControlComponent;
  let fixture: ComponentFixture<TrackerControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
