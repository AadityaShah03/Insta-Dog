import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogsService {

  constructor(private http: HttpClient) { }

  getRandomPics():Observable<any> {
    return this.http.get("https://dog.ceo/api/breeds/image/random", {});
  }

  getBreedList():Observable<any> {
    return this.http.get("https://dog.ceo/api/breeds/list/all", {});
  }

  getRandomBreedPic(breed:string):Observable<any> {
    return this.http.get("https://dog.ceo/api/breed/"+breed+"/images/random", {});
  }
}
