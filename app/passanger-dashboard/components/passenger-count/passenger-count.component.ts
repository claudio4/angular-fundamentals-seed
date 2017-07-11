import {Component, Input} from '@angular/core';
import {Passenger} from "../../models/Passenger.interface"
@Component({
  selector: 'passenger-count',
  template: `
    <div>
      Total Checked in: {{checkedInCount()}} / {{items.length}}
    </div>
  `
})
export class PassengerCountComponent{
  @Input()
  items: Passenger[];
  checkedInCount(): number {
    if(!this.items) return;
    return this.items.filter((p: Passenger) => {return p.checkedIn}).length;
  }
}
