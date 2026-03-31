class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = true; // Default muted so it doesn't autoplay without user intent, or we can default false if preferred. We'll default to false, but require a user interaction to start context.
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playTone(freq, type, duration, vol = 0.05) {
    if (this.muted) return;
    try {
      this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      // Envelope
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch(e) { /* ignore audio errors */ }
  }

  playClick() {
    this.playTone(400, "square", 0.05, 0.03);
  }

  playHover() {
    this.playTone(800, "sine", 0.02, 0.015);
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }
}

export const soundManager = new SoundManager();
