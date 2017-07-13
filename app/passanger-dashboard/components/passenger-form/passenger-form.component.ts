import { Component, Input } from '@angular/core';

import {Passenger} from '../../models/Passenger.interface';

@Component({
  selector: 'passenger-form',
  template: `
    <form #form="ngForm" novalidate>
      {{detail | json}}
      <div>
        <label for="fullname">Passenger name: </label>
        <input type="text" name="fullname" [ngModel]="detail?.fullname"/>
      </div>
      <div>
        <label for="id">Passenger ID: </label>
        <input type="number" name="id" [ngModel]="detail?.id"/>
      </div>
      <div>
        <label for="checkedIn">Is checkedIn:</label>
        <label>
          <input type="radio" name="checkedIn" [value]="true" [ngModel]="detail?.checkedIn" (ngModelChange)="toogleCheckIn($event)">
          Yes
        </label>
        <label>
          <input type="radio" name="checkedIn" [value]="false" [ngModel]="detail?.checkedIn" (ngModelChange)="toogleCheckIn($event)">
          No
        </label>
      </div>
      <div *ngIf="form.value.checkedIn">
        <label for="id">Checked in date: </label>
        <input type="number" name="checkInDate" [ngModel]="detail?.checkInDate"/>
      </div>
      {{form.value | json}}
    </form>
  `
})
export class PassengerFormComponent {
  @Input()
  detail: Passenger

  toogleCheckIn(checkedIn: boolean) {
    if(checkedIn) {
      this.detail.checkInDate = Date.now();
    }
  }
}
