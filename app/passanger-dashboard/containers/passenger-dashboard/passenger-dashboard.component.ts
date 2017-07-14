import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {PassengerDashboardService} from "../../passenger-dashboard.service";

import {Passenger} from '../../models/Passenger.interface';

@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.scss'],
  template: `
    <div>

      <h3>Airline Passengers</h3>
      <passenger-count [items]="passengers"></passenger-count>
      <ul>
        <li *ngFor="let passenger of passengers">{{passenger.fullname}}</li>
      </ul>
      <passenger-detail *ngFor="let passenger of passengers" [detail]="passenger"
      (edit)="handleEdit($event)"
      (remove)="handleRemove($event)"
      (view)="handleView($event)"
      ></passenger-detail>
    </div>
  `
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];
  constructor(private router: Router, private passengerService: PassengerDashboardService) {}
  ngOnInit() {
    this.passengerService
      .getPassengers()
      .subscribe((data: Passenger[]) => this.passengers = data, (err) => console.log(err));
  }
  handleEdit(event: Passenger) {
    this.passengerService.updatePassenger(event).subscribe((data: Passenger) => {
      this.passengers = this.passengers.map((p: Passenger) => (p.id === event.id ? Object.assign({}, p, event) : p));
    });
  }
  handleRemove(event:Passenger) {
    this.passengerService
      .removePassenger(event)
      .subscribe((data: Passenger) => {this.passengers = this.passengers.filter((p: Passenger) => (p.id !== event.id))})
  }
  handleView(event: Passenger) {
    this.router.navigate(['/passengers', event.id]);
  }
}
