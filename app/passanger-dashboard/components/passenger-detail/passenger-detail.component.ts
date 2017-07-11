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
      <div class="children">
        Children: {{ detail.children?.length || 0 }}
      </div>
      <button (click)="toogleEdit()">{{editing ? "Done" : "Edit"}}</button>
      <button (click)="onRemove()">Remove</button>
    </div>
  `
})
export class PassengerDetailComponent implements OnChanges, OnInit{
  @Input()
  detail: Passenger;

  @Output()
  edit: EventEmitter<any> = new EventEmitter();

  @Output()
  remove: EventEmitter<any> = new EventEmitter();

  editing = false;

  ngOnChanges(change) {
    console.log(change);
  }
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
}
