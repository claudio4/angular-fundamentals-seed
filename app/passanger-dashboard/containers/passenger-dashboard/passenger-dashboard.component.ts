import {Component} from '@angular/core';

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
      ></passenger-detail>
    </div>
  `
})
export class PassengerDashboardComponent {
  passengers: Passenger[] = [{
    id: 1,
    fullname: 'Stephen',
    checkedIn: true,
    checkInDate: 1490742000000,
    children: null
  }, {
    id: 2,
    fullname: 'Rose',
    checkedIn: false,
    checkInDate: null,
    children: [{ name: 'Ted', age: 12 },{ name: 'Chloe', age: 7 }]
  }, {
    id: 3,
    fullname: 'James',
    checkedIn: true,
    checkInDate: 1491606000000,
    children: null
  }, {
    id: 4,
    fullname: 'Louise',
    checkedIn: true,
    checkInDate: 1488412800000,
    children: [{ name: 'Jessica', age: 1 }]
  }, {
    id: 5,
    fullname: 'Tina',
    checkedIn: false,
    checkInDate: null,
    children: null
  }];
  handleEdit(event: Passenger) {
    this.passengers = this.passengers.map((p: Passenger) => (p.id === event.id ? Object.assign({}, p, event) : p));
  }
  handleRemove(event:Passenger) {
    this.passengers = this.passengers.filter((p: Passenger) => (p.id !== event.id))
  }
}
