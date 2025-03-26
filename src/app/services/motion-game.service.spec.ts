import { TestBed } from '@angular/core/testing';

import { MotionGameService } from './motion-game.service';

describe('MotionGameService', () => {
  let service: MotionGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotionGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
