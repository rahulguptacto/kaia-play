/**
 * MusicManager — Normal and Reggaeton music loops using Tone.js Transport.
 */

import * as Tone from "tone";
import { synthManager } from "./SynthManager";
import type { MusicMode } from "../types";

type TransportType = ReturnType<typeof Tone.getTransport>;

class MusicManager {
  private currentMode: MusicMode = null;

  get mode(): MusicMode {
    return this.currentMode;
  }

  /**
   * Toggle music mode. Returns the new mode (or null if stopped).
   */
  toggle(mode: "normal" | "reggaeton"): MusicMode {
    const transport = Tone.getTransport();

    // If same mode is playing, stop it
    if (this.currentMode === mode) {
      transport.stop();
      transport.cancel();
      this.currentMode = null;
      return null;
    }

    // If different mode is playing, stop first
    if (transport.state === "started") {
      transport.stop();
      transport.cancel();
    }

    // Start new mode
    if (mode === "reggaeton") {
      this.startReggaeton(transport);
    } else {
      this.startNormal(transport);
    }

    transport.start();
    this.currentMode = mode;
    return mode;
  }

  stop(): void {
    const transport = Tone.getTransport();
    if (transport.state === "started") {
      transport.stop();
      transport.cancel();
    }
    this.currentMode = null;
  }

  private startReggaeton(transport: TransportType): void {
    transport.bpm.value = 95;

    const kick = synthManager.getKick();
    const hat = synthManager.getHat();
    const bass = synthManager.getBass();
    const pluck = synthManager.getPluck();
    const bell = synthManager.getBell();

    let bi = 0;
    let mi = 0;
    const bn = ["C2", "C2", "G2", "G2"];

    if (kick) {
      transport.scheduleRepeat((time: number) => {
        kick.triggerAttackRelease("C1", "16n", time);
      }, "4n");
      transport.scheduleRepeat(
        (time: number) => {
          kick.triggerAttackRelease("G1", "16n", time);
        },
        "4n",
        "4n + 8n",
      );
    }
    if (hat) {
      transport.scheduleRepeat((time: number) => {
        hat.triggerAttackRelease("32n", time);
      }, "8n");
    }
    if (bass) {
      transport.scheduleRepeat((time: number) => {
        bass.triggerAttackRelease(bn[bi++ % bn.length], "8n", time);
      }, "2n");
    }
    if (pluck) {
      transport.scheduleRepeat((time: number) => {
        pluck.triggerAttack(["G4", "C5", "E5"][mi++ % 3], time);
      }, "4n");
    }
    if (bell) {
      transport.scheduleRepeat((time: number) => {
        bell.triggerAttackRelease(["C4", "E4", "G4"], "8n", time, 0.08);
      }, "1n");
    }
  }

  private startNormal(transport: TransportType): void {
    transport.bpm.value = 112;

    const kick = synthManager.getKick();
    const hat = synthManager.getHat();
    const bass = synthManager.getBass();
    const xylo = synthManager.getXylo();
    const pad = synthManager.getPad();

    const bn = ["C2", "C2", "F2", "F2", "G2", "G2", "C2", "C2"];
    const mn = [
      "C5",
      "D5",
      "E5",
      "G5",
      "A5",
      "G5",
      "E5",
      "D5",
      "C5",
      "E5",
      "G5",
      "A5",
      "G5",
      "E5",
      "D5",
      "C5",
    ];
    const ch = [
      ["C3", "E3", "G3"],
      ["F3", "A3", "C4"],
      ["G3", "B3", "D4"],
      ["C3", "E3", "G3"],
    ];

    let b = 0;
    let m = 0;
    let c = 0;

    if (kick) {
      transport.scheduleRepeat((time: number) => {
        kick.triggerAttackRelease("C1", "8n", time);
      }, "4n");
    }
    if (hat) {
      transport.scheduleRepeat((time: number) => {
        hat.triggerAttackRelease("32n", time);
      }, "8n");
    }
    if (bass) {
      transport.scheduleRepeat((time: number) => {
        bass.triggerAttackRelease(bn[b++ % bn.length], "8n", time);
      }, "4n");
    }
    if (xylo) {
      transport.scheduleRepeat((time: number) => {
        xylo.triggerAttackRelease(mn[m++ % mn.length], "8n", time);
      }, "8n");
    }
    if (pad) {
      transport.scheduleRepeat((time: number) => {
        pad.triggerAttackRelease(ch[c++ % ch.length], "2n", time, 0.1);
      }, "1n");
    }
  }
}

export const musicManager = new MusicManager();
