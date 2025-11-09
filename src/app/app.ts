import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeesTracking } from './fees-tracking/fees-tracking';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FeesTracking],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Fees-tracking');
}
