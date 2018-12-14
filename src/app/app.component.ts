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
  public itemToEdit: Object = {};
  public toastr: Boolean = false;
  public toastrValue: String = '';

  constructor(public fakeBackend: FakeBackendService) {
    this.updateItems();
  }

  public closeModal() {
    this.modal = false;
  }

  public openModal() {
    this.itemToEdit = {};
    this.modal = true;
  }

  public updateItems() {
    this.items = this.fakeBackend.get('cakes_list');
  }

  public edit(item) {
    this.itemToEdit = item;
    this.modal = true;
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
