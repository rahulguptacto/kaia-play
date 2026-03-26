import { useEffect, useRef } from "react";

interface FloaterState {
  emoji: string;
  x: number;
  y: number;
  phase: number;
  speed: number;
  size: number;
}

interface Props {
  emojis: string[];
}

export default function FloatingEmoji({ emojis }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatersRef = useRef<FloaterState[]>([]);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Initialize floaters
    floatersRef.current = emojis.map((emoji) => ({
      emoji,
      x: Math.random() * 85 + 5,
      y: Math.random() * 30 + 5,
      phase: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.4,
      size: 26 + Math.random() * 18,
    }));

    // Create DOM elements directly for performance (60fps animation)
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    elementsRef.current = [];

    floatersRef.current.forEach((f) => {
      const el = document.createElement("div");
      el.style.cssText = `
        position: absolute;
        pointer-events: none;
        opacity: 0.55;
        filter: drop-shadow(0 2px 3px rgba(0,0,0,.15));
        font-size: ${f.size}px;
        left: ${f.x}%;
        top: ${f.y}%;
        will-change: transform;
      `;
      el.textContent = f.emoji;
      container.appendChild(el);
      elementsRef.current.push(el);
    });

    // Animation loop
    const id = setInterval(() => {
      floatersRef.current.forEach((f, i) => {
        f.phase += 0.02 * f.speed;
        f.x += Math.sin(f.phase) * 0.1;
        const el = elementsRef.current[i];
        if (el) {
          el.style.left = f.x + "%";
          el.style.top = f.y + Math.sin(f.phase) * 2 + "%";
        }
      });
    }, 50);

    return () => clearInterval(id);
  }, [emojis]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
