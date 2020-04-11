import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionTransformerComponent } from './distribution-transformer.component';

describe('DistributionTransformerComponent', () => {
  let component: DistributionTransformerComponent;
  let fixture: ComponentFixture<DistributionTransformerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionTransformerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionTransformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
