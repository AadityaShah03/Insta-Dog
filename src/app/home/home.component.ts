import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DogsService } from '../dogs.service';

@Component({
  selector: 'app-home',
  template: `
  <section class="hero is-primary is-bold">
    <div class="hero-body has-text-centered">
      <div class="container ">
        <p class="title has-text-dark">
          Random Dog Generator
        </p>
      </div>
    </div>
  </section>
  
  <section class="section">
      <div class="container has-text-centered" id="breedContainer">
        <img class="image" src= {{src}} alt="dog" id="breedPic">
      </div>
    </section>

    <section class="section">
      <div class="container has-text-centered p-auto">
        <button class="button is-primary is-medium  is-outlined" (click)= "getRandomPic()">
          Randomize!
        </button>
      </div>
    </section>

    <section class="section">
      <ng-container *ngIf= "show">
      <div class="container has-text-centered" id="rating" visibility="hidden">
        <form>
          <div class="field">
            <label class="label">Enter a Rating from 1-10</label>
            <input type="number" id="rateNum" min="0" max="10" class="input" (keydown.enter)= "saveRatingEnter($event)">
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
                      <img class="image" src='{{ val.key }}' >
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
  styles: [`
    .image{
      max-height: 500px;
      height: 70%;
      width: auto;
      margin: auto;
      display: block;
    }
  `]
})
export class HomeComponent implements OnInit {
  i = false;

  show = false;

  src= "/assets/img/dog.jpg" ;


  ratings:any[]=[];


  constructor(public dogService:DogsService,private cookies:CookieService){}

  ngOnInit() {
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
      this.getRandomPic();
      this.getHistory();
      if(this.i){
        this.sortAcc();
      }
      else{
        this.sortDec();
      }

    }
  }

  saveRatingEnter(e: { preventDefault: () => void; }):void{
    e.preventDefault();
    let ratingInput =Number((<HTMLInputElement> document.getElementById("rateNum")).value);
    if(!(ratingInput>10 || ratingInput<0) && this.src!="/assets/img/dog.jpg" && (<HTMLInputElement> document.getElementById("rateNum")).value!=""){
      this.cookies.set(this.src,ratingInput.toString());
      (<HTMLInputElement> document.getElementById("rateNum")).value="";
      this.getRandomPic();
      this.getHistory();
      if(this.i){
        this.sortAcc();
      }
      else{
        this.sortDec();
      }

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
