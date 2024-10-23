import { Component } from '@angular/core';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { CommonModule } from '@angular/common';
import { VideoService } from '../../services/video.service';
import { EventService } from '../../services/event/event.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-carrusel-videos',
  standalone: true,
  imports: [VideoPlayerComponent, CommonModule],
  templateUrl: './carrusel-videos.component.html',
  styleUrls: ['./carrusel-videos.component.css']
})
export class CarruselVideosComponent {

  media: any[] = [];
  carruselMedia: any[] = [];
  buttonMedia: any[] = [];

  mediaPlayingIndex = 0;
  amountMedia: number = 0;
  shownVideos: number[] = [];
  currentPage = 0;
  pageSize = 3;
  playerEventOverrideSubject: Subject<string> = new Subject<string>();

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id && !isNaN(parseInt(id))) {
      this.eventService.getMultimediaForEvent(parseInt(id)).subscribe((data: any) => {
        this.media = data.multimedias;
        this.amountMedia = this.media.length;
        this.carruselMedia = this.media.filter((media) => media.isCarrousel && (media.multimedia.multimediaTypeId == 1 || media.multimedia.multimediaTypeId == 2));
        this.buttonMedia = this.media.filter((media) => !media.isCarrousel);
      });
    }

    // Listen to modal close event to reset flag
    this.modalService.modalClosed$.subscribe(() => {
      this.resumeActivity();  // Resume activity when modal is closed
    });
  }

  nextMedia() {
    if (this.modalService.modalIsVisible()) {
      console.log('Modal is open');
      return
    };  // Prevent interaction when modal is open

    if (this.mediaPlayingIndex < this.carruselMedia.length - 1) {
      this.mediaPlayingIndex++;
    } else {
      this.mediaPlayingIndex = 0;
    }
  }

  prevMedia() {
    if (this.modalService.modalIsVisible()) return;  // Prevent interaction when modal is open

    if (this.mediaPlayingIndex > 0) {
      this.mediaPlayingIndex--;
    } else {
      this.mediaPlayingIndex = this.carruselMedia.length - 1;
    }
  }

  showMedia(multimedia: any) {
    this.playerEventOverrideSubject.next('pause');
    this.modalService.showModal(multimedia);
  }

  goToMedia(media: any) {
    // Navigate to the specific media (optional logic)
    // this.router.navigate([`/multimedia/${media.id}`]);
  }

  // Resume activity logic
  resumeActivity() {
    console.log('Activity resumed after modal closes');
    // Automatically continue playing the carousel from where it was paused

    // Optional: Implement autoplay feature
    if (this.carruselMedia.length > 0 && !this.modalService.modalIsVisible()) {
      // For example, automatically move to the next media after modal closes
      this.nextMedia();
    }
  }

  sendPlayerEventOverride(event: string) {
    this.playerEventOverrideSubject.next(event);
  }
}
