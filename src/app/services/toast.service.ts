import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<string>();
  toastMessage$ = this.toastSubject.asObservable();

  constructor() {}

  showToast(message: string): void {
    this.toastSubject.next(message);
  }
}
