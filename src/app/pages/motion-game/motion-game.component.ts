import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotionGameService } from '../../services/motion-game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-motion-game',
  imports: [CommonModule],
  templateUrl: './motion-game.component.html',
  styleUrl: './motion-game.component.scss'
})

export class MotionGameComponent implements OnInit, OnDestroy {
  gameScore = 0;
  currentMotion = { x: 0, y: 0, z: 0 };
  private scoreSubscription: Subscription | null = null;
  private motionSubscription: Subscription | null = null;

  constructor(private motionGameService: MotionGameService) {}

  ngOnInit() {
    this.scoreSubscription = this.motionGameService.getGameScore()
      .subscribe(score => this.gameScore = score);

    this.motionSubscription = this.motionGameService.getDeviceMotion()
      .subscribe(motion => this.currentMotion = motion);
  }

  resetGame() {
    this.motionGameService.resetGame();
  }

  ngOnDestroy() {
    this.scoreSubscription?.unsubscribe();
    this.motionSubscription?.unsubscribe();
  }
}