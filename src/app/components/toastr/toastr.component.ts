import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent {

  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Input() value;

  constructor() {
    setTimeout(() => {
      this.remove.emit();
    }, 3000);
  }

}
