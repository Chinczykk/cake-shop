import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  public uploadedImage = '';
  public costPerPortion = 0;

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

  public uploadImage(el) {
    const file = el.files[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = this.handleReaderLoaded.bind(this);
    }
  }

  public handleReaderLoaded(e) {
    this.uploadedImage = e.target.result;
  }

  public getImage() {
    if (this.uploadedImage === '') {
      return '../../../assets/add-cake.svg';
    } else {
      return this.uploadedImage;
    }
  }

  public countPortionCost(el) {
    if (this.cakeForm.controls['numberOfPortions'].value) {
      this.costPerPortion = Math.round(this.cakeForm.controls['cost'].value / this.cakeForm.controls['numberOfPortions'].value);
    }
  }

}
