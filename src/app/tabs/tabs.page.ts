import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router) {}

  onClick(){
    this.router.navigate(['tabs/tab1']);

    setTimeout(() => {
      window.location.reload();
    }, 20)
  }
}
