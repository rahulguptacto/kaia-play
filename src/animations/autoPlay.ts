import type { AnimationStep } from "../types";
import { synthManager } from "../audio/SynthManager";

export interface AutoPlayPhrase {
  voiceKey: string;
  animation: "wave" | "bounce" | "wiggle" | "spin";
}

export const autoPlayPhrases: AutoPlayPhrase[] = [
  { voiceKey: "auto-love", animation: "wave" },
  { voiceKey: "auto-twinkle", animation: "spin" },
  { voiceKey: "auto-animals", animation: "wiggle" },
  { voiceKey: "auto-abc", animation: "bounce" },
  { voiceKey: "auto-head-shoulders", animation: "wave" },
  { voiceKey: "auto-superstar", animation: "spin" },
  { voiceKey: "auto-counting", animation: "bounce" },
  { voiceKey: "auto-row", animation: "wave" },
  { voiceKey: "auto-baa", animation: "wiggle" },
  { voiceKey: "auto-itsy", animation: "wiggle" },
];

export function generateAutoPlaySteps(phrase: AutoPlayPhrase): AnimationStep[] {
  const animations: Record<string, AnimationStep[]> = {
    wave: [
      {
        duration: 200,
        style: { transform: "rotate(0deg)" },
        voice: phrase.voiceKey,
      },
      {
        duration: 400,
        style: { transform: "rotate(-12deg) scale(1.05)" },
      },
      {
        duration: 400,
        style: { transform: "rotate(12deg) scale(1.05)" },
      },
      {
        duration: 400,
        style: { transform: "rotate(-12deg) scale(1.05)" },
      },
      {
        duration: 400,
        style: { transform: "rotate(12deg) scale(1.05)" },
      },
      {
        duration: 300,
        style: { transform: "rotate(0deg) scale(1)" },
        sparkles: true,
      },
    ],
    bounce: [
      {
        duration: 100,
        style: { transform: "translateY(0)" },
        voice: phrase.voiceKey,
      },
      {
        duration: 150,
        style: { transform: "translateY(5px) scaleY(.85)" },
        sfx: () => synthManager.danceBeat(),
      },
      {
        duration: 200,
        style: { transform: "translateY(-35px) scaleY(1.1)" },
      },
      {
        duration: 150,
        style: { transform: "translateY(5px) scaleY(.85)" },
        sfx: () => synthManager.danceBeat(),
      },
      {
        duration: 200,
        style: { transform: "translateY(-50px)" },
      },
      { duration: 150, style: { transform: "translateY(5px)" } },
      {
        duration: 200,
        style: { transform: "translateY(-25px)" },
      },
      {
        duration: 200,
        style: { transform: "translateY(0) scale(1)" },
        sparkles: true,
      },
    ],
    wiggle: [
      {
        duration: 100,
        style: { transform: "rotate(0deg)" },
        voice: phrase.voiceKey,
        sfx: () => synthManager.wiggle(),
      },
      {
        duration: 80,
        style: { transform: "rotate(-18deg) scale(1.05)" },
      },
      {
        duration: 80,
        style: { transform: "rotate(18deg) scale(1.05)" },
      },
      { duration: 80, style: { transform: "rotate(-18deg)" } },
      { duration: 80, style: { transform: "rotate(18deg)" } },
      { duration: 80, style: { transform: "rotate(-14deg)" } },
      { duration: 80, style: { transform: "rotate(14deg)" } },
      {
        duration: 200,
        style: { transform: "rotate(0deg) scale(1)" },
        sparkles: true,
      },
    ],
    spin: [
      {
        duration: 200,
        style: { transform: "scale(1)" },
        voice: phrase.voiceKey,
        sfx: () => synthManager.spin(),
      },
      {
        duration: 300,
        style: { transform: "scale(1.2)" },
        sparkles: true,
      },
      { duration: 200, style: { transform: "scale(.95)" } },
      {
        duration: 300,
        style: { transform: "scale(1.15)" },
        sparkles: true,
      },
      { duration: 200, style: { transform: "scale(1)" } },
    ],
  };

  return animations[phrase.animation] || animations.wave;
}
