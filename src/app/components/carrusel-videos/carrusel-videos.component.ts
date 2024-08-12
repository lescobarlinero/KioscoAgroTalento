import { Component } from '@angular/core';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { CommonModule } from '@angular/common'; 
import { VideoService } from '../../services/video.service';
import { map, Observable } from 'rxjs';
import { Video } from '../../types/video';

@Component({
  selector: 'app-carrusel-videos',
  standalone: true,
  imports: [VideoPlayerComponent, CommonModule],
  templateUrl: './carrusel-videos.component.html',
  styleUrl: './carrusel-videos.component.css'
})
export class CarruselVideosComponent {
  videos: Observable<Video[]> = this.videoService.getVideos();
  videoPlayingIndex = 0;
  amountVideos: number = 0;
  currentVideo: Observable<Video | undefined> = this.videos.pipe(
    map(videos => videos[this.videoPlayingIndex])
  );

  currentVideoId = '';

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.updateCurrentVideo();
    this.videos.subscribe(videos => {
      this.amountVideos = videos.length;
    });

  }

  private updateCurrentVideo() {
    this.currentVideo = this.videos.pipe(
      map(videos => videos[this.videoPlayingIndex])
    );

    this.currentVideo.subscribe(video => {
      if (video) {
        this.currentVideoId = this.getVideoId(video.url);
      }
    });
  }

  nextVideo() {
    if (this.videoPlayingIndex < this.amountVideos - 1) {
      this.videoPlayingIndex++;
      this.updateCurrentVideo();
    } else {
      this.videoPlayingIndex = 0;
      this.updateCurrentVideo();
    }
  }

  prevVideo() {
    if (this.videoPlayingIndex > 0) {
      this.videoPlayingIndex--;
      this.updateCurrentVideo();
    } else {
      this.videoPlayingIndex = this.amountVideos - 1;
      this.updateCurrentVideo();
    }
  }

  getVideoId(url: string): string {
    return url.split('v=')[1];
  }

  changeVideoTo(index: number) {
    this.videoPlayingIndex = index;
    this.updateCurrentVideo();
  }
}
