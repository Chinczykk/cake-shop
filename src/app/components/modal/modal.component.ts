import { Component, Output, EventEmitter, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FakeBackendService } from '../../fake-backend/fake-backend.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public uploadedImage: String = '';
  public costPerPortion: Number = 0;

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() item;

  public cakeForm = new FormGroup({
    image: new FormControl('', (this.item) ? (this.item.id) ? [
      Validators.required
    ] : [] : []),
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

  constructor(public fakeBackend: FakeBackendService) {}

  public closeModal() {
    this.close.emit();
  }

  public ngOnInit() {
    if (this.item.id) {
      const form = this.cakeForm.controls;
      this.uploadedImage = this.item.image;
      form['name'].setValue(this.item.name);
      form['desc'].setValue(this.item.desc);
      form['numberOfPortions'].setValue(this.item.numberOfPortions);
      form['cost'].setValue(this.item.cost);
      this.countPortionCost();
    }
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

  public countPortionCost() {
    if (this.cakeForm.controls['numberOfPortions'].value && this.cakeForm.controls['cost'].value > 0) {
      this.costPerPortion = Math.round(this.cakeForm.controls['cost'].value / this.cakeForm.controls['numberOfPortions'].value);
    }
  }

  public save() {
    if (this.cakeForm.valid) {
      const id = Date.now();
      const image = this.uploadedImage;
      const name = this.cakeForm.controls['name'].value;
      const desc = this.cakeForm.controls['desc'].value;
      const cost = this.cakeForm.controls['cost'].value;
      const numberOfPortions = this.cakeForm.controls['numberOfPortions'].value;
      const obj = {
        id,
        image,
        name,
        desc,
        cost,
        numberOfPortions
      };
      if (this.item) {
        if (this.item.id) {
          obj.id = this.item.id;
          this.fakeBackend.updateItemWithId('cakes_list', this.item.id, obj);
        } else {
          this.fakeBackend.add('cakes_list', obj);
        }
      } else {
        this.fakeBackend.add('cakes_list', obj);
      }
      this.closeModal();
    }
  }

}
