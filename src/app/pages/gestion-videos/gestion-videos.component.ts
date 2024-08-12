import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Video } from '../../types/video';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-videos.component.html',
  styleUrl: './gestion-videos.component.css'
})
export class GestionVideosComponent {

  videos: Observable<Video[]> = this.videoService.getVideos();

  constructor(private videoService: VideoService) {}

  goToAddVideo() {
    window.location.href = '/agregar-video';
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
}
