import { Component } from '@angular/core';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-carrusel-videos',
  standalone: true,
  imports: [VideoPlayerComponent, CommonModule],
  templateUrl: './carrusel-videos.component.html',
  styleUrl: './carrusel-videos.component.css'
})
export class CarruselVideosComponent {
  urlsVideos = ['https://www.youtube.com/watch?v=dbn-QDttWqU', 'https://www.youtube.com/watch?v=eYDI8b5Nn5s', 'https://www.youtube.com/watch?v=tEA7buzhE0s', 'https://www.youtube.com/watch?v=WFtQadz_bgM'];
  videoPlayingIndex = 0;
  currentVideoId = this.getVideoId(this.urlsVideos[this.videoPlayingIndex]);
  amountVideos = this.urlsVideos.length;

  getVideoId(url: string) {
    
    return url.split('v=')[1];
  }

  nextVideo() {
    // check that next video is not out of bounds
    if (this.videoPlayingIndex + 1 >= this.urlsVideos.length) {
      return;
    }
    this.videoPlayingIndex = (this.videoPlayingIndex + 1) % this.urlsVideos.length;
    this.currentVideoId = this.getVideoId(this.urlsVideos[this.videoPlayingIndex]);
  }

  previousVideo() {
    // check that previous video is not out of bounds
    if (this.videoPlayingIndex - 1 < 0) {
      return;
    }
    this.videoPlayingIndex = (this.videoPlayingIndex - 1 + this.urlsVideos.length) % this.urlsVideos.length;
    this.currentVideoId = this.getVideoId(this.urlsVideos[this.videoPlayingIndex]);
  }



}
