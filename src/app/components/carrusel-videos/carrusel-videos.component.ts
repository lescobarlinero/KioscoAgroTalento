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
  currentPage = 0;
  pageSize = 3;

  currentVideoId = '';

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.videos.subscribe(videos => {
      this.amountVideos = videos.length;

      this.updateShownVideos(); //
    });

    this.updateCurrentVideo();
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

      // Check if the next video is on a new page, update shownVideos if necessary
      const pageIndex = Math.floor(this.videoPlayingIndex / this.pageSize);
      if (pageIndex !== this.currentPage) {
        this.currentPage = pageIndex;
        this.updateShownVideos();
      }

      this.updateCurrentVideo();
      console.log('shownVideos', this.shownVideos);

    } else {
      // Wrap-around to the first page
      this.currentPage = 0;
      this.videoPlayingIndex = 0;
      this.updateShownVideos();
      this.updateCurrentVideo();
      console.log('shownVideos', this.shownVideos);
    }
  }

  prevVideo() {
    if (this.videoPlayingIndex > 0) {
      this.videoPlayingIndex--;

      // Check if the previous video is on a different page, update shownVideos if necessary
      const pageIndex = Math.floor(this.videoPlayingIndex / this.pageSize);
      if (pageIndex !== this.currentPage) {
        this.currentPage = pageIndex;
        this.updateShownVideos();
      }

      this.updateCurrentVideo();
      console.log('shownVideos', this.shownVideos);

    } else {
      // Handle wrap-around to the last page
      const lastPage = Math.floor((this.amountVideos - 1) / this.pageSize);
      this.currentPage = lastPage;
      this.videoPlayingIndex = this.amountVideos - 1;
      this.updateShownVideos();
      this.updateCurrentVideo();
      console.log('shownVideos', this.shownVideos);
    }
  }


  getVideoId(url: string): string {
    return url.split('v=')[1];
  }

  changeVideoTo(index: number) {
    this.videoPlayingIndex = index;
    const pageIndex = Math.floor(index / this.pageSize);

    if (pageIndex !== this.currentPage) {
      this.currentPage = pageIndex;
      this.updateShownVideos();
    }

    this.updateCurrentVideo();
  }

  updateShownVideos() {
    const start = this.currentPage * this.pageSize;
    const end = Math.min(start + this.pageSize, this.amountVideos);
    this.shownVideos = Array.from({ length: end - start }, (_, i) => start + i);
  }

  nextPage() {
    const totalPages = Math.ceil(this.amountVideos / this.pageSize);
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
    } else {
      this.currentPage = 0; // Regresa a la primera página
    }
    this.updateShownVideos();
  }

  prevPage() {
    const totalPages = Math.ceil(this.amountVideos / this.pageSize);
    if (this.currentPage > 0) {
      this.currentPage--;
    } else {
      this.currentPage = totalPages - 1; // Va a la última página
    }
    this.updateShownVideos();
  }


}
