import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="container content has-text-centered">
        <p>Project made by Aaditya Shah using Angular CLI</p>
        <p (click)="openGithub()">GitHub: https://github.com/AadityaShah03</p>
        <p>Email: Aaditya.Shah@hotmail.com</p>
      </div>
    </footer>
  `,
  styles: [
  ]
})
export class FooterComponent {
  openGithub(){
    window.open("https://github.com/AadityaShah03")
  }
}
