import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationTrackerService, OrientationData } from '../../services/orientation-tracker.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orientation-tracker',
  imports: [CommonModule],
  templateUrl: './orientation-tracker.component.html',
  styleUrl: './orientation-tracker.component.scss'
})

export class OrientationTrackerComponent implements OnInit, OnDestroy {
  orientation: OrientationData = { alpha: 0, beta: 0, gamma: 0 };
  tiltX = 0;
  tiltY = 0;
  lineEndX = 100;
  lineEndY = 10;

  private orientationSubscription: Subscription | null = null;
  private tiltSubscription: Subscription | null = null;

  constructor(private orientationService: OrientationTrackerService) {}

  ngOnInit() {
    this.orientationSubscription = this.orientationService.getOrientation()
      .subscribe(data => {
        this.orientation = data;
        this.updateOrientationLine();
      });

    this.tiltSubscription = this.orientationService.calculateTilt()
      .subscribe(tilt => {
        this.tiltX = tilt.tiltX;
        this.tiltY = tilt.tiltY;
      });
  }

  private updateOrientationLine() {
    // Convert degrees to radians
    const angleRad = (this.orientation.alpha - 90) * (Math.PI / 180);
    
    // Calculate line end point based on angle
    const radius = 90;
    this.lineEndX = 100 + radius * Math.cos(angleRad);
    this.lineEndY = 100 + radius * Math.sin(angleRad);
  }

  ngOnDestroy() {
    this.orientationSubscription?.unsubscribe();
    this.tiltSubscription?.unsubscribe();
  }
}