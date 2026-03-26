/**
 * VoiceManager — Plays pre-recorded MP3 voice clips.
 * Falls back to Web Speech API if a clip isn't loaded yet.
 */

import { audioManager } from "./AudioManager";

type VoiceCallback = (speaking: boolean) => void;

class VoiceManager {
  private onSpeakingChange: VoiceCallback | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private speechReady = false;

  constructor() {
    this.loadVoices();
    try {
      speechSynthesis.onvoiceschanged = () => this.loadVoices();
    } catch {
      // Web Speech API not available
    }
  }

  private loadVoices(): void {
    try {
      const voices = speechSynthesis.getVoices();
      if (!voices.length) return;
      this.selectedVoice =
        voices.find((v) => v.name === "Samantha") ||
        voices.find((v) => v.name === "Karen") ||
        voices.find((v) => v.name.includes("Google US English")) ||
        voices.find((v) => v.lang === "en-US" && v.localService) ||
        voices.find((v) => v.lang.startsWith("en")) ||
        voices[0];
      this.speechReady = true;
    } catch {
      // Web Speech API not available
    }
  }

  /**
   * Register a callback for speaking state changes (for speech bubble).
   */
  setSpeakingCallback(cb: VoiceCallback): void {
    this.onSpeakingChange = cb;
  }

  /**
   * Speak a phrase. Tries MP3 clip first, falls back to Web Speech API.
   * @param key - Voice clip key from voiceManifest
   * @param text - Fallback text for Web Speech API
   * @param pitch - Web Speech pitch (default 1.7 for peppy voice)
   * @param rate - Web Speech rate (default 1.05)
   */
  speak(key: string, text?: string, pitch = 1.7, rate = 1.05): void {
    // Try pre-recorded MP3 first
    if (audioManager.hasClip(key)) {
      const played = audioManager.playClip(
        key,
        () => this.onSpeakingChange?.(true),
        () => this.onSpeakingChange?.(false),
      );
      if (played) return;
    }

    // Fallback to Web Speech API
    this.speakWithSpeechAPI(text || key, pitch, rate);
  }

  /**
   * Web Speech API fallback.
   */
  private speakWithSpeechAPI(text: string, pitch: number, rate: number): void {
    if (!this.speechReady || !window.speechSynthesis) return;

    try {
      this.loadVoices();
      speechSynthesis.cancel();

      setTimeout(() => {
        try {
          const u = new SpeechSynthesisUtterance(text);
          u.pitch = Math.min(Math.max(pitch, 0.1), 2);
          u.rate = Math.min(Math.max(rate, 0.1), 2);
          u.volume = 1;
          if (this.selectedVoice) u.voice = this.selectedVoice;

          u.onstart = () => this.onSpeakingChange?.(true);
          u.onend = () => this.onSpeakingChange?.(false);
          u.onerror = () => {
            this.onSpeakingChange?.(false);
            // Retry once on error (iOS workaround)
            setTimeout(() => {
              try {
                speechSynthesis.cancel();
                const u2 = new SpeechSynthesisUtterance(text);
                u2.pitch = Math.min(Math.max(pitch, 0.1), 2);
                u2.rate = Math.min(Math.max(rate, 0.1), 2);
                u2.volume = 1;
                if (this.selectedVoice) u2.voice = this.selectedVoice;
                u2.onstart = () => this.onSpeakingChange?.(true);
                u2.onend = () => this.onSpeakingChange?.(false);
                u2.onerror = () => this.onSpeakingChange?.(false);
                speechSynthesis.speak(u2);
              } catch {
                this.onSpeakingChange?.(false);
              }
            }, 250);
          };

          speechSynthesis.speak(u);
        } catch {
          this.onSpeakingChange?.(false);
        }
      }, 120);
    } catch {
      this.onSpeakingChange?.(false);
    }
  }

  /**
   * Unlock speech synthesis (must be called from user gesture on iOS).
   */
  unlockSpeech(): void {
    try {
      this.loadVoices();
      if (window.speechSynthesis) {
        this.speechReady = true;
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance("");
        u.volume = 0;
        speechSynthesis.speak(u);
      }
    } catch {
      // Not available
    }
  }
}

export const voiceManager = new VoiceManager();
