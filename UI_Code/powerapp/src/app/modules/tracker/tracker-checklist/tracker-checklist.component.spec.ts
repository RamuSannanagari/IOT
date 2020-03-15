import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerChecklistComponent } from './tracker-checklist.component';

describe('TrackerChecklistComponent', () => {
  let component: TrackerChecklistComponent;
  let fixture: ComponentFixture<TrackerChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
