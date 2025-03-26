import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientationTrackerComponent } from './orientation-tracker.component';

describe('OrientationTrackerComponent', () => {
  let component: OrientationTrackerComponent;
  let fixture: ComponentFixture<OrientationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrientationTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrientationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
