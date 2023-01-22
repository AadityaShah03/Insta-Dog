import { Component } from '@angular/core';

@Component({
  selector: 'app-breed',
  template: `
    <section class="hero is-warning is-bold">
      <div class="hero-body has-text-centered">
        <div class="container ">
          <p class="title">
            Search by Breed
          </p>
        </div>
      </div>
    </section>

    <section class = "section">
      <p>
        You selected {{ selectedBreed }} dog breed to search
      </p>
      <div class="dropdown">
        <select #breed (change)="onSelected(breed.value)" class="dropdown-content">
          <option default >
            <a href="#" class="dropdown-item">
              Pick a breed
            </a>
          </option>
          <option >
            <a href="#" class="dropdown-item">
              Pick a breed
            </a>
          </option>
        </select>
      </div>
    </section>


    <section class="buttons">
      <button class="button is-primary is-medium is-fullwidth is-outlined">
        Search by Breed!
      </button>
    </section>
  `,
  styles: [
  ]
})
export class BreedComponent {
  selectedBreed="______";
  onSelected(arg0: string):void {
    this.selectedBreed=arg0;
  }


}
