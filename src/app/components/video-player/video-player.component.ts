import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Multimedia } from '../../types/multimedia';
import { CommonModule } from '@angular/common';
import { max, Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
  imports: [CommonModule]
})
export class VideoPlayerComponent implements OnInit {

  @Input() multimedia!: Multimedia;

  @Output() mediaEnded = new EventEmitter();
  @Input() showTitle: boolean = true;
  @Input() progressBarId!: string;
  @Input() playerOverrideEvents!: Observable<string>;

  /* 1. Some required variables which will be used by YT API*/
  public YT: any;
  public player: any;
  public reframed: Boolean = false;
  public videoPlaying: Boolean = false;
  public videoTitle: string = '';
  private overrideSubscription: any;
  private progressBarInterval: any;

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  

  ngOnInit() {
    this.progressBarInterval = setInterval(() => {
      this.updateProgressBar();
    }, 500);
    this.init();
    this.overrideSubscription = this.playerOverrideEvents?.subscribe((event) => {
      switch (event) {
        case 'play':
          this.player.playVideo();
          break;
        case 'pause':
          this.player.pauseVideo();
          break;
        case 'togglePlay':
          this.togglePlay();
          break;
      }
    });
  }

  ngOnChanges(changes: any) {
    if (changes.multimedia) {
      if (this.player) this.player.destroy();
      this.startVideo();
    }
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.destroy();
    }
    this.overrideSubscription?.unsubscribe();
    clearInterval(this.progressBarInterval);
  }
  
  /* 2. Initialize method for YT IFrame API */
  init() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    (window as any)['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }
  startVideo() {
    if (this.isYoutubeVideo(this.multimedia)) {
      this.reframed = false;
      const playerDiv = document.getElementById(`player-${this.multimedia.id}`);
      // if player div is null, wait for it to be created
      if (!playerDiv) {
        setTimeout(() => {
          this.startVideo();
        }, 500);
        console.log('player div not found, waiting');
        return;
      }
      this.player = new (window as any)['YT'].Player(`player-${this.multimedia.id}`, {
        videoId: this.getVideoId(this.multimedia.url),
        playerVars: {
          autoplay: 1,
          modestbranding: 0,
          controls: 0,
          disablekb: 1,
          rel: 0,
          showinfo: 0,
          fs: 0,
          playsinline: 1,
        },
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this),
          'onError': this.onPlayerError.bind(this),
          'onReady': this.onPlayerReady.bind(this),
        }
      });
    } else {
      this.videoTitle = this.multimedia.name;
      this.player = {
        maxTime: 10, // seconds
        elapsedTime: 0,
        getDuration: () => this.player.maxTime,
        getCurrentTime: () => this.player.elapsedTime,
        destroy: () => {},
        playVideo: () => {
          const interval = setInterval(() => {
            
            if (this.player.elapsedTime >= this.player.maxTime) {
              clearInterval(interval);
              this.mediaEnded.emit();
            }
            this.player.elapsedTime++;
          }, 1000);
        },
      }
      this.player.playVideo();
    }
    
  }

  /* 4. It will be called when the Video Player is ready */
  onPlayerReady(event: any) {
    this.videoTitle = event.target.getVideoData().title;
    console.log('player ready', this.player);
    this.player.playVideo();
    this.videoPlaying = true;
  }

  /* 5. API will call this function when Player State changes like PLAYING, PAUSED, ENDED */
  onPlayerStateChange(event: any) {
    switch (event.data) {
      case (window as any)['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        this.videoPlaying = true;
        break;
      case (window as any)['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        };
        this.videoPlaying = false;
        break;
      case (window as any)['YT'].PlayerState.ENDED:
        console.log('ended ');
        this.mediaEnded.emit();
        break;
    }
  }

  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  }

  onPlayerError(event: any) {
    switch (event.data) {
      case 2:
        console.log('' + this.multimedia)
        break;
      default:
        console.log(event)
        break;
    }
  }

  updateProgressBar() {
    // Update the value of our progress bar
    var progressBar = document.getElementById(this.progressBarId);
    try {
      if (progressBar) {
        progressBar.style.width = (this.player.getCurrentTime() / this.player.getDuration() * 100) + '%';
      }
    } catch (error) {
      console.error('Error updating progress bar', error);
      return;
    }
  }

  togglePlay() {
    if (this.player.getPlayerState() == 1) {
      this.player.pauseVideo();
      this.videoPlaying = false;
    } else {
      this.player.playVideo();
      this.videoPlaying = true;
    }
  }

  isYoutubeVideo(multimedia: Multimedia): boolean {
    return multimedia.multimediaType?.name === 'YOUTUBE_VIDEO';
  }

  getVideoId(url: string): string {
    return url.split('v=')[1];
  }
}
