import { webm, mp4 } from './media';

// Detect iOS browsers < version 10
const oldIOS =
  typeof navigator !== 'undefined' &&
  parseFloat(
    ('' + (/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1])
      .replace('undefined', '3_2')
      .replace('_', '.')
      .replace('_', '')
  ) < 10 &&
  !window.MSStream;

export default class NoSleep {
  constructor(title = 'No Sleep') {
    this.enabled = false;
    this.listeners = {};
    this.noSleepTimer = undefined;
    this.noSleepVideo = undefined;

    if (oldIOS) {
      this.noSleepTimer = undefined;
    } else {
      this.noSleepVideo = createNoSleepVideo(title);
    }
  }

  get isEnabled() {
    return this.enabled;
  }

  enable() {
    if (oldIOS) {
      this.disable();
      this.noSleepTimer = window.setInterval(() => {
        if (!document.hidden) {
          window.location.href = window.location.href.split('#')[0];
          window.setTimeout(window.stop, 0);
        }
      }, 15000);
      this.enabled = true;
      this.emit('enabled');
    } else if (this.noSleepVideo) {
      this.noSleepVideo
        .play()
        .then(() => {
          this.enabled = true;
          this.emit('enabled');
        })
        .catch((error) => {
          this.enabled = false;
          this.emit('error', error);
        });
    }
  }

  disable() {
    this.enabled = false;
    if (oldIOS) {
      if (this.noSleepTimer) {
        window.clearInterval(this.noSleepTimer);
        this.noSleepTimer = undefined;
      }
    } else if (this.noSleepVideo) {
      this.noSleepVideo.pause();
    }
    this.emit('disabled');
  }

  on(type, listener) {
    (this.listeners[type] = this.listeners[type] || []).push(listener);
    return this;
  }

  emit(type, ...data) {
    (this.listeners[type] || []).forEach((listener) => listener(...data));
  }
}

function createNoSleepVideo(title) {
  const video = document.createElement('video');
  video.setAttribute('title', title);
  video.setAttribute('playsinline', '');
  addSourceToVideo(video, 'webm', webm);
  addSourceToVideo(video, 'mp4', mp4);

  video.addEventListener('loadedmetadata', () => {
    if (video.duration <= 1) {
      video.setAttribute('loop', '');
    } else {
      video.addEventListener('timeupdate', () => {
        if (video.currentTime > 0.5) {
          video.currentTime = Math.random();
        }
      });
    }
  });

  return video;
}

function addSourceToVideo(element, type, dataURI) {
  var source = document.createElement('source');
  source.src = dataURI;
  source.type = `video/${type}`;
  element.appendChild(source);
}
