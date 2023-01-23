import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DogsService } from '../dogs.service';

@Component({
  selector: 'app-history',
  template: `
    <section class="hero is-danger is-bold">
      <div class="hero-body has-text-centered">
        <div class="container ">
          <p class="title">
            RatingHistory
          </p>
          <p class="subtitle">
            Click on the table to change the order of the ratings
          </p>
        </div>
      </div>
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
export class HistoryComponent implements  OnInit {

  i = false;

  show = true;

  src= "/assets/img/dog.jpg" ;

  selectedBreed="______";

  ratings:any[]=[];

  constructor(public dogService:DogsService,private cookies:CookieService){}

  ngOnInit() {
    this.getHistory();

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
