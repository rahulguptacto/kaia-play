import type { LearningMode, MusicMode } from "../types";
import { scenes } from "../scenes";

interface Props {
  currentScene: number;
  onSceneChange: (index: number) => void;
  onAction: (actionIndex: number) => void;
  learningMode: LearningMode;
  onLearningChange: (mode: LearningMode) => void;
  musicMode: MusicMode;
  onMusicToggle: (mode: "normal" | "reggaeton") => void;
}

const actionEmojis = ["🙈", "💃", "🦘", "🌀", "🎉"];
const learningButtons: { emoji: string; mode: LearningMode }[] = [
  { emoji: "🎨", mode: "colors" },
  { emoji: "🐮", mode: "animals" },
  { emoji: "🔢", mode: "counting" },
  { emoji: "🔷", mode: "shapes" },
  { emoji: "🫶", mode: "bodyParts" },
];

const btnBase: React.CSSProperties = {
  border: "none",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

export default function BottomBar({
  currentScene,
  onSceneChange,
  onAction,
  learningMode,
  onLearningChange,
  musicMode,
  onMusicToggle,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "8px 6px 10px",
        background: "linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.35))",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,.1)",
        zIndex: 100,
        paddingBottom: "max(10px, env(safe-area-inset-bottom))",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Scene buttons */}
      {scenes.map((sc, i) => (
        <button
          key={`scene-${i}`}
          style={{
            ...btnBase,
            width: 38,
            height: 38,
            fontSize: 17,
            border:
              i === currentScene
                ? "2px solid white"
                : "2px solid rgba(255,255,255,.15)",
            background:
              i === currentScene
                ? "rgba(255,255,255,.3)"
                : "rgba(255,255,255,.06)",
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            onSceneChange(i);
          }}
        >
          {sc.emoji}
        </button>
      ))}

      <Divider />

      {/* Action buttons */}
      {actionEmojis.map((emoji, i) => (
        <button
          key={`action-${i}`}
          style={{
            ...btnBase,
            width: 56,
            height: 56,
            fontSize: 26,
            border: "3px solid rgba(255,255,255,.2)",
            background: "rgba(255,255,255,.1)",
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            onAction(i);
          }}
        >
          {emoji}
        </button>
      ))}

      <Divider />

      {/* Learning buttons */}
      {learningButtons.map((lb) => (
        <button
          key={lb.mode}
          style={{
            ...btnBase,
            width: 56,
            height: 56,
            fontSize: 26,
            border:
              learningMode === lb.mode
                ? "3px solid #4CC9F0"
                : "3px solid rgba(100,200,255,.3)",
            background:
              learningMode === lb.mode
                ? "linear-gradient(135deg, #4CC9F0, #A855F7)"
                : "rgba(100,200,255,.1)",
            transform: learningMode === lb.mode ? "scale(1.15)" : "scale(1)",
            transition: "all .15s",
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            onLearningChange(learningMode === lb.mode ? null : lb.mode);
          }}
        >
          {lb.emoji}
        </button>
      ))}

      <Divider />

      {/* Music buttons */}
      <button
        style={{
          ...btnBase,
          width: 44,
          height: 44,
          fontSize: 20,
          border:
            musicMode === "normal"
              ? "3px solid #FFD700"
              : "3px solid rgba(255,255,255,.2)",
          background:
            musicMode === "normal"
              ? "linear-gradient(135deg, #FFD93D, #FB5607)"
              : "rgba(255,255,255,.08)",
          boxShadow:
            musicMode === "normal" ? "0 0 20px rgba(255,217,61,.5)" : "none",
          animation:
            musicMode === "normal"
              ? "music-pulse .6s ease-in-out infinite alternate"
              : "none",
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          onMusicToggle("normal");
        }}
      >
        🎵
      </button>
      <button
        style={{
          ...btnBase,
          width: 44,
          height: 44,
          fontSize: 20,
          border:
            musicMode === "reggaeton"
              ? "3px solid #FFD700"
              : "3px solid rgba(255,255,255,.2)",
          background:
            musicMode === "reggaeton"
              ? "linear-gradient(135deg, #FFD93D, #FB5607)"
              : "rgba(255,255,255,.08)",
          boxShadow:
            musicMode === "reggaeton" ? "0 0 20px rgba(255,217,61,.5)" : "none",
          animation:
            musicMode === "reggaeton"
              ? "music-pulse .6s ease-in-out infinite alternate"
              : "none",
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          onMusicToggle("reggaeton");
        }}
      >
        🐰
      </button>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: 1,
        height: 36,
        background: "rgba(255,255,255,.2)",
        margin: "0 2px",
        flexShrink: 0,
      }}
    />
  );
}
