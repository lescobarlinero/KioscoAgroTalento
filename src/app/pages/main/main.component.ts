import { Component } from '@angular/core';
import { CarruselVideosComponent } from '../../components/carrusel-videos/carrusel-videos.component';
import { VideoService } from '../../services/video.service';
import { Video } from '../../types/video';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { EventService } from '../../services/event/event.service';
import { ThemeService } from '../../services/theme/theme.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CarruselVideosComponent, CommonModule, NavbarComponent, ModalComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  event: any
  theme: any

  videos: Observable<Video[]> = this.videoService.getVideos();

  constructor(private videoService: VideoService, private eventService: EventService, private themeService: ThemeService, private router: Router) {}

  ngOnInit() {
    const id = window.location.pathname.split('/').pop();
    if (id && !isNaN(parseInt(id))) {
      this.eventService.getEventById(parseInt(id)).subscribe(event => {
        this.event = event;
        this.themeService.getThemeById(this.event.themeId).subscribe(theme => {
          this.theme = theme;
        });
      });
    }
  }

}
