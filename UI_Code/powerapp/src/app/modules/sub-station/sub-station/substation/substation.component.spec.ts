import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstationComponent } from './substation.component';

describe('SubstationComponent', () => {
  let component: SubstationComponent;
  let fixture: ComponentFixture<SubstationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
