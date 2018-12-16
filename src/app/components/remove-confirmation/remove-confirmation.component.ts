import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-remove-confirmation',
  templateUrl: './remove-confirmation.component.html',
  styleUrls: ['./remove-confirmation.component.scss']
})
export class RemoveConfirmationComponent {

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() decision: EventEmitter<any> = new EventEmitter();

  constructor() {}

  public closeModal() {
    this.close.emit('');
  }

  public answer(status) {
    this.decision.emit(status);
  }

}
