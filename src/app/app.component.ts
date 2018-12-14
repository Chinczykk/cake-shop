import { Component } from '@angular/core';
import { FakeBackendService } from './fake-backend/fake-backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public modal = false;
  public items = [];

  constructor(public fakeBackend: FakeBackendService) {
    this.items = fakeBackend.get('cakes_list');
  }

  public closeModal() {
    this.modal = false;
  }

  public openModal() {
    this.modal = true;
  }

}
