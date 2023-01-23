import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreedComponent } from './breed/breed.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'',component: HomeComponent
  },
  {
    path:'Breed',component:BreedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
