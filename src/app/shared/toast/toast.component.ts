import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  isVisible = false;
  message: string = '';

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastMessage$.subscribe((msg: string) => {
      this.message = msg;
      this.showToast();
    });
  }

  showToast(): void {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 3000); // Toast visible for 3 seconds
  }

  hideToast(): void {
    this.isVisible = false;
  }
}
