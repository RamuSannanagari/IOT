import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarWindmillPlantComponent } from './solar-windmill-plant.component';

describe('SolarWindmillPlantComponent', () => {
  let component: SolarWindmillPlantComponent;
  let fixture: ComponentFixture<SolarWindmillPlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolarWindmillPlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarWindmillPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
