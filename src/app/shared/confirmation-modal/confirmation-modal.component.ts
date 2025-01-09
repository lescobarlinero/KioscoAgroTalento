import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  standalone: true,
  styleUrls: ['./confirmation-modal.component.css'], // Add this if you have additional styles
})
export class ConfirmationModalComponent {
  @Input() title: string = 'Confirm Action';
  @Input() description: string = 'Are you sure you want to proceed?';
  @Input() confirmText: string = 'Confirm';
  @Input() cancelText: string = 'Cancel';

  @Output() response: EventEmitter<boolean> = new EventEmitter<boolean>();

  confirm() {
    this.response.emit(true);
  }

  cancel() {
    this.response.emit(false);
  }
}
