import type { ShapeDef } from "../types";

export const shapes: ShapeDef[] = [
  {
    name: "Circle",
    emoji: "🔵",
    svg: '<circle cx="50" cy="50" r="40" fill="currentColor"/>',
  },
  {
    name: "Square",
    emoji: "🟧",
    svg: '<rect x="10" y="10" width="80" height="80" fill="currentColor"/>',
  },
  {
    name: "Triangle",
    emoji: "🔺",
    svg: '<polygon points="50,5 95,90 5,90" fill="currentColor"/>',
  },
  {
    name: "Star",
    emoji: "⭐",
    svg: '<polygon points="50,5 61,35 95,35 68,57 79,90 50,70 21,90 32,57 5,35 39,35" fill="currentColor"/>',
  },
  {
    name: "Heart",
    emoji: "❤️",
    svg: '<path d="M50 90 C20 60 0 40 10 25 C20 10 35 10 50 30 C65 10 80 10 90 25 C100 40 80 60 50 90Z" fill="currentColor"/>',
  },
  {
    name: "Diamond",
    emoji: "💎",
    svg: '<polygon points="50,5 95,50 50,95 5,50" fill="currentColor"/>',
  },
];
