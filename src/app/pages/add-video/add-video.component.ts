import { Component } from '@angular/core';
import { icons } from '../../../../public/icons';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VideoService } from '../../services/video.service';
import { Video } from '../../types/video';

@Component({
  selector: 'app-add-video',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-video.component.html',
  styleUrl: './add-video.component.css',
})
export class AddVideoComponent {
  icons = icons;
  videoInfo = new FormGroup({
    videoName: new FormControl('', Validators.required),
    videoIcon: new FormControl('', Validators.required),
    videoUrl: new FormControl('', Validators.required),
  });
  ready: boolean = true;

  constructor(private videoService: VideoService) {}

  async ngOnInit() {
  }

  goToGestion() {
    window.location.href = 'gestionar/videos';
  }

  agregarVideo() {
    this.ready = false;
    // si la info del video no está vacía agregar video a lista de videos
    // si no mostrar mensaje de error
    console.log('Video info:', this.videoInfo.value);

    if (this.videoInfo.valid) {
      const video: Video = {
        icon: this.videoInfo.value.videoIcon ?? '',
        title: this.videoInfo.value.videoName ?? '',
        url: this.videoInfo.value.videoUrl ?? '',
      };

      this.videoService.addVideo(video).subscribe(
        () => {
          console.log('Video agregado:', video);
          this.ready = true;
          this.goToGestion();
        },
        (error) => {
          console.error('Error al agregar video:', error);
        }
      );
      
    } else {
      alert('Por favor llena todos los campos');
    }
  }

  listenToChanges() {
    // si la url cambia, checar si es una url de youtube con formato correcto usando regex, ej: https://www.youtube.com/watch?v=videoId

    this.videoInfo.controls.videoUrl.valueChanges.subscribe((value) => {
      if (value) {
        const youtubeUrlRegex =
          /^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}$/;
        if (!youtubeUrlRegex.test(value)) {
          this.videoInfo.controls.videoUrl.setErrors({ invalidUrl: true });
        } else {
          this.videoInfo.controls.videoUrl.setErrors(null);
        }
      }
    });
  }
}
