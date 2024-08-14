import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { Video } from '../types/video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'https://api.npoint.io/879f9fea851b2a67d803'; // Replace with your API endpoint
  private videosSubject: BehaviorSubject<Video[]> = new BehaviorSubject<Video[]>([]);
  public videos: Observable<Video[]> = this.videosSubject.asObservable();
  
  constructor(private http: HttpClient) {
    this.loadVideos();
  }

  private loadVideos() {
    this.http.get<Video[]>(this.apiUrl)
      .pipe(tap(v => this.videosSubject.next(v)))
      .subscribe();
  }

  getVideos(): Observable<Video[]> {
    return this.videos;
  }

  addVideo(newVideo: Video) {
    return this.videos.pipe(
      take(1),
      switchMap(currentVideos => {
        const updatedVideos = [...currentVideos, newVideo];
        return this.http.post(this.apiUrl, updatedVideos).pipe(
          tap(() => this.videosSubject.next(updatedVideos))
        );
      })
    );
  }

  deleteVideo(index: number) {
    return this.videos.pipe(
      take(1),
      switchMap(currentVideos => {
        // Create a new array without the video at the specified index
        const updatedVideos = currentVideos.filter((_, i) => i !== index);
        return this.http.post<Video[]>(this.apiUrl, updatedVideos).pipe(
          tap(() => this.videosSubject.next(updatedVideos))
        );
      })
    )
  }

  changeVideoTo(index: number) {
    this.videos.pipe(take(1)).subscribe(videos => {
      const video = videos[index];
      if (video) {
        this.videosSubject.next(videos);
      }
    });
  }

  moveVideo(index: number, direction: number) {
    return this.videos.pipe(
      take(1),
      switchMap(currentVideos => {
        const updatedVideos = [...currentVideos];
        const movingVideo = updatedVideos[index];
        const targetIndex = index + direction;
        if (targetIndex >= 0 && targetIndex < updatedVideos.length) {
          updatedVideos[index] = updatedVideos[targetIndex];
          updatedVideos[targetIndex] = movingVideo;
        }
        return this.http.post<Video[]>(this.apiUrl, updatedVideos).pipe(
          tap(() => this.videosSubject.next(updatedVideos))
        );
      })
    );
  }


}
