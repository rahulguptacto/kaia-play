#!/usr/bin/env npx tsx
/**
 * Generate voice clips using ElevenLabs API.
 *
 * Usage:
 *   ELEVENLABS_API_KEY=your_key npx tsx scripts/generate-voices-elevenlabs.ts
 *
 * Or set the API key in .env.local:
 *   ELEVENLABS_API_KEY=sk_xxxxxxxxxxxxxxxx
 *
 * This reads the voice manifest and generates m4a clips for each entry.
 * Existing clips are skipped unless --force is passed.
 */

import fs from "fs";
import path from "path";

const API_KEY = process.env.ELEVENLABS_API_KEY;
const OUT_DIR = path.join(process.cwd(), "public/audio/voices");
const FORCE = process.argv.includes("--force");

// ── Voice IDs ──
// Browse voices at https://elevenlabs.io/voice-library
// Set these to your preferred voices after browsing
const FEMALE_VOICE_ID =
  process.env.ELEVENLABS_FEMALE_VOICE || "EXAVITQu4vr4xnSDxMaL"; // "Bella" — warm, friendly
const MALE_VOICE_ID =
  process.env.ELEVENLABS_MALE_VOICE || "ErXwobaYiN019PkySvjV"; // "Antoni" — friendly male

// Keys that should use the male voice (DJ Bunny)
const MALE_KEYS = ["dj-bunny"];

// ── Voice manifest (imported at runtime) ──
interface VoiceEntry {
  file: string;
  text: string;
}

async function loadManifest(): Promise<Record<string, VoiceEntry>> {
  // We can't import TS directly, so parse the manifest
  const manifestPath = path.join(process.cwd(), "src/audio/voiceManifest.ts");
  const content = fs.readFileSync(manifestPath, "utf-8");

  const entries: Record<string, VoiceEntry> = {};
  const regex =
    /"([^"]+)":\s*entry\(\s*"([^"]+)",\s*"([^"]+(?:\\.[^"]*)*)",?\s*\)/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const [, key, filename, text] = match;
    entries[key] = {
      file: `/audio/voices/${filename}`,
      text: text.replace(/\\'/g, "'"),
    };
  }

  return entries;
}

async function generateClip(
  key: string,
  text: string,
  filename: string,
  voiceId: string,
): Promise<void> {
  const outPath = path.join(OUT_DIR, filename);

  if (!FORCE && fs.existsSync(outPath) && fs.statSync(outPath).size > 100) {
    console.log(`  Skip (exists): ${filename}`);
    return;
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY!,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_turbo_v2_5",
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.85,
          style: 0.4,
          use_speaker_boost: true,
        },
      }),
    },
  );

  if (!response.ok) {
    const err = await response.text();
    console.error(`  ERROR ${key}: ${response.status} — ${err}`);
    return;
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  // ElevenLabs returns MP3 — save as m4a extension for consistency
  // (browsers play both fine, and our manifest expects .m4a)
  fs.writeFileSync(outPath, buffer);
  console.log(
    `  Generated: ${filename} (${(buffer.length / 1024).toFixed(1)}KB)`,
  );
}

async function main() {
  if (!API_KEY) {
    console.error(
      "\nERROR: ELEVENLABS_API_KEY not set.\n\n" +
        "Usage:\n" +
        "  ELEVENLABS_API_KEY=your_key npx tsx scripts/generate-voices-elevenlabs.ts\n\n" +
        "Get your API key at: https://elevenlabs.io/app/settings/api-keys\n" +
        "Free tier includes enough characters for all ~130 clips.\n",
    );
    process.exit(1);
  }

  console.log("Loading voice manifest...");
  const manifest = await loadManifest();
  const keys = Object.keys(manifest);
  console.log(`Found ${keys.length} voice entries.\n`);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  let generated = 0;
  let skipped = 0;
  let errors = 0;

  for (const key of keys) {
    const entry = manifest[key];
    const filename = entry.file.split("/").pop()!;
    const voiceId = MALE_KEYS.includes(key) ? MALE_VOICE_ID : FEMALE_VOICE_ID;

    try {
      const outPath = path.join(OUT_DIR, filename);
      if (!FORCE && fs.existsSync(outPath) && fs.statSync(outPath).size > 100) {
        skipped++;
        continue;
      }
      await generateClip(key, entry.text, filename, voiceId);
      generated++;

      // Rate limiting — ElevenLabs free tier: ~3 requests/second
      await new Promise((r) => setTimeout(r, 400));
    } catch (err) {
      console.error(`  FAILED: ${key} — ${err}`);
      errors++;
    }
  }

  console.log(`\nDone!`);
  console.log(`  Generated: ${generated}`);
  console.log(`  Skipped (existing): ${skipped}`);
  console.log(`  Errors: ${errors}`);
  console.log(`  Total clips: ${fs.readdirSync(OUT_DIR).length}`);
  console.log(`  Directory: ${OUT_DIR}`);
}

main().catch(console.error);
