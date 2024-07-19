import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { ObservableInput } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  @Input() videoId!: string;

  ngOnChanges(changes: any) {
    if (changes.videoId && this.player) {
      this.player.destroy();
      console.log('videoId changed: ', changes.videoId.currentValue);
      this.video = changes.videoId.currentValue;
      this.startVideo();
    }
  }

  /* 1. Some required variables which will be used by YT API*/
  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;
  public videoPlaying: Boolean = false;
  public videoTitle: string = '';

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  ngOnInit() {
    this.video = this.videoId;
    setInterval(() => {
      this.updateProgressBar();
    }, 1000);
    this.init();
  }


  /* 2. Initialize method for YT IFrame API */
  init() {
    var tag = document.createElement('script');
    tag.src = 'http://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    (window as any)['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }
  startVideo() {
    this.reframed = false;
    this.player = new (window as any)['YT'].Player('player', {
      videoId: this.video,
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        controls: 0,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1
      },
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onError': this.onPlayerError.bind(this),
        'onReady': this.onPlayerReady.bind(this),
      }
    });
  }

  /* 4. It will be called when the Video Player is ready */
  onPlayerReady(event: any) {
    console.log('player ready');
    this.videoTitle = event.target.getVideoData().title;
  }

  /* 5. API will call this function when Player State changes like PLAYING, PAUSED, ENDED */
  onPlayerStateChange(event: any) {
    console.log(event)
    switch (event.data) {
      case (window as any)['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        break;
      case (window as any)['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        };
        break;
      case (window as any)['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    }
  }

  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  }

  onPlayerError(event: any) {
    switch (event.data) {
      case 2:
        console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }

  updateProgressBar() {
    // Update the value of our progress bar
    var progressBar = document.getElementById('progress-bar-fg');
    try {
      if (progressBar) {
        progressBar.style.width = (this.player.getCurrentTime() / this.player.getDuration() * 100) + '%';
      }
    } catch (error) {
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
}
