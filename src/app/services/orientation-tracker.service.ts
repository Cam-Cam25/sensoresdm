import { Injectable } from '@angular/core';
import { Motion } from '@capacitor/motion';
import { BehaviorSubject, Observable } from 'rxjs';

export interface OrientationData {
  alpha: number;  // Rotation around z-axis
  beta: number;   // Rotation around x-axis
  gamma: number;  // Rotation around y-axis
}

@Injectable({
  providedIn: 'root'
})
export class OrientationTrackerService {
  private orientationSubject = new BehaviorSubject<OrientationData>({
    alpha: 0,
    beta: 0,
    gamma: 0
  });

  constructor() {
    this.initOrientationTracking();
  }

  private async initOrientationTracking() {
    await Motion.addListener('orientation', (event) => {
      this.orientationSubject.next({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      });
    });
  }

  getOrientation(): Observable<OrientationData> {
    return this.orientationSubject.asObservable();
  }

  calculateTilt(): Observable<{ tiltX: number, tiltY: number }> {
    return new Observable(observer => {
      this.orientationSubject.subscribe(orientation => {
        observer.next({
          tiltX: orientation.beta,
          tiltY: orientation.gamma
        });
      });
    });
  }
}