import {Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {HttpService} from "../HTTPService";

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
export class Tab1Page implements OnDestroy, OnInit{

  constructor(private elementRef: ElementRef, private http: HttpService) {}


  isRising = false;

  startRiseAnimation() {
    this.isRising = true;

    this.http.startDrone().subscribe(result => {
      console.log("Drone gestartet");
    });
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

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }

  ngOnInit() {
    console.log("New Comp");
  }

}
