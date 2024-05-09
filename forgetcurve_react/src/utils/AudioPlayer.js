export class AudioPlayer {
    constructor(src) {
        this.audio = new Audio(src);
        this.isPlaying = false;

        // When the audio starts playing, this event is triggered, setting this.isPlaying to true.
        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
        });
        // When the audio is paused, this event is triggered, setting this.isPlaying to false.
        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
        });

      
    }

    play() {
        this.audio.play();
    }

    pause() {
        // HTML5 Audio object, stopping the audio if it is playing.
        this.audio.pause();
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    isCurrentlyPlaying() {
        return this.isPlaying;
    }
}