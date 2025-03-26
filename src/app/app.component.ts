import { Component } from '@angular/core';
import { StepTrackerComponent } from './pages/step-tracker/step-tracker.component';
import { MotionGameComponent } from './pages/motion-game/motion-game.component';
import { OrientationTrackerComponent } from './pages/orientation-tracker/orientation-tracker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports:[  StepTrackerComponent, 
    MotionGameComponent, 
    OrientationTrackerComponent]
})
export class AppComponent {
  title = 'angular-motion';
}
