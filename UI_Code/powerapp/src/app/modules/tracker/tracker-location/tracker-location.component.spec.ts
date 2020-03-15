import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerLocationComponent } from './tracker-location.component';

describe('TrackerLocationComponent', () => {
  let component: TrackerLocationComponent;
  let fixture: ComponentFixture<TrackerLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
