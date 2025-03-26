import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotionGameComponent } from './motion-game.component';

describe('MotionGameComponent', () => {
  let component: MotionGameComponent;
  let fixture: ComponentFixture<MotionGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotionGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotionGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
