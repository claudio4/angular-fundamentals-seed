import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import { PassengerDashboardModule } from './passanger-dashboard/passenger-dashboard.module';

import {AppComponent} from './app.component';
import {HomeComponent} from './home.component';
import {NotFoundComponent} from './not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  { path: '**', pathMatch: 'full', redirectTo: '/' }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    // Angular modules
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes, {useHash: false}),
    // Custom modules
    PassengerDashboardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
