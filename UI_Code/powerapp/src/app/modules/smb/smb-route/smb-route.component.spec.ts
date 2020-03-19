import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmbRouteComponent } from './smb-route.component';

describe('SmbRouteComponent', () => {
  let component: SmbRouteComponent;
  let fixture: ComponentFixture<SmbRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmbRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmbRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
