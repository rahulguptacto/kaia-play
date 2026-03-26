import { useReducer } from "react";
import type { AppState, AppAction, CharacterId } from "../types";
import { characters } from "../characters";

const initialPositions: Record<CharacterId, { x: number; y: number }> =
  {} as Record<CharacterId, { x: number; y: number }>;
const initialBusy: Record<CharacterId, boolean> = {} as Record<
  CharacterId,
  boolean
>;

characters.forEach((c) => {
  initialPositions[c.id] = { ...c.startPosition };
  initialBusy[c.id] = false;
});

const initialState: AppState = {
  sceneIndex: 0,
  learningMode: null,
  musicMode: null,
  isSpeaking: false,
  tapCount: 0,
  stars: 0,
  countValue: 0,
  characterBusy: initialBusy,
  characterPositions: initialPositions,
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_SCENE":
      return { ...state, sceneIndex: action.index };
    case "SET_LEARNING":
      return { ...state, learningMode: action.mode };
    case "SET_MUSIC":
      return { ...state, musicMode: action.mode };
    case "SET_SPEAKING":
      return { ...state, isSpeaking: action.value };
    case "TAP":
      return { ...state, tapCount: state.tapCount + 1 };
    case "ADD_STAR":
      return { ...state, stars: state.stars + 1 };
    case "SET_COUNT":
      return { ...state, countValue: action.value };
    case "SET_BUSY":
      return {
        ...state,
        characterBusy: {
          ...state.characterBusy,
          [action.id]: action.busy,
        },
      };
    case "UPDATE_POSITION":
      return {
        ...state,
        characterPositions: {
          ...state.characterPositions,
          [action.id]: action.position,
        },
      };
    default:
      return state;
  }
}

export function useAppState() {
  return useReducer(reducer, initialState);
}
