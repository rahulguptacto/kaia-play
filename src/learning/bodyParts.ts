export interface BodyPartDef {
  name: string;
  emoji: string;
  phrase: string;
  voiceKey: string;
}

export const bodyParts: BodyPartDef[] = [
  {
    name: "Head",
    emoji: "🧠",
    phrase: "Where's your head?",
    voiceKey: "body-head",
  },
  {
    name: "Eyes",
    emoji: "👀",
    phrase: "Where are your eyes?",
    voiceKey: "body-eyes",
  },
  {
    name: "Nose",
    emoji: "👃",
    phrase: "Where's your nose?",
    voiceKey: "body-nose",
  },
  {
    name: "Mouth",
    emoji: "👄",
    phrase: "Where's your mouth?",
    voiceKey: "body-mouth",
  },
  {
    name: "Ears",
    emoji: "👂",
    phrase: "Where are your ears?",
    voiceKey: "body-ears",
  },
  {
    name: "Hands",
    emoji: "🤲",
    phrase: "Show me your hands!",
    voiceKey: "body-hands",
  },
  {
    name: "Feet",
    emoji: "🦶",
    phrase: "Where are your feet?",
    voiceKey: "body-feet",
  },
  {
    name: "Tummy",
    emoji: "🫃",
    phrase: "Where's your tummy?",
    voiceKey: "body-tummy",
  },
];
