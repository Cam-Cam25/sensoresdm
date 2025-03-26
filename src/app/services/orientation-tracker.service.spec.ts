import { TestBed } from '@angular/core/testing';

import { OrientationTrackerService } from './orientation-tracker.service';

describe('OrientationTrackerService', () => {
  let service: OrientationTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrientationTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
