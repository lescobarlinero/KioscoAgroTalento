import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Multimedia } from '../types/multimedia';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalSubject = new Subject<Multimedia>();
  modalContent$ = this.modalSubject.asObservable();

  // New Subject to track when modal is closed
  private modalClosedSubject = new Subject<void>();
  modalClosed$ = this.modalClosedSubject.asObservable();
  private isVisible = false;

  constructor() { }

  showModal(content: Multimedia): void {
    this.modalSubject.next(content);
    this.isVisible = true;
  }

  closeModal(): void {
    this.modalClosedSubject.next(); // Emit event when modal is closed
    this.isVisible = false;
  }

  modalIsVisible(): boolean {
    return this.isVisible;
  }
}
