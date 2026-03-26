import { useEffect, useRef } from "react";

const BURST_EMOJIS = [
  "⭐",
  "✨",
  "💖",
  "🌟",
  "🎉",
  "💫",
  "🌈",
  "🦋",
  "🎀",
  "💕",
  "🌸",
  "🎊",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function BurstEffect({ containerRef }: Props) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const layer = layerRef.current;
    if (!container || !layer) return;

    const handlePointerDown = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      createBurst(layer, cx, cy);
    };

    container.addEventListener("pointerdown", handlePointerDown);
    return () =>
      container.removeEventListener("pointerdown", handlePointerDown);
  }, [containerRef]);

  return (
    <div
      ref={layerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 200,
      }}
    />
  );
}

function createBurst(layer: HTMLDivElement, x: number, y: number): void {
  const wrapper = document.createElement("div");
  wrapper.style.cssText = `position:absolute;left:${x}px;top:${y}px;pointer-events:none`;

  // Flash ring
  const flash = document.createElement("div");
  flash.style.cssText = `
    position:absolute;left:-40px;top:-40px;width:80px;height:80px;border-radius:50%;
    background:radial-gradient(circle,rgba(255,255,100,.9),rgba(255,100,200,.5) 40%,transparent 70%);
    animation:flash-out .6s ease-out forwards;
  `;
  wrapper.appendChild(flash);

  // Emoji particles
  for (let i = 0; i < 10; i++) {
    const em = document.createElement("div");
    const angle = (i / 10) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
    const dist = 50 + Math.random() * 80;
    em.style.cssText = `
      position:absolute;font-size:${22 + Math.random() * 20}px;
      left:-12px;top:-12px;
      animation:burst-out .8s ease-out ${Math.random() * 0.06}s forwards;
      opacity:0;
    `;
    em.style.setProperty("--bx", Math.cos(angle) * dist + "px");
    em.style.setProperty("--by", Math.sin(angle) * dist + "px");
    em.textContent = pickRandom(BURST_EMOJIS);
    wrapper.appendChild(em);
  }

  layer.appendChild(wrapper);
  setTimeout(() => wrapper.remove(), 900);
}
