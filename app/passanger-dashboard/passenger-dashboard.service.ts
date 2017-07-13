import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import "rxjs/add/operator/toPromise"

import { Passenger } from './models/Passenger.interface';

const PASSENGER_API = "/api/passengers"

@Injectable()
export class PassengerDashboardService {
  constructor(private http: Http) {}
  getPassengers(): Promise<Passenger[]> {
    return this.http
      .get(PASSENGER_API)
      .toPromise()
      .then((r: Response) => (r.json()))
  }
  updatePassenger(passenger:Passenger): Promise<Passenger> {
    let options = new RequestOptions({
      headers: new Headers({
        'Content-type': 'application/json'
      })
    })
    return this.http
      .put(`${PASSENGER_API}/${passenger.id}`, passenger,options)
      .toPromise()
      .then((r: Response) => r.json());
  }
  removePassenger(passenger:Passenger): Promise<Passenger> {
    return this.http
      .delete(`${PASSENGER_API}/${passenger.id}`)
      .toPromise()
      .then((r: Response) => r.json());
  }
}
