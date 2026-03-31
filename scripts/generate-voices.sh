#!/bin/bash
# Generate voice clips using macOS say + afconvert (fallback quality)
# For production quality, use generate-voices-elevenlabs.ts instead.

OUT="public/audio/voices"
mkdir -p "$OUT"

gen() {
  local file="$1"
  local text="$2"
  local voice="${3:-Samantha}"
  local rate="${4:-180}"

  if [ -f "$OUT/$file" ]; then
    return
  fi

  say -v "$voice" -r "$rate" -o "/tmp/kaia_voice.aiff" "$text"
  afconvert -f m4af -d aac "/tmp/kaia_voice.aiff" "$OUT/$file" 2>/dev/null
  rm -f "/tmp/kaia_voice.aiff"
  echo "  Generated: $file"
}

echo "Generating voice clips (macOS fallback)..."
echo "For production quality, use: ELEVENLABS_API_KEY=xxx npx tsx scripts/generate-voices-elevenlabs.ts"
echo ""

# Greetings
gen "hello-kaia.m4a" "Hiii Kaia! Welcome to your world! Are you ready to play?" Samantha 170
gen "hi-kaia.m4a" "Hey there Kaia! I'm so happy to see you!" Samantha 175
gen "welcome-back.m4a" "Yaaay, Kaia's back! I missed you! Let's have fun!" Samantha 175
gen "lets-play.m4a" "Okay Kaia, let's go! Touch anything you want!" Samantha 180

# Peekaboo
gen "peek-hiding-1.m4a" "Where did I gooo? Can you find me Kaia?" Samantha 170
gen "peek-hiding-2.m4a" "Uh oh! I'm hiiiiding! Where am I?" Samantha 175
gen "peek-hiding-3.m4a" "Shhh, I'm hiding! Don't tell anyone!" Samantha 170
gen "peek-reveal-1.m4a" "PEEK A BOO! Hahaha, there you are Kaia!" Samantha 185
gen "peek-reveal-2.m4a" "BOO! Hehe, I see you! Did I surprise you?" Samantha 180
gen "peek-reveal-3.m4a" "Here I am! Ta daaa! Were you looking for me?" Samantha 180
gen "peek-reveal-4.m4a" "SURPRISE! Hahaha, I was here the whole time!" Samantha 185

# Dance
gen "dance-start-1.m4a" "Ooh ooh ooh! Dance party Kaia! Shake shake shake!" Samantha 185
gen "dance-start-2.m4a" "Let's dance together Kaia! Move your body, wiggle wiggle!" Samantha 180
gen "dance-start-3.m4a" "Dance time! Can you dance with me? Shake your hands!" Samantha 180
gen "dance-whee.m4a" "Wheeeee! You're such a good dancer Kaia!" Samantha 180
gen "dance-end.m4a" "Wooo! That was so much fun! Great dancing!" Samantha 180

# Jump
gen "jump-start-1.m4a" "Ready? Set? JUMP! Up up up you go!" Samantha 185
gen "jump-start-2.m4a" "Let's jump sooo high! One, two, three, JUMP!" Samantha 180
gen "jump-start-3.m4a" "Boing boing boing! Can you jump like a bunny Kaia?" Samantha 180
gen "jump-whee.m4a" "Wheeeee! So high! You're flying Kaia!" Samantha 185
gen "jump-land.m4a" "And down we go! Boom! Hahaha!" Samantha 180

# Spin
gen "spin-start-1.m4a" "Round and round and round we go! Wheee!" Samantha 180
gen "spin-start-2.m4a" "Spin spin spin! Like a little ballerina!" Samantha 180
gen "spin-dizzy.m4a" "Ohhh, I'm getting dizzy! Hahaha, so silly!" Samantha 175
gen "spin-end.m4a" "Wooo, that was fast! My head is spinning!" Samantha 175

# Party
gen "party-start-1.m4a" "YAYYY! Party time Kaia! Let's celebrate!" Samantha 185
gen "party-start-2.m4a" "Woo hoo! It's a party! Everybody dance!" Samantha 185
gen "party-yay.m4a" "Yayyy Kaia! You are AMAZING! I love you so much!" Samantha 180
gen "party-confetti.m4a" "Confetti! Sparkles! Wooo, so pretty!" Samantha 185

# Praise
gen "praise-amazing.m4a" "Oh my goodness, AMAZING Kaia! You did it!" Samantha 180
gen "praise-wonderful.m4a" "That is SO wonderful! I'm so proud of you!" Samantha 175
gen "praise-superstar.m4a" "You're a superstar Kaia! Give yourself a big hug!" Samantha 175
gen "praise-smart.m4a" "Wow, you're so smart! You got it right!" Samantha 180
gen "praise-try-again.m4a" "Hmm, not quite! That's okay, let's try again! You can do it!" Samantha 175
gen "praise-yay-kaia.m4a" "Yaaay Kaia! Clap your hands with me!" Samantha 180
gen "praise-wow.m4a" "Wooow! Look at that! So beautiful!" Samantha 175
gen "praise-good-job.m4a" "Good job Kaia! You're getting so good at this!" Samantha 175

# Auto-play
gen "auto-love.m4a" "Hi Kaia! I love you sooo much! You're my favorite!" Samantha 170
gen "auto-twinkle.m4a" "Twinkle twinkle little star, how I wonder what you are!" Samantha 165
gen "auto-animals.m4a" "Old MacDonald had a farm, and on his farm he had a COW! Moooo!" Samantha 170
gen "auto-abc.m4a" "A B C D E F G, H I J K L M N O P!" Samantha 170
gen "auto-head-shoulders.m4a" "Head, shoulders, knees and toes, knees and toes!" Samantha 170
gen "auto-superstar.m4a" "Kaia is a superstar! The most amazing girl in the whole world!" Samantha 170
gen "auto-counting.m4a" "Let's count together! One, two, three, four, five!" Samantha 170
gen "auto-row.m4a" "Row row row your boat, gently down the stream!" Samantha 170
gen "auto-baa.m4a" "Baa baa black sheep, have you any wool?" Samantha 170
gen "auto-itsy.m4a" "The itsy bitsy spider climbed up the water spout!" Samantha 170

# Colors
gen "color-intro.m4a" "Ooh, let's play with colors! Colors are everywhere!" Samantha 175
gen "tap-the-red.m4a" "Can you find the RED one? Red is like a fire truck! Nee-naw nee-naw!" Samantha 175
gen "tap-the-blue.m4a" "Where is the BLUE one? Blue like the sky! Look up, the sky is blue!" Samantha 175
gen "tap-the-green.m4a" "Find the GREEN one! Green like the grass and the trees!" Samantha 175
gen "tap-the-yellow.m4a" "Can you tap the YELLOW one? Yellow like the sun! So bright!" Samantha 175
gen "tap-the-purple.m4a" "Where's the PURPLE one? Purple like a grape! Yummy!" Samantha 175
gen "tap-the-orange.m4a" "Find the ORANGE one! Orange like an orange! And a pumpkin!" Samantha 175
gen "tap-the-pink.m4a" "Tap the PINK one! Pink like a flamingo! Pretty pretty pink!" Samantha 175
gen "tap-the-white.m4a" "Where is the WHITE one? White like fluffy clouds! And snow!" Samantha 175
gen "tap-the-black.m4a" "Can you find the BLACK one? Black like nighttime! Shh, everyone's sleeping!" Samantha 170
gen "tap-the-brown.m4a" "Find the BROWN one! Brown like chocolate! Mmm, yummy!" Samantha 175
gen "yes-red.m4a" "YES! That's RED! Great job Kaia! Red like a fire truck, nee-naw!" Samantha 180
gen "yes-blue.m4a" "YES! That's BLUE! So smart Kaia! Blue like the beautiful sky!" Samantha 180
gen "yes-green.m4a" "YES! That's GREEN! Amazing! Green like the trees, whoosh whoosh!" Samantha 180
gen "yes-yellow.m4a" "YES! YELLOW! You found it! Bright like the sunshine!" Samantha 180
gen "yes-purple.m4a" "YES! PURPLE! Wonderful Kaia! Purple like yummy grapes!" Samantha 180
gen "yes-orange.m4a" "YES! ORANGE! You got it! Orange like a big round orange!" Samantha 180
gen "yes-pink.m4a" "YES! PINK! Beautiful! Pretty pretty pink!" Samantha 185
gen "yes-white.m4a" "YES! WHITE! So smart! White like soft fluffy clouds!" Samantha 180
gen "yes-black.m4a" "YES! BLACK! Great job! Black like the nighttime sky with stars!" Samantha 180
gen "yes-brown.m4a" "YES! BROWN! You found it! Brown like chocolate, mmm!" Samantha 180
gen "wrong-color.m4a" "Hmm, not quite! That's okay, let's try again! You can do it!" Samantha 175

# Animals
gen "animal-intro.m4a" "Let's meet some animal friends! What sound do they make?" Samantha 175
gen "animal-cow.m4a" "Look, it's a COW! The cow says MOOOO! Can you say moo Kaia? Mooooo!" Samantha 170
gen "animal-dog.m4a" "It's a DOGGY! Woof woof woof! Can you bark like a doggy? Woof woof!" Samantha 175
gen "animal-cat.m4a" "Aww, a KITTY CAT! Meow meow! So cute! Can you say meow?" Samantha 175
gen "animal-duck.m4a" "Look, a DUCK! Quack quack quack! Ducks go quack quack in the water!" Samantha 175
gen "animal-pig.m4a" "A little PIGGY! Oink oink oink! Piggies love to play in the mud! Splash!" Samantha 175
gen "animal-sheep.m4a" "It's a SHEEP! Baaaa baaaa! Sheep are so fluffy and soft!" Samantha 175
gen "animal-lion.m4a" "ROARRR! It's a LION! The king of the jungle! Roarrr! Can you roar Kaia?" Samantha 175
gen "animal-frog.m4a" "Ribbit ribbit! It's a FROG! Frogs go hop hop hop! Jump like a frog!" Samantha 175
gen "animal-horse.m4a" "Look, a HORSE! Neigh neigh! Horses go clip clop clip clop!" Samantha 175
gen "animal-chicken.m4a" "It's a CHICKEN! Bawk bawk bawk ba-GAWK! Chickens are so funny!" Samantha 180
gen "animal-owl.m4a" "Whooo! It's an OWL! The owl says hoo hoo! Owls come out at nighttime!" Samantha 170
gen "animal-elephant.m4a" "It's a big ELEPHANT! BRRRRR! Elephants are sooo big and they squirt water! Splash!" Samantha 170

# Counting
gen "count-intro.m4a" "Let's count together Kaia! Every time you tap, we count one more! Ready?" Samantha 175
gen "count-1.m4a" "ONE! Woo, one tap! Keep going Kaia!" Samantha 180
gen "count-2.m4a" "TWO! That's two! You're doing great!" Samantha 180
gen "count-3.m4a" "THREE! Three taps! Wow, so many!" Samantha 180
gen "count-4.m4a" "FOUR! Four already! You're so fast!" Samantha 180
gen "count-5.m4a" "FIVE! Halfway there! High five!" Samantha 185
gen "count-6.m4a" "SIX! Six taps! Almost there Kaia!" Samantha 180
gen "count-7.m4a" "SEVEN! Seven! Keep going, you can do it!" Samantha 180
gen "count-8.m4a" "EIGHT! Eight taps! So close!" Samantha 180
gen "count-9.m4a" "NINE! Nine! One more Kaia, one more!" Samantha 180
gen "count-10.m4a" "TEN! YAAAY! You counted all the way to TEN! I'm so proud of you Kaia!" Samantha 175

# Shapes
gen "shape-intro.m4a" "Let's learn about shapes! Shapes are all around us!" Samantha 175
gen "tap-the-circle.m4a" "Can you find the CIRCLE? Circles are round, like a ball! Round and round!" Samantha 175
gen "tap-the-square.m4a" "Where's the SQUARE? Squares have four sides, all the same! Like a window!" Samantha 175
gen "tap-the-triangle.m4a" "Find the TRIANGLE! Triangles have three pointy corners! Like a mountain!" Samantha 175
gen "tap-the-star.m4a" "Where's the STAR? Stars twinkle in the sky at night! Twinkle twinkle!" Samantha 175
gen "tap-the-heart.m4a" "Can you find the HEART? Hearts mean love! I love you Kaia!" Samantha 175
gen "tap-the-diamond.m4a" "Find the DIAMOND! Diamonds are so sparkly and beautiful!" Samantha 175
gen "yes-circle.m4a" "YES! That's a CIRCLE! Round like a ball! Great job Kaia!" Samantha 180
gen "yes-square.m4a" "YES! A SQUARE! Four sides! So smart Kaia!" Samantha 180
gen "yes-triangle.m4a" "YES! A TRIANGLE! Three pointy corners! Amazing!" Samantha 180
gen "yes-star.m4a" "YES! A STAR! Twinkle twinkle! Wonderful!" Samantha 185
gen "yes-heart.m4a" "YES! A HEART! Full of love! I love you!" Samantha 180
gen "yes-diamond.m4a" "YES! A DIAMOND! Sparkly! Beautiful job!" Samantha 180

# Body parts
gen "body-intro.m4a" "Let's find our body parts! Touch your body when you hear it!" Samantha 175
gen "body-head.m4a" "Where's your HEAD? Can you touch your head? Touch the top of your head!" Samantha 175
gen "body-eyes.m4a" "Where are your EYES? Blink blink! Can you blink your eyes Kaia?" Samantha 175
gen "body-nose.m4a" "Where's your NOSE? Boop! Can you touch your nose? Boop!" Samantha 175
gen "body-mouth.m4a" "Where's your MOUTH? Open wide! Ahhh! Can you say ahhh?" Samantha 175
gen "body-ears.m4a" "Where are your EARS? Can you wiggle your ears? I can hear you!" Samantha 175
gen "body-hands.m4a" "Show me your HANDS! Wave your hands! Wave wave wave!" Samantha 180
gen "body-feet.m4a" "Where are your FEET? Stomp stomp stomp! Stamp your feet!" Samantha 180
gen "body-tummy.m4a" "Where's your TUMMY? Can you pat your tummy? Pat pat pat!" Samantha 175

# Music
gen "music-start.m4a" "Music time! Let's dance and sing together Kaia!" Samantha 180
gen "dj-bunny.m4a" "YO! DJ Bunny in the HOUSE! Let's get this party STARTED! Boom boom!" Ralph 185
gen "music-stop.m4a" "Music's taking a little break! But we can start it again anytime!" Samantha 175

echo ""
echo "Done! Generated $(ls -1 $OUT/*.m4a 2>/dev/null | wc -l) voice clips."
echo "Total size: $(du -sh $OUT | cut -f1)"
