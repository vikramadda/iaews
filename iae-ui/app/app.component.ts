import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<app-header></app-header><div><router-outlet></router-outlet></div><app-footer></app-footer>
  `
})
export class AppComponent  {}
