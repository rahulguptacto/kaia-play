import type { CSSProperties } from "react";

export type CharacterId = "luna" | "benny" | "sunny" | "pippa" | "rosie";

export interface CharacterMeta {
  id: CharacterId;
  name: string;
  size: number;
  startPosition: { x: number; y: number };
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
}

export interface Scene {
  emoji: string;
  background: string;
  floaters: string[];
}

export interface AnimationStep {
  duration: number;
  style: CSSProperties;
  sfx?: () => void;
  voice?: string;
  voicePitch?: number;
  voiceRate?: number;
  sparkles?: boolean;
  overlay?: string;
}

export type RoutineGenerator = () => AnimationStep[];

export interface ActionDef {
  emoji: string;
  generate: RoutineGenerator;
}

export interface AutoPlayPhrase {
  voice: string;
  animation: "wave" | "bounce" | "wiggle" | "spin";
}

export interface ColorDef {
  name: string;
  hex: string;
  emoji: string;
}

export interface AnimalDef {
  name: string;
  emoji: string;
  phrase: string;
  voiceKey: string;
}

export interface ShapeDef {
  name: string;
  emoji: string;
  svg: string;
}

export type LearningMode =
  | "colors"
  | "animals"
  | "counting"
  | "shapes"
  | "bodyParts"
  | null;

export type MusicMode = "normal" | "reggaeton" | null;

export interface AppState {
  sceneIndex: number;
  learningMode: LearningMode;
  musicMode: MusicMode;
  isSpeaking: boolean;
  tapCount: number;
  stars: number;
  countValue: number;
  characterBusy: Record<CharacterId, boolean>;
  characterPositions: Record<CharacterId, { x: number; y: number }>;
}

export type AppAction =
  | { type: "SET_SCENE"; index: number }
  | { type: "SET_LEARNING"; mode: LearningMode }
  | { type: "SET_MUSIC"; mode: MusicMode }
  | { type: "SET_SPEAKING"; value: boolean }
  | { type: "TAP" }
  | { type: "ADD_STAR" }
  | { type: "SET_COUNT"; value: number }
  | { type: "SET_BUSY"; id: CharacterId; busy: boolean }
  | {
      type: "UPDATE_POSITION";
      id: CharacterId;
      position: { x: number; y: number };
    };
