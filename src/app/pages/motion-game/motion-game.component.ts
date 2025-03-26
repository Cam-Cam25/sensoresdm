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
  ballX = 50;
  ballY = 50;
  private motionHandler: ((event: DeviceMotionEvent) => void) | null = null;

  ngOnInit() {
    if (window.DeviceMotionEvent) {
      this.motionHandler = (event: DeviceMotionEvent) => {
        const acc = event.accelerationIncludingGravity;
        if (acc) {
          this.ballX += acc.x ? acc.x * 1.5 : 0;
          this.ballY -= acc.y ? acc.y * 1.5 : 0;

          this.ballX = Math.max(0, Math.min(90, this.ballX));
          this.ballY = Math.max(0, Math.min(90, this.ballY));
        }
      };
      window.addEventListener('devicemotion', this.motionHandler);
    }
  }

  ngOnDestroy() {
    if (this.motionHandler) {
      window.removeEventListener('devicemotion', this.motionHandler);
    }
  }
}
