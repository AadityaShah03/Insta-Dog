import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--Header -->
    <app-header></app-header>

    <router-outlet></router-outlet>

    <!--Footer -->
    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'Insta-Dog';
}
