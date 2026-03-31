import type { AnimationStep } from "../types";
import { synthManager } from "../audio/SynthManager";

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function peekaboo(): AnimationStep[] {
  const hideKey = pickRandom([
    "peek-hiding-1",
    "peek-hiding-2",
    "peek-hiding-3",
  ]);
  const revealKey = pickRandom([
    "peek-reveal-1",
    "peek-reveal-2",
    "peek-reveal-3",
    "peek-reveal-4",
  ]);

  return [
    {
      duration: 400,
      style: { transform: "scale(.7) rotate(8deg)", opacity: ".7" },
      sfx: () => synthManager.peekaboo(),
      voice: hideKey,
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
      voice: revealKey,
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
  const startKey = pickRandom([
    "dance-start-1",
    "dance-start-2",
    "dance-start-3",
  ]);

  const steps: AnimationStep[] = [
    {
      duration: 300,
      style: { transform: "rotate(0deg)" },
      voice: startKey,
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
    voice: "dance-whee",
  });
  steps.push({
    duration: 300,
    style: { transform: "rotate(360deg) scale(1)" },
    sparkles: true,
  });
  steps.push({
    duration: 400,
    style: { transform: "rotate(0deg) scale(1)" },
    voice: "dance-end",
  });

  return steps;
}

export function jump(): AnimationStep[] {
  const startKey = pickRandom(["jump-start-1", "jump-start-2", "jump-start-3"]);

  return [
    {
      duration: 250,
      style: { transform: "scaleX(1.15) scaleY(.8) translateY(10px)" },
      voice: startKey,
    },
    {
      duration: 150,
      style: { transform: "scaleX(1.2) scaleY(.7) translateY(15px)" },
    },
    {
      duration: 200,
      style: { transform: "scaleX(.85) scaleY(1.2) translateY(-80px)" },
      sfx: () => synthManager.jump(),
    },
    {
      duration: 300,
      style: { transform: "translateY(-100px)" },
      voice: "jump-whee",
    },
    { duration: 200, style: { transform: "translateY(-95px)" } },
    { duration: 150, style: { transform: "translateY(-30px)" } },
    {
      duration: 100,
      style: { transform: "scaleX(1.25) scaleY(.7) translateY(8px)" },
      sfx: () => synthManager.jumpLand(),
      sparkles: true,
    },
    { duration: 200, style: { transform: "translateY(-25px)" } },
    { duration: 150, style: { transform: "translateY(4px)" } },
    {
      duration: 300,
      style: { transform: "scale(1) translateY(0)" },
      voice: "jump-land",
    },
  ];
}

export function spin(): AnimationStep[] {
  const startKey = pickRandom(["spin-start-1", "spin-start-2"]);

  return [
    {
      duration: 50,
      style: { transform: "rotate(0deg) scale(1)" },
      voice: startKey,
      sfx: () => synthManager.spin(),
    },
    { duration: 200, style: { transform: "rotate(90deg) scale(1.1)" } },
    { duration: 200, style: { transform: "rotate(180deg) scale(1.15)" } },
    { duration: 200, style: { transform: "rotate(270deg) scale(1.1)" } },
    {
      duration: 200,
      style: { transform: "rotate(360deg) scale(1.05)" },
      sparkles: true,
    },
    {
      duration: 150,
      style: { transform: "rotate(540deg) scale(1.15)" },
      voice: "spin-dizzy",
    },
    {
      duration: 150,
      style: { transform: "rotate(720deg) scale(1)" },
      sparkles: true,
    },
    {
      duration: 300,
      style: { transform: "rotate(720deg) scale(1)" },
      voice: "spin-end",
    },
  ];
}

export function party(): AnimationStep[] {
  const startKey = pickRandom(["party-start-1", "party-start-2"]);

  return [
    {
      duration: 200,
      style: { transform: "scaleX(1.15) scaleY(.8) translateY(8px)" },
      voice: startKey,
      sfx: () => synthManager.celebrate(),
    },
    {
      duration: 200,
      style: { transform: "translateY(-60px) scale(1.1)" },
    },
    {
      duration: 200,
      style: { transform: "translateY(-70px) rotate(180deg) scale(1.15)" },
      sparkles: true,
    },
    {
      duration: 200,
      style: { transform: "translateY(-60px) rotate(360deg) scale(1.1)" },
    },
    {
      duration: 150,
      style: { transform: "translateY(5px) scaleX(1.2) scaleY(.75)" },
      sparkles: true,
    },
    {
      duration: 120,
      style: { transform: "rotate(-15deg) scale(1.05)" },
      voice: "party-yay",
    },
    { duration: 120, style: { transform: "rotate(15deg) scale(1.05)" } },
    { duration: 120, style: { transform: "rotate(-10deg)" } },
    { duration: 120, style: { transform: "rotate(10deg)" } },
    {
      duration: 300,
      style: { transform: "rotate(0deg) scale(1)" },
      voice: "party-confetti",
    },
  ];
}

export const allRoutines = [peekaboo, dance, jump, spin, party];
