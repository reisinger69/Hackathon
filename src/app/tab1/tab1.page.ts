import {Component, HostListener} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  animations: [
    trigger('riseAnimation', [
      state('false', style({ transform: 'translateY(0)' })),
      state('true', style({ transform: 'translateY(-100%)' })),
      transition('* => *', animate('1.5s'))
    ])
  ]
})
export class Tab1Page {

  constructor() {}

  isRising = false;

  startRiseAnimation() {
    this.isRising = true;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Check if the image has gone out of the viewport
    const imageElement = document.querySelector('.moving-image');
    if (imageElement) {
      const rect = imageElement.getBoundingClientRect();
      this.isRising = rect.bottom >= 0 && rect.top <= window.innerHeight;
    }
  }

}
