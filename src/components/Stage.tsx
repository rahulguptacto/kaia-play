import { useRef } from "react";
import type { AppState, AppAction, CharacterId } from "../types";
import { scenes } from "../scenes";
import Character from "./Character";
import FloatingEmoji from "./FloatingEmoji";
import BurstEffect from "./BurstEffect";
import SpeechBubble from "./SpeechBubble";
import StarCounter from "./StarCounter";
import DJBunny from "./DJBunny";
import LearningOverlay from "./LearningOverlay";
import { characters } from "../characters";
import { synthManager } from "../audio/SynthManager";

interface Props {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  characterAnimStyles: Record<CharacterId, React.CSSProperties>;
  characterOverlays: Record<CharacterId, string | null>;
  onCharacterTap: (id: CharacterId) => void;
}

export default function Stage({
  state,
  dispatch,
  characterAnimStyles,
  characterOverlays,
  onCharacterTap,
}: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const scene = scenes[state.sceneIndex];

  const handleStageTap = (e: React.PointerEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = e.clientX - rect.left;
    synthManager.tap(cx / rect.width);
    dispatch({ type: "TAP" });

    // Every 5 taps: celebration
    if ((state.tapCount + 1) % 5 === 0) {
      synthManager.celebrate();
      dispatch({ type: "ADD_STAR" });
    }
  };

  return (
    <div
      ref={stageRef}
      style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        background: scene.background,
        transition: "background 1s ease",
      }}
      onPointerDown={handleStageTap}
    >
      <SpeechBubble visible={state.isSpeaking} />
      <StarCounter count={state.stars} />
      <DJBunny visible={state.musicMode === "reggaeton"} />
      <FloatingEmoji emojis={scene.floaters} />

      {characters.map((c) => (
        <Character
          key={c.id}
          id={c.id}
          position={state.characterPositions[c.id]}
          animStyle={characterAnimStyles[c.id]}
          overlay={characterOverlays[c.id]}
          isBusy={state.characterBusy[c.id]}
          onTap={() => onCharacterTap(c.id)}
        />
      ))}

      <LearningOverlay mode={state.learningMode} />
      <BurstEffect containerRef={stageRef} />
    </div>
  );
}
