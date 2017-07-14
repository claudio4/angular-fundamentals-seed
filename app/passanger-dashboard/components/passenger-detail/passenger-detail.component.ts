import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';

import {Passenger} from '../../models/Passenger.interface';

@Component({
  selector:'passenger-detail',
  styleUrls: ['passenger-detail.component.scss'],
  template: `
    <div>
      <span
        class="status" [class.checked-in]="detail.checkedIn"></span>
      <div>
        <input *ngIf="editing"
          type="text"
          [value]="detail.fullname"
          (input)="onNameChange(name.value)"
          #name/>
        <label *ngIf="!editing">{{detail.fullname}}</label>
      </div>
      <div class="date">
        Check in date:
        {{ detail.checkInDate ? (detail.checkInDate | date: 'yMMMMd' | uppercase) : 'Not checked in' }}
      </div>
      <button (click)="toogleEdit()">{{editing ? "Done" : "Edit"}}</button>
      <button (click)="onRemove()">Remove</button>
      <button (click)="goToPassenger()">View</button>
    </div>
  `
})
export class PassengerDetailComponent implements OnInit{
  @Input()
  detail: Passenger;

  @Output()
  edit = new EventEmitter<Passenger>();

  @Output()
  remove = new EventEmitter<Passenger>();
  @Output()
  view = new EventEmitter<Passenger>();

  editing = false;

  ngOnInit() {
    this.detail = Object.assign({},  this.detail);
  }
  onNameChange(v: string) {
    this.detail.fullname = v;
  }
  toogleEdit() {
    if(this.editing) {
      this.edit.emit(this.detail);
    }
    this.editing = !this.editing;
  }
  onRemove() {
    this.remove.emit(this.detail);
  }
  goToPassenger() {
    this.view.emit(this.detail);
  }
}
