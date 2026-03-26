/**
 * SynthManager — Tone.js synths and all sound effect functions.
 * 10 synths, 12 sound effect methods.
 */

import * as Tone from "tone";
import { audioManager } from "./AudioManager";
import type { CharacterId } from "../types";

class SynthManager {
  private xylo: Tone.Synth | null = null;
  private bell: Tone.PolySynth | null = null;
  private bounce: Tone.MembraneSynth | null = null;
  private pluck: Tone.PluckSynth | null = null;
  private spk: Tone.Synth | null = null;
  private whoosh: Tone.NoiseSynth | null = null;
  private kick: Tone.MembraneSynth | null = null;
  private hat: Tone.NoiseSynth | null = null;
  private bass: Tone.Synth | null = null;
  private pad: Tone.PolySynth | null = null;
  private _ready = false;

  get ready(): boolean {
    return this._ready;
  }

  /**
   * Initialize all synths. Must be called after AudioManager.unlock().
   */
  async init(): Promise<void> {
    if (this._ready) return;

    try {
      // Share AudioContext with Tone.js
      const ctx = audioManager.context;
      if (ctx) {
        Tone.setContext(ctx as unknown as Tone.Context);
      }
      await Tone.start();
    } catch {
      // Tone.start may fail on iOS — try without setContext
      try {
        await Tone.start();
      } catch {
        // Continue without Tone — synths will fail gracefully
      }
    }

    try {
      this.xylo = new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: { attack: 0.001, decay: 0.35, sustain: 0, release: 0.25 },
        volume: -3,
      }).toDestination();

      this.bell = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "triangle" },
        envelope: { attack: 0.008, decay: 0.5, sustain: 0.08, release: 0.7 },
        volume: -5,
      }).toDestination();

      this.bounce = new Tone.MembraneSynth({
        pitchDecay: 0.06,
        octaves: 5,
        volume: -8,
      }).toDestination();

      this.pluck = new Tone.PluckSynth({ volume: -4 }).toDestination();

      this.spk = new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: { attack: 0.001, decay: 0.15, sustain: 0, release: 0.1 },
        volume: -6,
      }).toDestination();

      this.whoosh = new Tone.NoiseSynth({
        noise: { type: "pink" },
        envelope: { attack: 0.05, decay: 0.25, sustain: 0, release: 0.1 },
        volume: -14,
      }).toDestination();

      this.kick = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 6,
        volume: -10,
      }).toDestination();

      this.hat = new Tone.NoiseSynth({
        noise: { type: "white" },
        envelope: { attack: 0.001, decay: 0.04, sustain: 0, release: 0.02 },
        volume: -18,
      }).toDestination();

      this.bass = new Tone.Synth({
        oscillator: { type: "triangle" },
        envelope: { attack: 0.05, decay: 0.2, sustain: 0.3, release: 0.15 },
        volume: -12,
      }).toDestination();

      this.pad = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 0.3, decay: 0.8, sustain: 0.4, release: 1 },
        volume: -20,
      }).toDestination();

      this._ready = true;
    } catch {
      // Synth creation failed — retry after delay
      setTimeout(() => this.init(), 500);
    }
  }

  // ── Sound Effect Methods ──

  tap(normalizedX: number): void {
    if (!this._ready || !this.xylo) return;
    try {
      const notes = [
        "C4",
        "D4",
        "E4",
        "G4",
        "A4",
        "C5",
        "D5",
        "E5",
        "G5",
        "A5",
        "C6",
      ];
      const idx = Math.min(
        Math.floor(normalizedX * notes.length),
        notes.length - 1,
      );
      this.xylo.triggerAttackRelease(notes[idx], "8n");
    } catch {}
  }

  peekaboo(): void {
    if (!this._ready || !this.spk || !this.whoosh) return;
    try {
      const n = Tone.now();
      (["G5", "E5", "C5", "G4"] as const).forEach((note, i) => {
        this.spk!.triggerAttackRelease(note, 0.1, n + i * 0.08);
      });
      this.whoosh!.triggerAttackRelease("8n", n + 0.1);
    } catch {}
  }

  praise(): void {
    if (!this._ready || !this.bounce || !this.bell) return;
    try {
      const n = Tone.now();
      this.bounce!.triggerAttackRelease("C2", "4n", n);
      (["C4", "E4", "G4", "C5", "E5", "G5", "C6"] as const).forEach(
        (note, i) => {
          this.bell!.triggerAttackRelease([note], 0.1, n + i * 0.06);
        },
      );
    } catch {}
  }

  danceBeat(): void {
    if (!this._ready || !this.bounce || !this.xylo) return;
    try {
      this.bounce!.triggerAttackRelease("C2", "16n");
      const notes = ["C5", "D5", "E5", "G5", "A5"];
      this.xylo!.triggerAttackRelease(
        notes[Math.floor(Math.random() * notes.length)],
        "16n",
        Tone.now() + 0.05,
      );
    } catch {}
  }

  jump(): void {
    if (!this._ready || !this.spk || !this.whoosh) return;
    try {
      const n = Tone.now();
      (["C4", "E4", "G4", "C5", "E5"] as const).forEach((note, i) => {
        this.spk!.triggerAttackRelease(note, 0.08, n + i * 0.04);
      });
      this.whoosh!.triggerAttackRelease("16n", n);
    } catch {}
  }

  jumpLand(): void {
    if (!this._ready || !this.bounce || !this.bell) return;
    try {
      this.bounce!.triggerAttackRelease("C2", "8n");
      setTimeout(() => {
        this.bell?.triggerAttackRelease(["C4", "E4", "G4"], 0.15);
      }, 100);
    } catch {}
  }

  spin(): void {
    if (!this._ready || !this.whoosh || !this.spk) return;
    try {
      const n = Tone.now();
      this.whoosh!.triggerAttackRelease("4n", n);
      (["C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6"] as const).forEach(
        (note, i) => {
          this.spk!.triggerAttackRelease(note, 0.06, n + i * 0.08);
        },
      );
    } catch {}
  }

  wiggle(): void {
    if (!this._ready || !this.xylo) return;
    try {
      const n = Tone.now();
      (["E5", "G5", "E5", "G5", "E5", "G5", "C6"] as const).forEach(
        (note, i) => {
          this.xylo!.triggerAttackRelease(note, "32n", n + i * 0.07);
        },
      );
    } catch {}
  }

  celebrate(): void {
    if (!this._ready || !this.bounce || !this.bell || !this.spk) return;
    try {
      const n = Tone.now();
      this.bounce!.triggerAttackRelease("C2", "4n", n);
      (["C4", "E4", "G4", "C5"] as const).forEach((note, i) => {
        this.bell!.triggerAttackRelease([note], 0.15, n + i * 0.1);
      });
      setTimeout(() => {
        (["E5", "G5", "C6", "E6"] as const).forEach((note, i) => {
          this.spk?.triggerAttackRelease(note, 0.1, Tone.now() + i * 0.06);
        });
      }, 400);
    } catch {}
  }

  correct(): void {
    if (!this._ready || !this.bell) return;
    try {
      const n = Tone.now();
      (["C5", "E5", "G5", "C6"] as const).forEach((note, i) => {
        this.bell!.triggerAttackRelease([note], 0.12, n + i * 0.08);
      });
    } catch {}
  }

  incorrect(): void {
    if (!this._ready || !this.bounce) return;
    try {
      this.bounce!.triggerAttackRelease("E2", "8n");
    } catch {}
  }

  characterVoice(id: CharacterId): void {
    if (!this._ready) return;
    try {
      const n = Tone.now();
      const patterns: Record<CharacterId, () => void> = {
        luna: () => {
          (["E5", "G5", "B5", "E6"] as const).forEach((note, i) => {
            this.bell?.triggerAttackRelease([note], 0.15, n + i * 0.09);
          });
        },
        benny: () => {
          this.bounce?.triggerAttackRelease("C2", "8n", n);
          setTimeout(() => {
            this.bell?.triggerAttackRelease(["C4", "E4", "G4"], 0.2);
          }, 150);
        },
        sunny: () => {
          (["C5", "E5", "G5", "C6", "E6"] as const).forEach((note, i) => {
            this.spk?.triggerAttackRelease(note, 0.12, n + i * 0.07);
          });
        },
        pippa: () => {
          (["G4", "E4", "G4", "C5", "E5"] as const).forEach((note, i) => {
            this.pluck?.triggerAttack(note, n + i * 0.1);
          });
        },
        rosie: () => {
          (["C4", "E4", "G4", "B4", "D5", "G5"] as const).forEach((note, i) => {
            this.bell?.triggerAttackRelease([note], 0.12, n + i * 0.08);
          });
        },
      };
      patterns[id]();
    } catch {}
  }

  // Expose synths for MusicManager
  getKick() {
    return this.kick;
  }
  getHat() {
    return this.hat;
  }
  getBass() {
    return this.bass;
  }
  getXylo() {
    return this.xylo;
  }
  getPad() {
    return this.pad;
  }
  getPluck() {
    return this.pluck;
  }
  getBell() {
    return this.bell;
  }
}

export const synthManager = new SynthManager();
