import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <section class="hero is-primary is-bold is-fullheight ">
    <div class="hero-body has-text-centered">
      <div class="container ">
        <p class="title has-text-dark">
          Random Dog Genorator
        </p>
      </div>
    </div>
  </section>
  `,
  styles: [`
    .hero{
      background-image: url('/assets/img/dog.jpg') !important;
      background-size: cover;
      background-position: center center;
      filter: brightness(80%);
    }
  `]
})
export class HomeComponent {

}
