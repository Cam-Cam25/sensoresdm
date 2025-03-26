import { Injectable } from '@angular/core';
import { Motion } from '@capacitor/motion';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotionGameService {
  private gameScore = new BehaviorSubject<number>(0);
  private deviceMotion = new BehaviorSubject<{ x: number, y: number, z: number }>({ x: 0, y: 0, z: 0 });

  constructor() {
    this.initMotionTracking();
  }

  private async initMotionTracking() {
    await Motion.addListener('accel', (event) => {
      const acceleration = event.acceleration;
      this.deviceMotion.next(acceleration);
      this.calculateGameScore(acceleration);
    });
  }

  private calculateGameScore(acceleration: { x: number, y: number, z: number }) {
    // Simple scoring mechanism based on motion intensity
    const motionIntensity = Math.sqrt(
      acceleration.x ** 2 + 
      acceleration.y ** 2 + 
      acceleration.z ** 2
    );

    if (motionIntensity > 2) {
      const currentScore = this.gameScore.getValue();
      this.gameScore.next(currentScore + Math.floor(motionIntensity));
    }
  }

  getDeviceMotion(): Observable<{ x: number, y: number, z: number }> {
    return this.deviceMotion.asObservable();
  }

  getGameScore(): Observable<number> {
    return this.gameScore.asObservable();
  }

  resetGame() {
    this.gameScore.next(0);
  }
}