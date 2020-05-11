import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtPanelsComponent } from './ht-panels.component';

describe('HtPanelsComponent', () => {
  let component: HtPanelsComponent;
  let fixture: ComponentFixture<HtPanelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtPanelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
