import { Component } from '@angular/core';
import { FakeBackendService } from './fake-backend/fake-backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private messages = {
    'add': 'DODAŁEŚ NOWE CIASTO!',
    'remove': 'USUNĄŁEŚ CIASTO!',
    'edit': 'ZMIENIŁEŚ CIASTO!',
  };

  public modal: Boolean = false;
  public items: any = [];
  public itemToEdit: any = {};
  public toastr: Boolean = false;
  public toastrValue: String = '';

  constructor(public fakeBackend: FakeBackendService) {
    this.updateItems();
  }

  public closeModal(event) {
    this.modal = false;
    if (event === 'edit') {
      this.activateToastr(this.messages.edit);
    } else if (event === 'add') {
      this.activateToastr(this.messages.add);
    }
  }

  public openModal() {
    this.itemToEdit = {};
    this.modal = true;
    this.removeToastr();
  }

  public updateItems() {
    this.items = this.fakeBackend.get('cakes_list');
  }

  public edit(item) {
    this.itemToEdit = item;
    this.modal = true;
    this.removeToastr();
  }

  public remove(item) {
    this.fakeBackend.removeItemWithId('cakes_list', item.id);
    this.updateItems();
    this.activateToastr(this.messages.remove);
  }

  public activateToastr(message) {
    this.toastrValue = message;
    this.toastr = true;
  }

  public removeToastr() {
    this.toastr = false;
    this.toastrValue = '';
  }

}
