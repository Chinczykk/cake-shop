import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
      Validators.required
    ]),
    desc: new FormControl(''),
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

  public adjustHeight(el) {
    el.style.overflow = 'hidden';
    el.style.height = '0px';
    el.style.height = el.scrollHeight + 'px';
  }

  public getStyle(el) {
    if (el.value === '') {
      return '#C4C4C4';
    } else {
      return '#FFA786';
    }
  }

}
