import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Video } from '../../types/video';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { MultimediaService } from '../../services/multimedia/multimedia.service';
import { EventService } from '../../services/event/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Multimedia } from '../../types/multimedia';

@Component({
  selector: 'app-sort-videos',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './sort-videos.component.html',
  styleUrl: './sort-videos.component.css'
})
export class SortVideosComponent {

  // videos: Observable<Video[]> = this.videoService.getVideos();
  eventId: number = 1;
  allMedia: Multimedia[] = [];
  carrouselMedia: Multimedia[] = [];
  extraMedia: Multimedia[] = [];
  videosAmount: number = 0;
  highlightedList: string | null = null;

  constructor(private eventService: EventService, private multimediaService: MultimediaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id || isNaN(+id)) {
      this.router.navigate(['/404-not-found']);
      return;
    }
    this.eventId = +id;

    this.multimediaService.getMultimedias(true).subscribe(medias => {
      this.allMedia = medias;
    });

    this.eventService.getMultimediaForEvent(+id).subscribe(event => {
      this.carrouselMedia = event.multimedias.filter((media: any) => media.isCarrousel).map((media: any) => media.multimedia);
      this.extraMedia = event.multimedias.filter((media: any) => !media.isCarrousel).map((media: any) => media.multimedia);
      this.videosAmount = this.carrouselMedia.length + this.extraMedia.length;
      // remove multimedia from allMedia
      this.carrouselMedia.forEach((media: any) => {
        this.allMedia = this.allMedia.filter((m: any) => m.id !== media.id);
      });
      this.extraMedia.forEach((media: any) => {
        this.allMedia = this.allMedia.filter((m: any) => m.id !== media.id);
      });
      console.log('Carrousel media:', this.carrouselMedia);
      console.log('extra media', this.extraMedia)
      console.log('all media', this.allMedia)
    });


  }

  goToEventos() {
    this.router.navigate(['gestionar/eventos']);
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

  // deleteVideo(index: number) {
  //   this.videoService.deleteVideo(index).subscribe(
  //     () => {
  //       console.log('Video eliminado:', index);
  //     },
  //     (error) => {
  //       console.error('Error al eliminar video:', error);
  //     }
  //   );
  // }

  // getVideoThumbnail(url: string): string {
  //   const id = url.split('v=')[1];
  //   return `https://img.youtube.com/vi/${id}/0.jpg`;
  // }

  // goUp(index: number) {
  //   this.videoService.moveVideo(index, -1).subscribe(
  //     () => {
  //       console.log('Video movido hacia arriba:', index);
  //     },
  //     (error) => {
  //       console.error('Error al mover video hacia arriba:', error);
  //     }
  //   );
  // }

  // goDown(index: number) {
  //   this.videoService.moveVideo(index, 1).subscribe(
  //     () => {
  //       console.log('Video movido hacia abajo:', index);
  //     },
  //     (error) => {
  //       console.error('Error al mover video hacia abajo:', error);
  //     }
  //   );
  // }

  drop(event: CdkDragDrop<any[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const isCarrousel = event.container.id === 'carrouselList'
      if (event.container.id === 'allMediaList') {
        this.eventService.removeMultimediaFromEvent(this.eventId, event.container.data[event.currentIndex].id).subscribe(response => {
          console.log('Multimedia eliminado:', response);
        });
      } else {
        if (event.previousContainer.id !== 'allMediaList') {
          this.eventService.removeMultimediaFromEvent(this.eventId, event.container.data[event.currentIndex].id).subscribe(response => {
            console.log('Multimedia eliminado:', response);
          });
        }

        this.eventService.addMultimediaToEvent(
          this.eventId,
          event.container.data[event.currentIndex].id,
          undefined,
          event.container.id === 'carrouselList',
          event.currentIndex).subscribe(response => {
            console.log('Multimedia añadido:', response);
          });
      }
    }

    this.highlightedList = null;
  }



  onEnter(event: CdkDragEnter, listId: string) {
    this.highlightedList = listId;
  }

  onExit(event: CdkDragExit, listId: string) {
    if (this.highlightedList === listId) {
      this.highlightedList = null;
    }
  }

}
