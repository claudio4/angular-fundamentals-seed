import { Component } from '@angular/core';

@Component({
  selector: 'not-found',
  template: `
    <div>
      <h1>Error 404</h1>
      <h2>Not found</h2>
      <div><a routerLink="/">Go home</a></div>
    </div>
  `
})

export class NotFoundComponent {}
