/**
 * AudioManager — Single AudioContext for the entire app.
 * iOS Safari allows max 4 AudioContexts; we use ONE shared everywhere.
 * Must be created/resumed inside a user gesture handler (tap/click).
 */

import { voiceManifest, priorityKeys, getVoicePath } from "./voiceManifest";

class AudioManager {
  private ctx: AudioContext | null = null;
  private clips: Map<string, AudioBuffer> = new Map();
  private _ready = false;
  private _voicesLoaded = false;
  private loadingPromise: Promise<void> | null = null;

  get ready(): boolean {
    return this._ready;
  }

  get voicesLoaded(): boolean {
    return this._voicesLoaded;
  }

  get context(): AudioContext | null {
    return this.ctx;
  }

  /**
   * Must be called from a user gesture handler (touchstart/click).
   * Creates or resumes the AudioContext.
   */
  unlock(): AudioContext {
    if (!this.ctx) {
      this.ctx = new (
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      )();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    this._ready = true;

    // Start loading voice clips in background
    if (!this.loadingPromise) {
      this.loadingPromise = this.loadVoices();
    }

    // iOS keepalive — prevent AudioContext suspension after ~15s idle
    this.startKeepalive();

    return this.ctx;
  }

  private keepaliveId: number | null = null;

  private startKeepalive(): void {
    if (this.keepaliveId) return;
    this.keepaliveId = window.setInterval(() => {
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      // Play a silent buffer to keep iOS audio alive
      if (this.ctx && this.ctx.state === "running") {
        const buf = this.ctx.createBuffer(1, 1, this.ctx.sampleRate);
        const src = this.ctx.createBufferSource();
        src.buffer = buf;
        src.connect(this.ctx.destination);
        src.start();
      }
    }, 10000);
  }

  /**
   * Load all voice clips. Loads priority clips first, then the rest.
   */
  private async loadVoices(): Promise<void> {
    if (!this.ctx) return;

    // Load priority clips first
    await Promise.allSettled(
      priorityKeys.map((key) => {
        const path = getVoicePath(key);
        return path ? this.loadClip(key, path) : Promise.resolve();
      }),
    );

    // Load remaining clips
    const remaining = Object.entries(voiceManifest).filter(
      ([key]) => !priorityKeys.includes(key),
    );
    await Promise.allSettled(
      remaining.map(([key, entry]) => this.loadClip(key, entry.file)),
    );

    this._voicesLoaded = true;
  }

  /**
   * Load a single MP3 clip into an AudioBuffer.
   */
  private async loadClip(key: string, url: string): Promise<void> {
    if (this.clips.has(key) || !this.ctx) return;
    try {
      const response = await fetch(url);
      if (!response.ok) return;
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
      this.clips.set(key, audioBuffer);
    } catch {
      // Clip not available — VoiceManager will fall back to Web Speech API
    }
  }

  /**
   * Currently playing voice source — only ONE voice at a time.
   */
  private currentSource: AudioBufferSourceNode | null = null;

  /**
   * Stop any currently playing voice clip.
   */
  stopCurrentClip(): void {
    if (this.currentSource) {
      try {
        this.currentSource.onended = null;
        this.currentSource.stop();
      } catch {
        // Already stopped
      }
      this.currentSource = null;
    }
  }

  /**
   * Play a pre-loaded voice clip. Stops any currently playing clip first.
   * Returns true if played, false if not available.
   */
  playClip(key: string, onStart?: () => void, onEnd?: () => void): boolean {
    const buffer = this.clips.get(key);
    if (!buffer || !this.ctx || this.ctx.state !== "running") return false;

    // Stop any currently playing voice — one voice at a time
    this.stopCurrentClip();

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.ctx.destination);

    this.currentSource = source;

    if (onStart) onStart();
    source.onended = () => {
      if (this.currentSource === source) {
        this.currentSource = null;
      }
      if (onEnd) onEnd();
    };

    source.start();
    return true;
  }

  /**
   * Check if a specific clip is loaded.
   */
  hasClip(key: string): boolean {
    return this.clips.has(key);
  }
}

// Singleton
export const audioManager = new AudioManager();
