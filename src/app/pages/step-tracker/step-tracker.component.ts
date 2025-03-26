import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepCounterService } from '../../services/step-counter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-step-tracker',
  imports: [CommonModule],
  templateUrl: './step-tracker.component.html',
  styleUrl: './step-tracker.component.scss'
})

export class StepTrackerComponent implements OnInit, OnDestroy {
  stepCount = 0;
  private stepSubscription: Subscription | null = null;

  constructor(private stepCounterService: StepCounterService) {}

  ngOnInit() {
    this.stepSubscription = this.stepCounterService.getStepCount()
      .subscribe(steps => this.stepCount = steps);
  }

  resetSteps() {
    this.stepCounterService.resetStepCount();
  }

  ngOnDestroy() {
    this.stepSubscription?.unsubscribe();
  }
}