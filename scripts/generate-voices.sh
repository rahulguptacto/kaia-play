#!/bin/bash
# Generate voice clips for Kaia's World using macOS say + afconvert
# Female voice: Samantha, Male voice: Ralph (for DJ Bunny)

OUT="public/audio/voices"
mkdir -p "$OUT"

# Generate a voice clip: gen <filename> <text> [voice]
gen() {
  local file="$1"
  local text="$2"
  local voice="${3:-Samantha}"
  local rate="${4:-200}"

  if [ -f "$OUT/$file" ]; then
    return
  fi

  say -v "$voice" -r "$rate" -o "/tmp/kaia_voice.aiff" "$text"
  afconvert -f m4af -d aac "/tmp/kaia_voice.aiff" "$OUT/$file"
  rm -f "/tmp/kaia_voice.aiff"
  echo "  Generated: $file"
}

echo "Generating voice clips..."

# Greetings
gen "hello-kaia.m4a" "Hello Kaia!" Samantha 190
gen "hi-kaia.m4a" "Hi Kaia!" Samantha 200
gen "welcome.m4a" "Welcome!" Samantha 190
gen "hi-there.m4a" "Hi there!" Samantha 200
gen "i-love-you.m4a" "I love you!" Samantha 180

# Peekaboo
gen "peek-a-boo.m4a" "Peek a boo!" Samantha 210
gen "where-am-i.m4a" "Where am I?" Samantha 200
gen "im-hiding.m4a" "I'm hiding!" Samantha 200
gen "here-i-am.m4a" "Here I am!" Samantha 220
gen "boo.m4a" "Boo!" Samantha 210
gen "surprise.m4a" "Surprise!" Samantha 220
gen "i-see-you-kaia.m4a" "I see you Kaia!" Samantha 210

# Dance
gen "dance-dance-dance.m4a" "Dance dance dance!" Samantha 220
gen "shake-shake-shake.m4a" "Shake shake shake!" Samantha 220
gen "lets-dance-kaia.m4a" "Let's dance Kaia!" Samantha 210
gen "wiggle-wiggle.m4a" "Wiggle wiggle!" Samantha 220

# Jump
gen "jump-jump-jump.m4a" "Jump jump jump!" Samantha 220
gen "boing-boing.m4a" "Boing boing!" Samantha 210
gen "up-up-up.m4a" "Up up up!" Samantha 220
gen "wheee-so-high.m4a" "Wheee, so high!" Samantha 210

# Spin
gen "round-and-round.m4a" "Round and round!" Samantha 210
gen "spin-spin-spin.m4a" "Spin spin spin!" Samantha 220
gen "dizzy.m4a" "Dizzy!" Samantha 200
gen "wheee-spinning.m4a" "Wheee, spinning!" Samantha 210

# Party
gen "yay-party-time.m4a" "Yay! Party time!" Samantha 210
gen "hooray.m4a" "Hooray!" Samantha 210
gen "we-did-it.m4a" "We did it!" Samantha 210
gen "amazing.m4a" "Amazing!" Samantha 200

# Exclamations
gen "wheee.m4a" "Wheee!" Samantha 220
gen "yay.m4a" "Yay!" Samantha 220
gen "superstar.m4a" "Superstar!" Samantha 200
gen "wonderful.m4a" "Wonderful!" Samantha 200
gen "yay-kaia.m4a" "Yay Kaia!" Samantha 210
gen "great-job-kaia.m4a" "Great job Kaia!" Samantha 200
gen "you-did-it.m4a" "You did it!" Samantha 210
gen "kaia-is-a-superstar.m4a" "Kaia is a superstar!" Samantha 200

# Auto-play phrases
gen "hi-kaia-i-love-you.m4a" "Hi Kaia! I love you!" Samantha 190
gen "twinkle-twinkle.m4a" "Twinkle twinkle little star!" Samantha 180
gen "animal-sounds-mixed.m4a" "Moo! Quack quack! Woof woof!" Samantha 200
gen "abcdefg.m4a" "A, B, C, D, E, F, G!" Samantha 190
gen "head-shoulders.m4a" "Head, shoulders, knees and toes!" Samantha 190
gen "old-macdonald.m4a" "Old MacDonald had a farm, E I E I O!" Samantha 180
gen "one-two-three-four-five.m4a" "One, two, three, four, five!" Samantha 190
gen "row-row-row.m4a" "Row row row your boat!" Samantha 190
gen "baa-baa-black-sheep.m4a" "Baa baa black sheep!" Samantha 190

# Colors - prompts
gen "tap-the-red.m4a" "Tap the red one!" Samantha 200
gen "tap-the-blue.m4a" "Tap the blue one!" Samantha 200
gen "tap-the-green.m4a" "Tap the green one!" Samantha 200
gen "tap-the-yellow.m4a" "Tap the yellow one!" Samantha 200
gen "tap-the-purple.m4a" "Tap the purple one!" Samantha 200
gen "tap-the-orange.m4a" "Tap the orange one!" Samantha 200
gen "tap-the-pink.m4a" "Tap the pink one!" Samantha 200
gen "tap-the-white.m4a" "Tap the white one!" Samantha 200
gen "tap-the-black.m4a" "Tap the black one!" Samantha 200
gen "tap-the-brown.m4a" "Tap the brown one!" Samantha 200

# Colors - correct
gen "yes-thats-red.m4a" "Yes! That's red! Great job Kaia!" Samantha 200
gen "yes-thats-blue.m4a" "Yes! That's blue! Great job Kaia!" Samantha 200
gen "yes-thats-green.m4a" "Yes! That's green! Great job Kaia!" Samantha 200
gen "yes-thats-yellow.m4a" "Yes! That's yellow! Great job Kaia!" Samantha 200
gen "yes-thats-purple.m4a" "Yes! That's purple! Great job Kaia!" Samantha 200
gen "yes-thats-orange.m4a" "Yes! That's orange! Great job Kaia!" Samantha 200
gen "yes-thats-pink.m4a" "Yes! That's pink! Great job Kaia!" Samantha 200
gen "yes-thats-white.m4a" "Yes! That's white! Great job Kaia!" Samantha 200
gen "yes-thats-black.m4a" "Yes! That's black! Great job Kaia!" Samantha 200
gen "yes-thats-brown.m4a" "Yes! That's brown! Great job Kaia!" Samantha 200

# Animals
gen "animal-cow.m4a" "The cow says, Moooo!" Samantha 190
gen "animal-dog.m4a" "The dog says, Woof woof!" Samantha 190
gen "animal-cat.m4a" "The cat says, Meow!" Samantha 190
gen "animal-duck.m4a" "The duck says, Quack quack!" Samantha 190
gen "animal-pig.m4a" "The pig says, Oink oink!" Samantha 190
gen "animal-sheep.m4a" "The sheep says, Baaa!" Samantha 190
gen "animal-lion.m4a" "The lion says, Roarrr!" Samantha 190
gen "animal-frog.m4a" "The frog says, Ribbit!" Samantha 190
gen "animal-horse.m4a" "The horse says, Neigh!" Samantha 190
gen "animal-chicken.m4a" "The chicken says, Bawk bawk!" Samantha 190
gen "animal-owl.m4a" "The owl says, Hoo hoo!" Samantha 190
gen "animal-elephant.m4a" "The elephant goes, Brrrr!" Samantha 190

# Counting
gen "lets-count.m4a" "Let's count! Tap the screen!" Samantha 200
gen "count-1.m4a" "One!" Samantha 210
gen "count-2.m4a" "Two!" Samantha 210
gen "count-3.m4a" "Three!" Samantha 210
gen "count-4.m4a" "Four!" Samantha 210
gen "count-5.m4a" "Five!" Samantha 210
gen "count-6.m4a" "Six!" Samantha 210
gen "count-7.m4a" "Seven!" Samantha 210
gen "count-8.m4a" "Eight!" Samantha 210
gen "count-9.m4a" "Nine!" Samantha 210
gen "count-10.m4a" "Ten!" Samantha 210
gen "yay-counted-to-ten.m4a" "Yay! You counted to ten!" Samantha 200

# Shapes
gen "tap-the-circle.m4a" "Tap the circle!" Samantha 200
gen "tap-the-square.m4a" "Tap the square!" Samantha 200
gen "tap-the-triangle.m4a" "Tap the triangle!" Samantha 200
gen "tap-the-star.m4a" "Tap the star!" Samantha 200
gen "tap-the-heart.m4a" "Tap the heart!" Samantha 200
gen "tap-the-diamond.m4a" "Tap the diamond!" Samantha 200
gen "yes-thats-a-circle.m4a" "Yes! That's a circle! Great job!" Samantha 200
gen "yes-thats-a-square.m4a" "Yes! That's a square! Great job!" Samantha 200
gen "yes-thats-a-triangle.m4a" "Yes! That's a triangle! Great job!" Samantha 200
gen "yes-thats-a-star.m4a" "Yes! That's a star! Great job!" Samantha 200
gen "yes-thats-a-heart.m4a" "Yes! That's a heart! Great job!" Samantha 200
gen "yes-thats-a-diamond.m4a" "Yes! That's a diamond! Great job!" Samantha 200

# Body parts
gen "body-head.m4a" "Where's your head?" Samantha 190
gen "body-eyes.m4a" "Where are your eyes?" Samantha 190
gen "body-nose.m4a" "Where's your nose?" Samantha 190
gen "body-mouth.m4a" "Where's your mouth?" Samantha 190
gen "body-ears.m4a" "Where are your ears?" Samantha 190
gen "body-hands.m4a" "Show me your hands!" Samantha 200
gen "body-feet.m4a" "Where are your feet?" Samantha 190
gen "body-tummy.m4a" "Where's your tummy?" Samantha 190

# Music (DJ Bunny uses male voice)
gen "music-time.m4a" "Music time!" Samantha 210
gen "dj-bunny-in-the-house.m4a" "DJ Bunny in the house!" Ralph 200

echo ""
echo "Done! Generated $(ls -1 $OUT/*.mp3 2>/dev/null | wc -l) voice clips."
echo "Total size: $(du -sh $OUT | cut -f1)"
