import { Component, EventEmitter, Output, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Multimedia } from '../../types/multimedia';
import { ModalService } from '../../services/modal.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent, PdfViewerModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  isVisible: boolean = false;
  content: any;
  sanitizedUrl: SafeResourceUrl | null = null;

  @Output() modalClosed = new EventEmitter();

  constructor(private modalService: ModalService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.modalService.modalContent$.subscribe((content: any) => {
      this.content = content;
      this.sanitizedUrl = this.sanitize(this.getMediaUrl()); // Cache the sanitized URL
      this.showModal();
    });
  }

  showModal() {
    this.isVisible = true;
  }

  hideModal() {
    this.isVisible = false;
    this.modalService.closeModal();
    this.modalClosed.emit();
  }

  modalIsVisible(): boolean {
    return this.isVisible;
  }

  getMediaUrl() {
    switch (this.content.multimediaTypeId) {
      case 1:
        return `https://www.youtube.com/embed/${this.content.url.split('v=')[1]}?controls=0&modestbranding=1&rel=0&showinfo=0`;
      default:
        return this.content.url;
    }
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
