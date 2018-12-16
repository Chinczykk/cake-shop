import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ModalComponent } from './components/modal/modal.component';
import { ToastrComponent } from './components/toastr/toastr.component';
import { FakeBackendService } from './fake-backend/fake-backend.service';
import { RemoveConfirmationComponent } from './components/remove-confirmation/remove-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    ToastrComponent,
    RemoveConfirmationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    FakeBackendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
