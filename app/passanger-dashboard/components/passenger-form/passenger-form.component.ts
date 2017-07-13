import { Component, Input, Output, EventEmitter } from '@angular/core';

import {Passenger} from '../../models/Passenger.interface';
import {Baggage} from '../../models/baggage.interface';

@Component({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.scss'],
  template: `
    <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>
      {{detail | json}}
      <div>
        <label for="fullname">Passenger name: </label>
        <input type="text" name="fullname" required #fullname="ngModel" [ngModel]="detail?.fullname"/>
        <div *ngIf="fullname.errors?.required && fullname.touched" class="error">
          Passenger name is required
        </div>
      </div>
      <div>
        <label for="id">Passenger ID: </label>
        <input type="number" name="id" required #Id="ngModel" [ngModel]="detail?.id"/>
        <div *ngIf="Id.errors?.required && Id.touched" class="error">
          Passenger ID is required
        </div>
      </div>
      <div>
        <label for="checkedIn">Is checkedIn:</label>
        <input type="checkbox" name="checkedIn" [ngModel]="detail?.checkedIn" (ngModelChange)="toogleCheckIn($event)">
      </div>
      <div *ngIf="form.value.checkedIn">
        <label for="id">Checked in date: </label>
        <input type="number" name="checkInDate" [ngModel]="detail?.checkInDate"/>
      </div>
      <div>
        Luggage:
        <select name="baggage" [ngModel]="detail?.baggage">
          <option *ngFor="let item of baggage" [value]="item.key" >
            {{item.value}}
          </option>
        </select>
      </div>
      <button [disabled]="form.invalid" type="submit">Update passenger</button>
    </form>
  `
})
export class PassengerFormComponent {
  @Input()
  detail: Passenger;
  @Output()
  update = new EventEmitter<Passenger>();

  baggage: Baggage[]= [
    {
      key: 'none',
      value: 'No baggage'
    },
    {
      key: 'hand-only',
      value: 'Hand baggage'
    },
    {
      key: 'hold-only',
      value: 'Hold baggage'
    },
    {
      key: 'hand-hold',
      value: 'Hand and hold baggage'
    }
  ];

  toogleCheckIn(checkedIn: boolean) {
    if(checkedIn) {
      this.detail.checkInDate = Date.now();
    }
  }
  handleSubmit(p: Passenger, valid: boolean) {
    if(valid) {
      this.update.emit(p)
    }
  }
}
