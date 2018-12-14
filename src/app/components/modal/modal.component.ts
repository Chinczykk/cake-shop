import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Output() close: EventEmitter<any> = new EventEmitter();

  public cakeForm = new FormGroup({
    image: new FormControl('', [
      Validators.required
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ]),
    desc: new FormControl('', [
      Validators.maxLength(250)
    ]),
    numberOfPortions: new FormControl('', [
      Validators.required
    ]),
    cost: new FormControl('', [
      Validators.required
    ])
  });

  constructor() {}

  public closeModal() {
    this.close.emit();
  }

}
