import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantViewComponent } from './plant-view.component';

describe('PlantViewComponent', () => {
  let component: PlantViewComponent;
  let fixture: ComponentFixture<PlantViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
