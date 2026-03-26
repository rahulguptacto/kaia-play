import type { AnimationStep } from "../types";
import { synthManager } from "../audio/SynthManager";

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function peekaboo(): AnimationStep[] {
  const hidePhrase = pickRandom(["peek-a-boo", "where-am-i", "im-hiding"]);
  const revealPhrase = pickRandom([
    "here-i-am",
    "boo",
    "surprise",
    "i-see-you-kaia",
  ]);

  return [
    {
      duration: 400,
      style: { transform: "scale(.7) rotate(8deg)", opacity: ".7" },
      sfx: () => synthManager.peekaboo(),
      voice: hidePhrase,
    },
    { duration: 350, style: { transform: "scale(.3)", opacity: ".3" } },
    { duration: 250, style: { transform: "scale(0)", opacity: "0" } },
    {
      duration: 700,
      style: { transform: "scale(0)", opacity: "0" },
      overlay: "🙈",
    },
    {
      duration: 500,
      style: { transform: "scale(0)", opacity: "0" },
      overlay: "🙈",
    },
    {
      duration: 300,
      style: { transform: "scale(.5)", opacity: ".5" },
      sfx: () => synthManager.praise(),
      voice: revealPhrase,
      voicePitch: 1.8,
      voiceRate: 1.15,
    },
    {
      duration: 250,
      style: { transform: "scale(1.35)", opacity: "1" },
      sparkles: true,
    },
    { duration: 200, style: { transform: "scale(.9)", opacity: "1" } },
    { duration: 250, style: { transform: "scale(1.05)", opacity: "1" } },
    { duration: 300, style: { transform: "scale(1)", opacity: "1" } },
  ];
}

export function dance(): AnimationStep[] {
  const phrase = pickRandom([
    "dance-dance-dance",
    "shake-shake-shake",
    "lets-dance-kaia",
    "wiggle-wiggle",
  ]);

  const steps: AnimationStep[] = [
    {
      duration: 300,
      style: { transform: "rotate(0deg)" },
      voice: phrase,
      sfx: () => synthManager.danceBeat(),
    },
  ];

  for (let i = 0; i < 6; i++) {
    steps.push({
      duration: 250,
      style: {
        transform:
          "rotate(-14deg) translateX(-12px) translateY(-8px) scale(1.05)",
      },
      sfx: i % 2 === 0 ? () => synthManager.danceBeat() : undefined,
    });
    steps.push({
      duration: 250,
      style: {
        transform:
          "rotate(14deg) translateX(12px) translateY(-12px) scale(1.05)",
      },
      sfx: i % 2 === 1 ? () => synthManager.danceBeat() : undefined,
    });
  }

  steps.push({
    duration: 300,
    style: { transform: "rotate(180deg) scale(1.1)" },
    sfx: () => synthManager.spin(),
    voice: "wheee",
    voicePitch: 1.9,
  });
  steps.push({
    duration: 300,
    style: { transform: "rotate(360deg) scale(1)" },
    sparkles: true,
  });
  steps.push({
    duration: 200,
    style: { transform: "rotate(0deg) scale(1)" },
  });

  return steps;
}

export function jump(): AnimationStep[] {
  const phrase = pickRandom([
    "jump-jump-jump",
    "boing-boing",
    "up-up-up",
    "wheee-so-high",
  ]);

  return [
    {
      duration: 250,
      style: {
        transform: "scaleX(1.15) scaleY(.8) translateY(10px)",
      },
      voice: phrase,
    },
    {
      duration: 150,
      style: {
        transform: "scaleX(1.2) scaleY(.7) translateY(15px)",
      },
    },
    {
      duration: 200,
      style: {
        transform: "scaleX(.85) scaleY(1.2) translateY(-80px)",
      },
      sfx: () => synthManager.jump(),
    },
    {
      duration: 300,
      style: { transform: "translateY(-100px)" },
      voice: "wheee",
      voicePitch: 1.9,
    },
    { duration: 200, style: { transform: "translateY(-95px)" } },
    { duration: 150, style: { transform: "translateY(-30px)" } },
    {
      duration: 100,
      style: {
        transform: "scaleX(1.25) scaleY(.7) translateY(8px)",
      },
      sfx: () => synthManager.jumpLand(),
      sparkles: true,
    },
    { duration: 200, style: { transform: "translateY(-25px)" } },
    { duration: 150, style: { transform: "translateY(4px)" } },
    {
      duration: 200,
      style: { transform: "scale(1) translateY(0)" },
    },
  ];
}

export function spin(): AnimationStep[] {
  const phrase = pickRandom([
    "round-and-round",
    "spin-spin-spin",
    "dizzy",
    "wheee-spinning",
  ]);

  return [
    {
      duration: 50,
      style: { transform: "rotate(0deg) scale(1)" },
      voice: phrase,
      sfx: () => synthManager.spin(),
    },
    {
      duration: 200,
      style: { transform: "rotate(90deg) scale(1.1)" },
    },
    {
      duration: 200,
      style: { transform: "rotate(180deg) scale(1.15)" },
    },
    {
      duration: 200,
      style: { transform: "rotate(270deg) scale(1.1)" },
    },
    {
      duration: 200,
      style: { transform: "rotate(360deg) scale(1.05)" },
      sparkles: true,
    },
    {
      duration: 150,
      style: { transform: "rotate(540deg) scale(1.15)" },
      voice: "wheee",
      voicePitch: 1.9,
    },
    {
      duration: 150,
      style: { transform: "rotate(720deg) scale(1)" },
      sparkles: true,
    },
    {
      duration: 200,
      style: { transform: "rotate(720deg) scale(1)" },
    },
  ];
}

export function party(): AnimationStep[] {
  const phrase = pickRandom([
    "yay-party-time",
    "hooray",
    "we-did-it",
    "amazing",
  ]);

  return [
    {
      duration: 200,
      style: {
        transform: "scaleX(1.15) scaleY(.8) translateY(8px)",
      },
      voice: phrase,
      sfx: () => synthManager.celebrate(),
    },
    {
      duration: 200,
      style: { transform: "translateY(-60px) scale(1.1)" },
    },
    {
      duration: 200,
      style: {
        transform: "translateY(-70px) rotate(180deg) scale(1.15)",
      },
      sparkles: true,
    },
    {
      duration: 200,
      style: {
        transform: "translateY(-60px) rotate(360deg) scale(1.1)",
      },
    },
    {
      duration: 150,
      style: {
        transform: "translateY(5px) scaleX(1.2) scaleY(.75)",
      },
      sparkles: true,
    },
    {
      duration: 120,
      style: { transform: "rotate(-15deg) scale(1.05)" },
      voice: "yay",
      voicePitch: 1.9,
    },
    {
      duration: 120,
      style: { transform: "rotate(15deg) scale(1.05)" },
    },
    {
      duration: 120,
      style: { transform: "rotate(-10deg)" },
    },
    {
      duration: 120,
      style: { transform: "rotate(10deg)" },
    },
    {
      duration: 200,
      style: { transform: "rotate(0deg) scale(1)" },
    },
  ];
}

export const allRoutines = [peekaboo, dance, jump, spin, party];
