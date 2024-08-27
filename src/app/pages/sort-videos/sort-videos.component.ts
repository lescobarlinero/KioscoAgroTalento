import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Video } from '../../types/video';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sort-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sort-videos.component.html',
  styleUrl: './sort-videos.component.css'
})
export class SortVideosComponent {

  videos: Observable<Video[]> = this.videoService.getVideos();
  videosAmount: number = 0;

  constructor(private videoService: VideoService) {
    this.videos.subscribe(videos => {
      this.videosAmount = videos.length;
    });
  }

  goToVideos() {
    window.location.href = 'gestionar/videos';
  }

  deleteVideo(index: number) {
    this.videoService.deleteVideo(index).subscribe(
      () => {
        console.log('Video eliminado:', index);
      },
      (error) => {
        console.error('Error al eliminar video:', error);
      }
    );
  }

  getVideoThumbnail(url: string): string {
    const id = url.split('v=')[1];
    return `https://img.youtube.com/vi/${id}/0.jpg`;
  }

  goUp(index: number) {
    this.videoService.moveVideo(index, -1).subscribe(
      () => {
        console.log('Video movido hacia arriba:', index);
      },
      (error) => {
        console.error('Error al mover video hacia arriba:', error);
      }
    );
  }

  goDown(index: number) {
    this.videoService.moveVideo(index, 1).subscribe(
      () => {
        console.log('Video movido hacia abajo:', index);
      },
      (error) => {
        console.error('Error al mover video hacia abajo:', error);
      }
    );
  }
}
