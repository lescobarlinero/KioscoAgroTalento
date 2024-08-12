import { Component } from '@angular/core';
import { CarruselVideosComponent } from '../../components/carrusel-videos/carrusel-videos.component';
import { VideoService } from '../../services/video.service';
import { Video } from '../../types/video';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CarruselVideosComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  videos: Observable<Video[]> = this.videoService.getVideos();

  constructor(private videoService: VideoService) {}

}
