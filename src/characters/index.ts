import type { CharacterMeta } from "../types";

export const characters: CharacterMeta[] = [
  {
    id: "luna",
    name: "Luna",
    size: 115,
    startPosition: { x: 10, y: 6 },
    bounds: { minX: 3, maxX: 18, minY: 3, maxY: 18 },
  },
  {
    id: "benny",
    name: "Benny",
    size: 115,
    startPosition: { x: 28, y: 10 },
    bounds: { minX: 20, maxX: 38, minY: 3, maxY: 18 },
  },
  {
    id: "sunny",
    name: "Sunny",
    size: 95,
    startPosition: { x: 48, y: 15 },
    bounds: { minX: 40, maxX: 58, minY: 6, maxY: 22 },
  },
  {
    id: "pippa",
    name: "Pippa",
    size: 110,
    startPosition: { x: 68, y: 8 },
    bounds: { minX: 60, maxX: 78, minY: 3, maxY: 18 },
  },
  {
    id: "rosie",
    name: "Rosie",
    size: 110,
    startPosition: { x: 86, y: 11 },
    bounds: { minX: 78, maxX: 95, minY: 3, maxY: 18 },
  },
];

export const characterIds = characters.map((c) => c.id);
