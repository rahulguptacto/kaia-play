import type { CSSProperties } from "react";
import type { CharacterId } from "../types";
import Luna from "../characters/Luna";
import Benny from "../characters/Benny";
import Sunny from "../characters/Sunny";
import Pippa from "../characters/Pippa";
import Rosie from "../characters/Rosie";
import { characters } from "../characters";

const CharacterSVGs: Record<CharacterId, React.FC<{ size?: number }>> = {
  luna: Luna,
  benny: Benny,
  sunny: Sunny,
  pippa: Pippa,
  rosie: Rosie,
};

interface Props {
  id: CharacterId;
  position: { x: number; y: number };
  animStyle?: CSSProperties;
  overlay?: string | null;
  isBusy: boolean;
  onTap: () => void;
}

export default function Character({
  id,
  position,
  animStyle,
  overlay,
  isBusy,
  onTap,
}: Props) {
  const meta = characters.find((c) => c.id === id)!;
  const SVG = CharacterSVGs[id];

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        padding: 8,
        left: position.x + "%",
        bottom: position.y + "%",
        transform: "translate(-50%, 0)",
        transition: "left 3s ease-in-out, bottom 3s ease-in-out",
        filter: isBusy
          ? "drop-shadow(0 0 20px rgba(255,255,100,.7))"
          : "drop-shadow(0 4px 8px rgba(0,0,0,.3))",
        animation: !isBusy ? "idle-float 2.5s ease-in-out infinite" : "none",
        willChange: "transform",
        zIndex: 10,
        ...animStyle,
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        onTap();
      }}
    >
      <SVG size={meta.size} />
      {overlay && (
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 70,
            zIndex: 40,
            animation: "overlay-bounce .8s ease-in-out infinite alternate",
          }}
        >
          {overlay}
        </div>
      )}
    </div>
  );
}
