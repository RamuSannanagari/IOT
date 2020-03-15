import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerRouteComponent } from './tracker-route.component';

describe('TrackerRouteComponent', () => {
  let component: TrackerRouteComponent;
  let fixture: ComponentFixture<TrackerRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
