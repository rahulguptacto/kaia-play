import { useEffect, useState, useCallback } from "react";
import type { LearningMode } from "../types";
import { colors } from "../learning/colors";
import { animals } from "../learning/animals";
import { countEmojis } from "../learning/counting";
import { shapes } from "../learning/shapes";
import { bodyParts } from "../learning/bodyParts";
import { voiceManager } from "../audio/VoiceManager";
import { synthManager } from "../audio/SynthManager";

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

interface Props {
  mode: LearningMode;
  onTapCount?: (count: number) => void;
}

export default function LearningOverlay({ mode, onTapCount }: Props) {
  if (!mode) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      {mode === "colors" && <ColorMode />}
      {mode === "animals" && <AnimalMode />}
      {mode === "counting" && <CountingMode onTapCount={onTapCount} />}
      {mode === "shapes" && <ShapeMode />}
      {mode === "bodyParts" && <BodyPartsMode />}
    </div>
  );
}

function ColorMode() {
  const [choices, setChoices] = useState(() => shuffle(colors).slice(0, 3));
  const [target, setTarget] = useState(() => pickRandom(choices));
  const [firstRound, setFirstRound] = useState(true);

  const nextRound = useCallback(() => {
    const newChoices = shuffle(colors).slice(0, 3);
    const newTarget = pickRandom(newChoices);
    setChoices(newChoices);
    setTarget(newTarget);
    const key = `tap-the-${newTarget.name.toLowerCase()}`;
    voiceManager.speak(key);
  }, []);

  useEffect(() => {
    if (firstRound) {
      // First time: play intro, then the color prompt
      voiceManager.speak("color-intro");
      setTimeout(() => {
        const key = `tap-the-${target.name.toLowerCase()}`;
        voiceManager.speak(key);
      }, 3000);
      setFirstRound(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TargetBadge emoji={target.emoji} color={target.hex} />

      {choices.map((c, i) => (
        <div
          key={c.name + i}
          style={{
            position: "absolute",
            left: 15 + i * 30 + "%",
            top: "35%",
            width: "min(22vw, 120px)",
            height: "min(22vw, 120px)",
            borderRadius: "50%",
            background: c.hex,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "min(11vw, 60px)",
            cursor: "pointer",
            pointerEvents: "auto",
            boxShadow: "0 4px 20px rgba(0,0,0,.3)",
            animation: "target-pulse 1s ease-in-out infinite alternate",
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            if (c.hex === target.hex) {
              synthManager.correct();
              const key = `yes-${target.name.toLowerCase()}`;
              voiceManager.speak(key);
              setTimeout(nextRound, 4000); // Longer pause — conversational clips are longer
            } else {
              synthManager.incorrect();
              voiceManager.speak("wrong-color");
              // After the encouragement, repeat the target
              setTimeout(() => {
                const key = `tap-the-${target.name.toLowerCase()}`;
                voiceManager.speak(key);
              }, 3000);
            }
          }}
        >
          {c.emoji}
        </div>
      ))}
    </>
  );
}

function AnimalMode() {
  const [animal, setAnimal] = useState(() => pickRandom(animals));
  const [firstAnimal, setFirstAnimal] = useState(true);

  const nextAnimal = useCallback(() => {
    const next = pickRandom(animals);
    setAnimal(next);
    voiceManager.speak(next.voiceKey);
  }, []);

  useEffect(() => {
    if (firstAnimal) {
      voiceManager.speak("animal-intro");
      setTimeout(() => {
        voiceManager.speak(animal.voiceKey);
      }, 2500);
      setFirstAnimal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "35%",
        transform: "translateX(-50%)",
        width: "min(35vw, 180px)",
        height: "min(35vw, 180px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "min(21vw, 108px)",
        background: "rgba(255,255,255,.2)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: "50%",
        cursor: "pointer",
        pointerEvents: "auto",
        boxShadow: "0 4px 20px rgba(0,0,0,.3)",
        animation: "target-pulse 1s ease-in-out infinite alternate",
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        // Repeat the current animal sound, then move to next
        voiceManager.speak(animal.voiceKey);
        setTimeout(nextAnimal, 5000); // Longer for conversational clips
      }}
    >
      {animal.emoji}
    </div>
  );
}

function CountingMode({
  onTapCount,
}: {
  onTapCount?: (count: number) => void;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    voiceManager.speak("count-intro");
  }, []);

  useEffect(() => {
    if (count > 0 && count <= 10) {
      const key = `count-${count}`;
      voiceManager.speak(key);
      onTapCount?.(count);

      if (count === 10) {
        // count-10 already has the celebration built in — wait for it
        setTimeout(() => {
          synthManager.celebrate();
          setCount(0);
        }, 4000);
      }
    }
  }, [count, onTapCount]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "auto",
        cursor: "pointer",
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        setCount((c) => (c >= 10 ? 1 : c + 1));
      }}
    >
      {count > 0 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "40%",
            transform: "translateX(-50%)",
            fontSize: 80,
            animation: "star-pop .5s ease-out",
          }}
        >
          {pickRandom(countEmojis)}
        </div>
      )}
    </div>
  );
}

function ShapeMode() {
  const [choices, setChoices] = useState(() => shuffle(shapes).slice(0, 3));
  const [target, setTarget] = useState(() => pickRandom(choices));
  const [firstRound, setFirstRound] = useState(true);

  const shapeColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#FFD93D",
    "#A855F7",
    "#FF69B4",
    "#4CC9F0",
  ];

  const nextRound = useCallback(() => {
    const newChoices = shuffle(shapes).slice(0, 3);
    const newTarget = pickRandom(newChoices);
    setChoices(newChoices);
    setTarget(newTarget);
    const key = `tap-the-${newTarget.name.toLowerCase()}`;
    voiceManager.speak(key);
  }, []);

  useEffect(() => {
    if (firstRound) {
      voiceManager.speak("shape-intro");
      setTimeout(() => {
        const key = `tap-the-${target.name.toLowerCase()}`;
        voiceManager.speak(key);
      }, 2500);
      setFirstRound(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {choices.map((s, i) => (
        <div
          key={s.name + i}
          style={{
            position: "absolute",
            left: 15 + i * 30 + "%",
            top: "35%",
            width: "min(22vw, 120px)",
            height: "min(22vw, 120px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            pointerEvents: "auto",
            animation: "target-pulse 1s ease-in-out infinite alternate",
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            if (s.name === target.name) {
              synthManager.correct();
              const key = `yes-${target.name.toLowerCase()}`;
              voiceManager.speak(key);
              setTimeout(nextRound, 3500);
            } else {
              synthManager.incorrect();
              voiceManager.speak("praise-try-again");
              setTimeout(() => {
                const key = `tap-the-${target.name.toLowerCase()}`;
                voiceManager.speak(key);
              }, 3000);
            }
          }}
        >
          <svg
            viewBox="0 0 100 100"
            width="80%"
            height="80%"
            style={{ color: shapeColors[i % shapeColors.length] }}
          >
            <g dangerouslySetInnerHTML={{ __html: s.svg }} />
          </svg>
        </div>
      ))}
    </>
  );
}

function BodyPartsMode() {
  const [part, setPart] = useState(() => pickRandom(bodyParts));
  const [firstPart, setFirstPart] = useState(true);

  const nextPart = useCallback(() => {
    const next = pickRandom(bodyParts);
    setPart(next);
    voiceManager.speak(next.voiceKey);
  }, []);

  useEffect(() => {
    if (firstPart) {
      voiceManager.speak("body-intro");
      setTimeout(() => {
        voiceManager.speak(part.voiceKey);
      }, 2500);
      setFirstPart(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "30%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        pointerEvents: "auto",
        cursor: "pointer",
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        synthManager.correct();
        voiceManager.speak("praise-good-job");
        setTimeout(nextPart, 3500);
      }}
    >
      <div
        style={{
          fontSize: 100,
          animation: "target-pulse 1s ease-in-out infinite alternate",
        }}
      >
        {part.emoji}
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: "white",
          textShadow: "0 2px 8px rgba(0,0,0,.3)",
        }}
      >
        {part.name}
      </div>
    </div>
  );
}

function TargetBadge({
  emoji,
  color,
}: {
  emoji: string;
  color: string | null;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "8%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 160,
        background: "rgba(0,0,0,.6)",
        borderRadius: 20,
        padding: "10px 24px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        animation: "bubble-in .3s cubic-bezier(.34,1.56,.64,1)",
      }}
    >
      <span style={{ fontSize: 40 }}>{emoji}</span>
      {color && (
        <span
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "3px solid white",
            background: color,
            display: "inline-block",
          }}
        />
      )}
    </div>
  );
}
