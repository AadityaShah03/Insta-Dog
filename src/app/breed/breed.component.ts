import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { DogsService } from '../dogs.service';

interface val {
  name: String;
  value: Number;
}
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
        <img src= {{src}} alt="dog" id="breedPic">
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
      <ng-container *ngIf= "show">
      <div class="container has-text-centered" id="rating" visibility="hidden">
        <form>
          <div class="field">
            <label class="label">Enter a Rating from 1-10</label>
            <input type="number" id="rateNum" min="0" max="10" class="input">
          </div>
            <button class="button is-info is-small is-fullwidth is-outlined"
            type="button" (click) =saveRating()>Submit Rating</button>
        </form>
      </div>
      </ng-container>
    </section>

    <section class="hero">
      <div class="container has-text-centered">
        <ng-container *ngIf= "show">
          <div class="columns is-centered">
            <div class="column is-narrow">
              <table class="table"  (click)= "toggleOrder()">
                <thead>
                    <tr>
                      <th>
                      <span class="hero-body">
                          <p class="title">
                        Image
                          </p>
                      </span>
                      </th>
                      <th>
                        <span class="hero-body">
                          <p class="title">
                            Rating
                          </p>
                        </span>
                      </th>
                    </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let val of ratings">
                    <td>
                      <img src='{{ val.key }}' >
                    </td>
                    <td>{{ val.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </ng-container>
      </div>
    </section>
  `,
  styles: []
})


export class BreedComponent implements OnInit {

  i = false;

  show = false;

  src= "/assets/img/dog.jpg" ;

  selectedBreed="______";

  ratings:any[]=[];

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
        this.selectedBreed = Object.keys(values)[0];
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
        let values = JSON.parse(JSON.stringify(data.message));
        //select.innerHTML= "<img src="+values+" alt='dog' >";
        this.src=values;
        this.show=true;

        this.getHistory();
        this.sortDec();
      },
      error =>{
        console.log("error")
      }
    )
  }

  getRandomPic() {
    this.dogService.getRandomPics().subscribe(
      data=>{
        let values = JSON.parse(JSON.stringify(data.message));
        //select.innerHTML= "<img src="+values+" alt='dog' >";
        this.src = values;
        this.show=true;
      },
      error =>{
        console.log("error")
      }
    )
  }

  saveRating(){
    let ratingInput =Number((<HTMLInputElement> document.getElementById("rateNum")).value);
    if(!(ratingInput>10 || ratingInput<0) && this.src!="/assets/img/dog.jpg" && (<HTMLInputElement> document.getElementById("rateNum")).value!=""){
      this.cookies.set(this.src,ratingInput.toString());
      (<HTMLInputElement> document.getElementById("rateNum")).value="";
      this.getRandomBreedPic(this.selectedBreed);

    }
  }

  getHistory(){
    let temp:{} =this.cookies.getAll();
    const info: any[] = [];
    this.ratings=Object.entries(temp).map( entry =>({key:entry[0],value:entry[1]}));
    console.log(this.ratings);
  }

  sortDec(){
    this.ratings.sort(function(a,b) {
      return b.value - a.value
    });
  }

  sortAcc(){
    this.ratings.sort(function(a,b) {
      return a.value -b.value
    });
  }

  toggleOrder(){
    if(this.i){
      this.i=false;
      this.getHistory();
      this.sortDec();
    }else{
      this.i=true;
      this.getHistory();
      this.sortAcc();
    }
  }



}
