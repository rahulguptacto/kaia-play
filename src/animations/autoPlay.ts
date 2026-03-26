import type { AnimationStep } from "../types";
import { synthManager } from "../audio/SynthManager";

export interface AutoPlayPhrase {
  voiceKey: string;
  text: string;
  animation: "wave" | "bounce" | "wiggle" | "spin";
}

export const autoPlayPhrases: AutoPlayPhrase[] = [
  {
    voiceKey: "hi-kaia-i-love-you",
    text: "Hi Kaia! I love you!",
    animation: "wave",
  },
  {
    voiceKey: "twinkle-twinkle",
    text: "Twinkle twinkle little star!",
    animation: "spin",
  },
  {
    voiceKey: "animal-sounds-mixed",
    text: "Moo! Quack quack! Woof woof!",
    animation: "wiggle",
  },
  { voiceKey: "abcdefg", text: "A, B, C, D, E, F, G!", animation: "bounce" },
  {
    voiceKey: "head-shoulders",
    text: "Head, shoulders, knees and toes!",
    animation: "wave",
  },
  {
    voiceKey: "old-macdonald",
    text: "Old MacDonald had a farm, E I E I O!",
    animation: "wiggle",
  },
  {
    voiceKey: "kaia-is-a-superstar",
    text: "Kaia is a superstar!",
    animation: "spin",
  },
  {
    voiceKey: "one-two-three-four-five",
    text: "One, two, three, four, five!",
    animation: "bounce",
  },
  {
    voiceKey: "row-row-row",
    text: "Row row row your boat!",
    animation: "wave",
  },
  {
    voiceKey: "baa-baa-black-sheep",
    text: "Baa baa black sheep!",
    animation: "wiggle",
  },
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
