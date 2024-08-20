import { Component } from '@angular/core';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { CommonModule } from '@angular/common'; 
import { VideoService } from '../../services/video.service';
import { map, Observable, range } from 'rxjs';
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
  shownVideos: number[] = [];

  currentVideoId = '';

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.updateCurrentVideo();

    // los primeros 3 videos se muestran en los botones de abajo
    this.videos.subscribe(videos => {
      this.amountVideos = videos.length;   
      
      this.shownVideos = Array.from({ length: Math.min(3, this.amountVideos) }, (_, i) => i); 
      
      console.log('shownVideos', this.shownVideos);  
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
      // if next video's index is not inside the shownVideos array, we need to update it to the next 3 indexes
      if (!this.shownVideos.includes(this.videoPlayingIndex + 1)) {
        this.shownVideos = Array.from(
          { length: Math.min(3, this.amountVideos - this.videoPlayingIndex - 1) },
          (_, i) => this.videoPlayingIndex + i + 1
        );
      }
      this.videoPlayingIndex++;
      this.updateCurrentVideo();
      console.log('shownVideos', this.shownVideos);

    } else {
      // if current video is the last one, we need to go back to the first three videos
      this.shownVideos = Array.from({ length: Math.min(3, this.amountVideos) }, (_, i) => i);
      this.videoPlayingIndex = 0;
      this.updateCurrentVideo();
      console.log('shownVideos', this.shownVideos);

    }
  }

  prevVideo() {
    if (this.videoPlayingIndex > 0) {
      this.videoPlayingIndex--;
  
      // If the previous video's index is not inside the shownVideos array, update shownVideos
      if (!this.shownVideos.includes(this.videoPlayingIndex)) {
        const start = Math.max(this.videoPlayingIndex - 2, 0); // Ensure start index is not negative
        const end = this.videoPlayingIndex + 1; // End index for slice
        this.shownVideos = Array.from({ length: end - start }, (_, i) => start + i);
      }
  
      this.updateCurrentVideo();
      console.log('shownVideos', this.shownVideos);
      
    } else {
      // Handle wrap-around to the last page of videos
      const remainingVideos = this.amountVideos % 3 || 3; // Number of videos on the last page
      this.shownVideos = Array.from(
        { length: remainingVideos },
        (_, i) => this.amountVideos - remainingVideos + i
      );
  
      this.videoPlayingIndex = this.amountVideos - 1;
      this.updateCurrentVideo();
      console.log('shownVideos', this.shownVideos);
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
