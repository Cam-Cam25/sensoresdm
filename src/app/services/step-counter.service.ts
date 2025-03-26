import { Injectable } from '@angular/core';
import { Motion } from '@capacitor/motion';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepCounterService {
  private stepCount = new BehaviorSubject<number>(0);
  private lastAcceleration: { x: number, y: number, z: number } | null = null;
  private stepThreshold = 1.5; // Adjust based on device sensitivity

  constructor() {
    this.initStepDetection();
  }

  private async initStepDetection() {
    await Motion.addListener('accel', (event) => {
      if (this.isStep(event.acceleration)) {
        this.incrementStepCount();
      }
    });
  }

  private isStep(acceleration: { x: number, y: number, z: number }): boolean {
    if (!this.lastAcceleration) {
      this.lastAcceleration = acceleration;
      return false;
    }

    const deltaX = Math.abs(acceleration.x - this.lastAcceleration.x);
    const deltaY = Math.abs(acceleration.y - this.lastAcceleration.y);
    const deltaZ = Math.abs(acceleration.z - this.lastAcceleration.z);

    this.lastAcceleration = acceleration;

    return (deltaX > this.stepThreshold || 
            deltaY > this.stepThreshold || 
            deltaZ > this.stepThreshold);
  }

  private incrementStepCount() {
    const currentSteps = this.stepCount.getValue();
    this.stepCount.next(currentSteps + 1);
  }

  getStepCount(): Observable<number> {
    return this.stepCount.asObservable();
  }

  resetStepCount() {
    this.stepCount.next(0);
  }
}