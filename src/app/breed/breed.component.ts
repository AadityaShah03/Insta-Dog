import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DogsService } from '../dogs.service';

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

    <section class="section">
      <div class="container has-text-centered" id="breedContainer">
        <img src="/assets/img/dog.jpg" alt="dog" id="breedPic">
      </div>
    </section>


    <section class = "section">
      <div class="container has-text-centered">
        <p>
          You selected {{ selectedBreed }} dog breed to search
        </p>
        <div class="dropdown">
          <select #breed (change)="onSelected(breed.value)" class="dropdown-content" id="breedSelect">
          </select>
        </div>
      </div>
    </section>


    <section class="section">
      <div class="container has-text-centered p-auto">
        <button class="button is-primary is-medium  is-outlined" (click)= "getRandomBreedPic(breed.value)">
          Search by Breed!
        </button>
      </div>
    </section>

    <section class="section">
      <div class="container has-text-centered" id="rating">

      </div>
    </section>
  `,
  styles: []
})
export class BreedComponent implements OnInit {

  rating= {};

  selectedBreed="______";

  onSelected(arg0: string):void {
    this.selectedBreed=arg0;
  }

  constructor(public dogService:DogsService,private cookies:CookieService){}

  ngOnInit() {
      this.getBreedList();
  }

  getBreedList() {
    this.dogService.getBreedList().subscribe(
      data=>{
        let select = document.getElementById("breedSelect")!;
        let values = JSON.parse(JSON.stringify(data.message));
        for(const element of Object.keys(values)) {
            let opt = element;
            let el = document.createElement("option");
            let a = document.createElement("a");
            a.textContent = opt;
            el.append(a);
            el.value = opt;
            select.appendChild(el);
        }
      },
      error =>{
        console.log("error")
      }
    )
  }

  getRandomBreedPic(breed:string) {
    this.dogService.getRandomBreedPic(breed).subscribe(
      data=>{
        let select = document.getElementById("breedContainer")!;
        let values = JSON.parse(JSON.stringify(data.message));
        select.innerHTML= "<img src="+values+" alt='dog' >";

        document.getElementById("rating")!.innerHTML = ('<section class="section"> <div class="container has-text-centered"> <form> <div class="field">  <label class="label">Enter a Rating from 1-10</label> <input type="number" name="Rating" min="0" max="10" class="input"> </div> <button class="button is-warning is-small is-fullwidth is-outlined" type="submit"> Submit Rating </button> </form></div></section>');
      },
      error =>{
        console.log("error")
      }
    )
  }

  getRandomPic() {
    this.dogService.getRandomPics().subscribe(
      data=>{
        let select = document.getElementById("breedContainer")!;
        let values = JSON.parse(JSON.stringify(data.message));
        select.innerHTML= "<img src="+values+" alt='dog' >";

        document.getElementById("rating")!.innerHTML = ('<section class="section"> <div class="container has-text-centered"> <form> <div class="field">  <label class="label">Enter a Rating from 1-10</label> <input type="number" name="Rating" min="0" max="10" class="input"> </div> <button class="button is-warning is-small is-fullwidth is-outlined" type="submit"> Submit Rating </button> </form></div></section>');
      },
      error =>{
        console.log("error")
      }
    )
  }

  saveRating(rating:number){

  }



}
