import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import "rxjs/add/operator/map"

import { Passenger } from './models/Passenger.interface';

const PASSENGER_API = "/api/passengers"

@Injectable()
export class PassengerDashboardService {
  constructor(private http: Http) {}
  getPassengers(): Observable<Passenger[]> {
    return this.http
      .get(PASSENGER_API)
      .map((r: Response) => (r.json()))
  }
  updatePassenger(passenger:Passenger): Observable<Passenger> {
    let options = new RequestOptions({
      headers: new Headers({
        'Content-type': 'application/json'
      })
    })
    return this.http
      .put(`${PASSENGER_API}/${passenger.id}`, passenger,options)
      .map((r: Response) => r.json());
  }
  removePassenger(passenger:Passenger): Observable<Passenger> {
    return this.http
      .delete(`${PASSENGER_API}/${passenger.id}`)
      .map((r: Response) => r.json());
  }
}
