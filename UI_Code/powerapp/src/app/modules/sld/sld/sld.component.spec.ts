import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SldComponent } from './sld.component';

describe('SldComponent', () => {
  let component: SldComponent;
  let fixture: ComponentFixture<SldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
