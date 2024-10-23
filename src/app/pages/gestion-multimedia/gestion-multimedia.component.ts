import { Component } from '@angular/core';
import { MultimediaService } from '../../services/multimedia/multimedia.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Multimedia } from '../../types/multimedia';

@Component({
  selector: 'app-gestion-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-multimedia.component.html',
  styleUrl: './gestion-multimedia.component.css'
})
export class GestionMultimediaComponent {

  multimedias: any;

  constructor(
    private multimediaService: MultimediaService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.multimediaService.getMultimedias(true).subscribe((data) => {
      console.log(data);
      this.multimedias = data;
    });
  }

  goTo(location: string) {
    this.router.navigate([location]);
  }

  getVideoThumbnail(url: string): string {
    const id = url.split('v=')[1];
    return `https://img.youtube.com/vi/${id}/0.jpg`;
  }

  getImage(multimedia: Multimedia): string {
    if (multimedia.multimediaType?.name === 'YOUTUBE_VIDEO') {
      return this.getVideoThumbnail(multimedia.url);
    }
    return multimedia.url;
  }

  editMedia(multimedia: Multimedia) {
    this.router.navigate([`gestionar/multimedia/${multimedia.id}`]);
  }

}
