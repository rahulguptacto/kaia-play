import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type CSSProperties,
} from "react";
import type {
  CharacterId,
  AnimationStep,
  LearningMode,
  MusicMode,
} from "./types";
import { useAppState } from "./state/useAppState";
import { audioManager } from "./audio/AudioManager";
import { voiceManager } from "./audio/VoiceManager";
import { synthManager } from "./audio/SynthManager";
import { musicManager } from "./audio/MusicManager";
import { characters, characterIds } from "./characters";
import { allRoutines } from "./animations/routines";
import { autoPlayPhrases, generateAutoPlaySteps } from "./animations/autoPlay";
import { scenes } from "./scenes";
import Splash from "./components/Splash";
import Stage from "./components/Stage";
import BottomBar from "./components/BottomBar";
import "./styles/animations.css";

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [state, dispatch] = useAppState();
  const [animStyles, setAnimStyles] = useState<
    Record<CharacterId, CSSProperties>
  >(
    () =>
      Object.fromEntries(characterIds.map((id) => [id, {}])) as Record<
        CharacterId,
        CSSProperties
      >,
  );
  const [overlays, setOverlays] = useState<Record<CharacterId, string | null>>(
    () =>
      Object.fromEntries(characterIds.map((id) => [id, null])) as Record<
        CharacterId,
        string | null
      >,
  );
  const timeoutsRef = useRef<Record<string, number[]>>({});

  // ── Audio Unlock (splash tap) ──
  const handleStart = useCallback(() => {
    audioManager.unlock();
    voiceManager.unlockSpeech();
    synthManager.init();

    // Set up speaking callback
    voiceManager.setSpeakingCallback((speaking) => {
      dispatch({ type: "SET_SPEAKING", value: speaking });
    });

    // Say hello with the full conversational greeting
    voiceManager.speak("hello-kaia");

    setStarted(true);
  }, [dispatch]);

  // ── Play animation routine on a character ──
  const playRoutine = useCallback(
    (charId: CharacterId, steps: AnimationStep[]) => {
      // Cancel any running animation
      const existing = timeoutsRef.current[charId];
      if (existing) existing.forEach(clearTimeout);
      timeoutsRef.current[charId] = [];

      dispatch({ type: "SET_BUSY", id: charId, busy: true });

      let elapsed = 0;
      steps.forEach((step) => {
        const tid = window.setTimeout(() => {
          // Apply styles
          setAnimStyles((prev) => ({ ...prev, [charId]: step.style }));

          // Sound effect
          if (step.sfx) step.sfx();

          // Voice
          if (step.voice) {
            voiceManager.speak(
              step.voice,
              step.voice,
              step.voicePitch,
              step.voiceRate,
            );
          }

          // Overlay
          if (step.overlay) {
            setOverlays((prev) => ({ ...prev, [charId]: step.overlay! }));
          } else {
            setOverlays((prev) => ({ ...prev, [charId]: null }));
          }
        }, elapsed);

        timeoutsRef.current[charId].push(tid);
        elapsed += step.duration;
      });

      // Reset after animation completes
      const resetTid = window.setTimeout(() => {
        setAnimStyles((prev) => ({
          ...prev,
          [charId]: { transform: "translate(-50%, 0)", opacity: "1" },
        }));
        setOverlays((prev) => ({ ...prev, [charId]: null }));
        dispatch({ type: "SET_BUSY", id: charId, busy: false });
      }, elapsed);
      timeoutsRef.current[charId].push(resetTid);
    },
    [dispatch],
  );

  // ── Character tap handler ──
  const handleCharacterTap = useCallback(
    (id: CharacterId) => {
      if (!synthManager.ready || state.characterBusy[id]) return;
      synthManager.characterVoice(id);
      const routine = pickRandom(allRoutines);
      playRoutine(id, routine());
    },
    [state.characterBusy, playRoutine],
  );

  // ── Action button handler (all characters perform same routine) ──
  const handleAction = useCallback(
    (actionIndex: number) => {
      if (!synthManager.ready) return;
      dispatch({ type: "SET_LEARNING", mode: null });
      const routine = allRoutines[actionIndex];
      characterIds.forEach((id, j) => {
        setTimeout(() => {
          dispatch({ type: "SET_BUSY", id, busy: true });
          playRoutine(id, routine());
        }, j * 200);
      });
    },
    [dispatch, playRoutine],
  );

  // ── Scene change ──
  const handleSceneChange = useCallback(
    (index: number) => {
      if (synthManager.ready) synthManager.tap(0.5);
      dispatch({ type: "SET_LEARNING", mode: null });
      dispatch({ type: "SET_SCENE", index });
    },
    [dispatch],
  );

  // ── Learning mode ──
  const handleLearningChange = useCallback(
    (mode: LearningMode) => {
      dispatch({ type: "SET_LEARNING", mode });
    },
    [dispatch],
  );

  // ── Music toggle ──
  const handleMusicToggle = useCallback(
    (mode: "normal" | "reggaeton") => {
      if (!synthManager.ready) return;
      const newMode = musicManager.toggle(mode);
      dispatch({ type: "SET_MUSIC", mode: newMode as MusicMode });
      if (newMode === "normal") {
        voiceManager.speak("music-start");
      } else if (newMode === "reggaeton") {
        voiceManager.speak("dj-bunny");
      }
    },
    [dispatch],
  );

  // ── Auto-play: characters perform routines every 10s ──
  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => {
      if (state.learningMode || !synthManager.ready) return;
      const available = characterIds.filter((c) => !state.characterBusy[c]);
      if (!available.length) return;
      const charId = pickRandom(available);
      const phrase = pickRandom(autoPlayPhrases);
      playRoutine(charId, generateAutoPlaySteps(phrase));
    }, 10000);
    return () => clearInterval(id);
  }, [started, state.learningMode, state.characterBusy, playRoutine]);

  // ── Auto-play: scene rotation every 30s ──
  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => {
      if (state.learningMode) return;
      dispatch({
        type: "SET_SCENE",
        index: (state.sceneIndex + 1) % scenes.length,
      });
    }, 30000);
    return () => clearInterval(id);
  }, [started, state.learningMode, state.sceneIndex, dispatch]);

  // ── Character floating movement every 3s ──
  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => {
      characterIds.forEach((charId) => {
        if (state.characterBusy[charId]) return;
        const meta = characters.find((c) => c.id === charId)!;
        const pos = state.characterPositions[charId];
        const newX = Math.max(
          meta.bounds.minX,
          Math.min(meta.bounds.maxX, pos.x + (Math.random() - 0.5) * 5),
        );
        const newY = Math.max(
          meta.bounds.minY,
          Math.min(meta.bounds.maxY, pos.y + (Math.random() - 0.5) * 5),
        );
        dispatch({
          type: "UPDATE_POSITION",
          id: charId,
          position: { x: newX, y: newY },
        });
      });
    }, 3000);
    return () => clearInterval(id);
  }, [started, state.characterBusy, state.characterPositions, dispatch]);

  // ── Render ──
  if (!started) {
    return <Splash onStart={handleStart} />;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stage
        state={state}
        dispatch={dispatch}
        characterAnimStyles={animStyles}
        characterOverlays={overlays}
        onCharacterTap={handleCharacterTap}
      />
      <BottomBar
        currentScene={state.sceneIndex}
        onSceneChange={handleSceneChange}
        onAction={handleAction}
        learningMode={state.learningMode}
        onLearningChange={handleLearningChange}
        musicMode={state.musicMode}
        onMusicToggle={handleMusicToggle}
      />
    </div>
  );
}
