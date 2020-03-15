import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerStatusComponent } from './tracker-status.component';

describe('TrackerStatusComponent', () => {
  let component: TrackerStatusComponent;
  let fixture: ComponentFixture<TrackerStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
