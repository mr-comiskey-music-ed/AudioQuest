import { Scenario } from '../types/game';

export const mixingScenarios: Scenario[] = [
  {
    id: 'lead-vocals',
    track: 'mixing',
    category: 'instrument',
    title: 'Lead Vocals',
    subtitle: '8 Questions · Dynamic Control, Tone, Mics & Space',
    description: 'Sculpt a crisp, up-front vocal that cuts through the instrumentation without harshness or muddy buildup.',
    iconName: 'vocal-mic',
    accentColor: 'indigo',
    completionTitle: 'You did it! Your lead vocal sounds good! 🎤',
    completionSubtitle: 'Your vocal is dynamic, warm, sitting right on top of the mix with zero sibilance or clutter.',
    questions: [
      {
        id: 'vox-1',
        prompt: 'Which of these will best help you reduce sibilance?',
        contextKicker: 'Question 1 of 8',
        options: [
          { id: 'opt-1', label: 'De-Esser', explanation: 'Correct! A De-Esser acts as a frequency-dependent compressor specifically tuned to attenuate harsh "s", "t", and "ch" sibilance in the 5kHz–8kHz region.', isCorrect: true, soundDemoType: 'de-esser' },
          { id: 'opt-2', label: 'Tape Saturation', explanation: 'Saturation adds upper harmonics and warmth, which can actually accentuate harsh sibilance.', isCorrect: false },
          { id: 'opt-3', label: 'Stereo Chorus', explanation: 'Chorus duplicates and detunes the signal, creating a wider ensemble rather than reducing sibilance.', isCorrect: false },
          { id: 'opt-4', label: 'Hall Reverb', explanation: 'Reverb adds acoustic space reflections, which will smear and reverberate the sibilance.', isCorrect: false }
        ]
      },
      {
        id: 'vox-2',
        prompt: 'Which of these will best help you even out the volume of the vocal?',
        contextKicker: 'Question 2 of 8',
        options: [
          { id: 'opt-1', label: 'Compressor', explanation: 'Correct! A compressor reduces the dynamic range between loud shouts and quiet whispers, creating steady level consistency so quiet syllables match loud passages.', isCorrect: true, soundDemoType: 'compressor' },
          { id: 'opt-2', label: 'Stereo Delay', explanation: 'Delay produces time-delayed echoes, not dynamic volume regulation.', isCorrect: false },
          { id: 'opt-3', label: 'Noise Gate', explanation: 'A gate cuts off signals below a threshold, which will silence quiet vocal passages.', isCorrect: false },
          { id: 'opt-4', label: 'Flanger', explanation: 'A flanger creates comb-filtering swirl, not dynamic leveling.', isCorrect: false }
        ]
      },
      {
        id: 'vox-3',
        prompt: 'Which of these plugins can best help you reduce muddiness?',
        contextKicker: 'Question 3 of 8',
        options: [
          { id: 'opt-1', label: 'Parametric EQ (cut 200-400 Hz)', explanation: 'Correct! Carving out the 200–400Hz frequency pocket removes boxy room resonance and vocal chestiness that naturally accumulates in this range.', isCorrect: true, soundDemoType: 'filter' },
          { id: 'opt-2', label: 'Distortion / Overdrive', explanation: 'Distortion introduces harmonic distortion that increases frequency clutter and thickness.', isCorrect: false },
          { id: 'opt-3', label: 'Peak Limiter', explanation: 'A limiter chops off peak levels but does not address low-mid frequency balance.', isCorrect: false },
          { id: 'opt-4', label: 'Stereo Widener', explanation: 'Stereo imaging spreads frequencies laterally but leaves the low-mid mud intact.', isCorrect: false }
        ]
      },
      {
        id: 'vox-4',
        prompt: 'Which of these will best help you add crunch and upper harmonics to a vocal?',
        contextKicker: 'Question 4 of 8',
        options: [
          { id: 'opt-1', label: 'Tape / Tube Saturation', explanation: 'Correct! Analog tube and tape saturation generates even and odd harmonics, gently clipping peaks to make vocals sound denser and more exciting.', isCorrect: true, soundDemoType: 'saturation' },
          { id: 'opt-2', label: 'Noise Gate', explanation: 'A gate mutes low volume background audio; it does not add harmonics.', isCorrect: false },
          { id: 'opt-3', label: 'Digital Reverb', explanation: 'Reverb simulates acoustic reflections, not harmonic distortion.', isCorrect: false },
          { id: 'opt-4', label: 'De-Esser', explanation: 'A de-esser reduces upper frequencies rather than introducing harmonic crunch.', isCorrect: false }
        ]
      },
      {
        id: 'vox-5',
        prompt: 'Which of these will best help you make one voice sound like it’s being doubled?',
        contextKicker: 'Question 5 of 8',
        options: [
          { id: 'opt-1', label: 'Vocal Doubler / Microshift Chorus', explanation: 'Correct! A vocal doubler or subtle chorus splits the signal, applies a micro-pitch shift (±5 to 15 cents), and modulates delay time (15–30ms) to simulate two distinct takes singing together.', isCorrect: true, soundDemoType: 'chorus' },
          { id: 'opt-2', label: 'Shure SM58 Handheld Dynamic Mic', explanation: 'The SM58 is a rugged live dynamic microphone, not a stereo chorus effect.', isCorrect: false },
          { id: 'opt-3', label: 'Neumann U87 Large Diaphragm Condenser', explanation: 'A U87 captures pristine vocal nuances, but it does not electronically double a single recorded vocal take.', isCorrect: false },
          { id: 'opt-4', label: 'SDC Pencil Condenser Mic', explanation: 'A small-diaphragm pencil mic excels at transient response and acoustic instruments, not vocal chorus thickening.', isCorrect: false }
        ]
      },
      {
        id: 'vox-6',
        prompt: 'Which of these will best help you place the vocal in an acoustic space?',
        contextKicker: 'Question 6 of 8',
        options: [
          { id: 'opt-1', label: 'Reverb (Plate / Hall / Room)', explanation: 'Correct! Reverb recreates natural early reflections and diffuse tails of rooms or halls, positioning the voice in 3D depth.', isCorrect: true, soundDemoType: 'reverb' },
          { id: 'opt-2', label: 'Hard Clipper', explanation: 'Clipping squares off peaks to produce harsh distortion.', isCorrect: false },
          { id: 'opt-3', label: 'Noise Gate', explanation: 'A gate eliminates room bleed rather than modeling room ambience.', isCorrect: false },
          { id: 'opt-4', label: 'Phaser', explanation: 'Phasing uses all-pass filters to create notch sweeping, not physical space.', isCorrect: false }
        ]
      },
      {
        id: 'vox-7',
        prompt: 'Which of these will best help you give the voice space without washing it out?',
        contextKicker: 'Question 7 of 8',
        options: [
          { id: 'opt-1', label: 'Slapback Delay / Ducked Delay', explanation: 'Correct! A synchronized slapback delay (80–120ms) or ducked delay/reverb stays quiet during words and rises in pauses, maintaining upfront lead clarity.', isCorrect: true, soundDemoType: 'gated' },
          { id: 'opt-2', label: '100% Wet Cathedral Reverb', explanation: 'A 100% wet cathedral reverb completely drowns the vocal into an indistinct washed-out bath.', isCorrect: false },
          { id: 'opt-3', label: 'Bitcrusher', explanation: 'Bitcrushing reduces bit-depth and sample rate for lo-fi aliasing artifacts.', isCorrect: false },
          { id: 'opt-4', label: 'Flanger', explanation: 'A flanger imparts dramatic swishy comb filtering.', isCorrect: false }
        ]
      },
      {
        id: 'vox-8',
        prompt: 'Which is the most common polar pattern for a vocal microphone (picks up front, rejects rear)?',
        contextKicker: 'Question 8 of 8',
        options: [
          { id: 'opt-1', label: 'Cardioid Pattern', explanation: 'Correct! Cardioid (heart-shaped) is the industry standard polar pattern, providing maximum sensitivity directly in front (0°) while rejecting 180° rear bleed and room noise.', isCorrect: true },
          { id: 'opt-2', label: 'Omnidirectional Pattern', explanation: 'Omnidirectional picks up audio equally from all 360 degrees without rejection.', isCorrect: false },
          { id: 'opt-3', label: 'Figure-8 Bidirectional Pattern', explanation: 'Figure-8 captures audio equally from front and rear while completely rejecting the sides (90° and 270°).', isCorrect: false },
          { id: 'opt-4', label: 'PZM Boundary Plate', explanation: 'Boundary plates mount flat against walls or floors for acoustic pressure gathering.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'electric-guitar',
    track: 'mixing',
    category: 'instrument',
    title: 'Electric Guitar',
    subtitle: '6 Questions · Amp Noise, Tone Shaper & Space',
    description: 'Control high-gain hum, carve pocket from the bass, and craft stadium-sized spatial dimensions.',
    iconName: 'electric-guitar',
    accentColor: 'amber',
    completionTitle: 'You did it! Your electric guitar sounds good! 🎸',
    completionSubtitle: 'Rumble-free, punchy in the midrange, and spacious without stepping on the rhythm section.',
    questions: [
      {
        id: 'eg-1',
        prompt: 'Which of these will keep your amp audio from buzzing when you’re not playing?',
        contextKicker: 'Question 1 of 6',
        educationalTip: 'A noise gate silences audio below a set threshold, stopping pickup 60Hz mains hum and high-gain thermal hiss during pauses.',
        options: [
          { id: 'opt-1', label: 'Noise Gate', explanation: 'Correct! The gate closes during resting pauses, eliminating continuous amp hum and hiss.', isCorrect: true },
          { id: 'opt-2', label: 'Compressor', explanation: 'A compressor actually increases quiet hiss when the player stops due to automatic gain makeup!', isCorrect: false },
          { id: 'opt-3', label: 'Tremolo', explanation: 'Tremolo cycles volume repeatedly up and down, turning hum into pulsing hum.', isCorrect: false },
          { id: 'opt-4', label: 'Bitcrusher', explanation: 'Bitcrushers add quantization noise and grit, exacerbating unwanted noise.', isCorrect: false }
        ]
      },
      {
        id: 'eg-2',
        prompt: 'Which of these will be essential to creating a stadium guitar sound (U2, Pink Floyd, Coldplay)?',
        contextKicker: 'Question 2 of 6',
        educationalTip: 'Dotted-eighth stereo delay (The Edge / David Gilmour technique) paired with expansive reverb creates iconic stadium guitars.',
        options: [
          { id: 'opt-1', label: 'Stereo Delay (Dotted 8th) & Ambient Reverb', explanation: 'Correct! Rhythmic stereo delays coupled with wide reverberation give guitars massive arena dimensions.', isCorrect: true, soundDemoType: 'reverb' },
          { id: 'opt-2', label: 'De-Esser', explanation: 'De-essers are made for vocal sibilance, not guitar grandeur.', isCorrect: false },
          { id: 'opt-3', label: 'Sub-Bass Boost', explanation: 'Boosting sub-bass makes guitar flabby and conflicts directly with the bass guitar.', isCorrect: false },
          { id: 'opt-4', label: 'Mono Gate', explanation: 'A tight mono gate chokes sustains and makes sounds smaller, not stadium-sized.', isCorrect: false }
        ]
      },
      {
        id: 'eg-3',
        prompt: 'Which of these will help you get your electric guitar out of the bass guitar’s sonic space?',
        contextKicker: 'Question 3 of 6',
        educationalTip: 'Electric guitars rarely produce useful musical information below 80–100Hz. A high-pass filter clears room for the bass.',
        options: [
          { id: 'opt-1', label: 'High-Pass Filter (Low Cut at 80–100 Hz)', explanation: 'Correct! Rolling off sub frequencies cleans up mud and lets the kick and bass guitar anchor the bottom end.', isCorrect: true, soundDemoType: 'filter' },
          { id: 'opt-2', label: 'Distortion Pedal', explanation: 'Distortion generates more harmonic intermodulation and low-mid density.', isCorrect: false },
          { id: 'opt-3', label: 'Stereo Chorus', explanation: 'Chorus spreads frequencies into the stereo field but leaves bass frequencies clashing.', isCorrect: false },
          { id: 'opt-4', label: 'Limiter', explanation: 'A limiter brickwalls peaks across all frequencies equally.', isCorrect: false }
        ]
      },
      {
        id: 'eg-4',
        prompt: 'Which of these will give your guitar a digital type of distorted sound?',
        contextKicker: 'Question 4 of 6',
        educationalTip: 'Bitcrushers reduce bit depth and downsample, introducing harsh digital aliasing and robotic lo-fi crunch.',
        options: [
          { id: 'opt-1', label: 'Bitcrusher / Downsampler', explanation: 'Correct! Bitcrushers quantize samples into low bit-depths (e.g., 8-bit or 4-bit) for robotic digital crunch.', isCorrect: true, soundDemoType: 'bitcrush' },
          { id: 'opt-2', label: 'Tube Overdrive', explanation: 'Tube overdrive produces smooth, warm analog saturation and round clipping.', isCorrect: false },
          { id: 'opt-3', label: 'Spring Reverb', explanation: 'Spring reverb produces vintage mechanical twang, not digital distortion.', isCorrect: false },
          { id: 'opt-4', label: 'Tape Delay', explanation: 'Tape delay adds warm analog echo with gradual high-frequency damping.', isCorrect: false }
        ]
      },
      {
        id: 'eg-5',
        prompt: 'Which of these could help tame the transients of your picking?',
        contextKicker: 'Question 5 of 6',
        educationalTip: 'A fast attack compressor or transient shaper clamps down on the immediate spike (0-10ms) of a guitar pick striking strings.',
        options: [
          { id: 'opt-1', label: 'Fast Attack Compressor / Transient Shaper', explanation: 'Correct! A fast attack catches the instantaneous pick attack before it triggers clip meters.', isCorrect: true, soundDemoType: 'compressor' },
          { id: 'opt-2', label: 'Stereo Imager', explanation: 'Stereo imaging affects L/R phase relationship, not temporal envelope spikes.', isCorrect: false },
          { id: 'opt-3', label: 'Noise Gate', explanation: 'A gate opens on transients rather than reducing their amplitude.', isCorrect: false },
          { id: 'opt-4', label: 'Flanger', explanation: 'A flanger adds modulation sweep without altering transient attack height.', isCorrect: false }
        ]
      },
      {
        id: 'eg-6',
        prompt: 'Which of these stock plugins could add the essential component to the spring-induced surf guitar sound (Dick Dale style)?',
        contextKicker: 'Question 6 of 6',
        educationalTip: 'Spring reverbs bounce audio through physical coiled springs, yielding that distinctive bouncy, splashy surf rock drip.',
        options: [
          { id: 'opt-1', label: 'Spring Reverb', explanation: 'Correct! Spring reverb models the mechanical coiled spring tanks found in Fender tube amps.', isCorrect: true, soundDemoType: 'reverb' },
          { id: 'opt-2', label: 'Large Hall Reverb', explanation: 'Hall reverb produces lush symphonic decay without the metallic spring boing.', isCorrect: false },
          { id: 'opt-3', label: 'Pitch Shifter', explanation: 'Pitch shifting detunes audio without any reverb reflections.', isCorrect: false },
          { id: 'opt-4', label: 'Ring Modulator', explanation: 'Ring modulators produce discordant inharmonic bell tones.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'acoustic-guitar',
    track: 'mixing',
    category: 'instrument',
    title: 'Acoustic Guitar',
    subtitle: '4 Questions · Soundhole Boom, Dyn-EQ & Space',
    description: 'Tame runaway soundhole resonances dynamically while preserving body shimmer and note definition.',
    iconName: 'acoustic-guitar',
    accentColor: 'emerald',
    completionTitle: 'You did it! Your acoustic guitar sounds good! 🪕',
    completionSubtitle: 'Clean, woody resonance with sweet highs and zero tubby boominess.',
    questions: [
      {
        id: 'ag-1',
        prompt: 'Which could even out the volume of each note in a solo?',
        contextKicker: 'Question 1 of 4',
        educationalTip: 'Compression controls inconsistent fingerpicking velocities, raising subtle nuances and reigning in overly loud plucks.',
        options: [
          { id: 'opt-1', label: 'Compressor', explanation: 'Correct! A compressor evens out note-to-note dynamics so every note in the run is audible.', isCorrect: true, soundDemoType: 'compressor' },
          { id: 'opt-2', label: 'Dynamic EQ', explanation: 'Dynamic EQ targets specific frequencies rather than broadband overall solo leveling.', isCorrect: false },
          { id: 'opt-3', label: 'Plate Reverb', explanation: 'Plate reverb adds spatial tail without stabilizing loudness.', isCorrect: false },
          { id: 'opt-4', label: 'Normal EQ', explanation: 'Static EQ boosts or cuts permanently regardless of how loudly or quietly a note is struck.', isCorrect: false }
        ]
      },
      {
        id: 'ag-2',
        prompt: 'Which could automatically dip out boomy frequencies each time they emerge from the mic near the soundhole?',
        contextKicker: 'Question 2 of 4',
        educationalTip: 'Unlike static EQ which removes warmth 100% of the time, Dynamic EQ only cuts low-mid frequencies when they cross a volume threshold.',
        options: [
          { id: 'opt-1', label: 'Dynamic EQ', explanation: 'Correct! Dynamic EQ responds dynamically: when the guitarist hits a resonant boomy note, it dips the frequencies only for that instant!', isCorrect: true, soundDemoType: 'filter' },
          { id: 'opt-2', label: 'Normal EQ', explanation: 'A normal EQ cuts permanently, leaving the guitar thin and hollow during quiet delicate passages.', isCorrect: false },
          { id: 'opt-3', label: 'Plate Reverb', explanation: 'Reverb would actually prolong the boomy frequencies by ringing them out.', isCorrect: false }
        ]
      },
      {
        id: 'ag-3',
        prompt: 'Which could turn long ringing strums to pulsing chords?',
        contextKicker: 'Question 3 of 4',
        educationalTip: 'Tremolo rhythmically modulates amplitude at a musical rate (like 1/8 or 1/16 notes), chopping sustained strums into pulses.',
        options: [
          { id: 'opt-1', label: 'Tremolo / Rhythmic Pattern Gate', explanation: 'Correct! Tremolo modulates volume periodically to transform steady sustained strums into rhythmic pulsing.', isCorrect: true, soundDemoType: 'tremolo' },
          { id: 'opt-2', label: 'Plate Reverb', explanation: 'Reverb smooths strums out into a sustained wash rather than pulsing.', isCorrect: false },
          { id: 'opt-3', label: 'Dynamic EQ', explanation: 'Dynamic EQ controls resonant peaks, not tempo-synced volume modulation.', isCorrect: false },
          { id: 'opt-4', label: 'Normal EQ', explanation: 'Normal EQ shapes frequency spectrum without time-based amplitude pulsing.', isCorrect: false }
        ]
      },
      {
        id: 'ag-4',
        prompt: 'Which could add a sparkly reverb to arpeggiated plucked chords?',
        contextKicker: 'Question 4 of 4',
        educationalTip: 'Plate reverb vibrates a thin metal sheet, creating bright, dense, shimmering early reflections ideal for acoustic instruments.',
        options: [
          { id: 'opt-1', label: 'Plate Reverb', explanation: 'Correct! Plate reverbs have a dense, bright high-end response that makes acoustic strings shimmer and sparkle.', isCorrect: true, soundDemoType: 'reverb' },
          { id: 'opt-2', label: 'Dynamic EQ', explanation: 'Dynamic EQ is a surgical tonal tool, not an acoustic space generator.', isCorrect: false },
          { id: 'opt-3', label: 'Normal EQ', explanation: 'EQ boosts treble frequencies, but does not add the diffuse reflections of reverb.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: '808-bass',
    track: 'mixing',
    category: 'instrument',
    title: '808 Bass',
    subtitle: '6 Questions · Sub Harmonics, Ducking & Space',
    description: 'Master low-end headroom, kick drum ducking, harmonic saturation, and stereo space control.',
    iconName: '808-bass',
    accentColor: 'rose',
    completionTitle: 'You did it! Your 808s are booming! 🔊',
    completionSubtitle: 'Massive sub-weight, kick clarity, and harmonic warmth that translates to small speakers.',
    questions: [
      {
        id: '808-1',
        prompt: 'Which of these will add some light crunch and fuzz to your 808?',
        contextKicker: 'Question 1 of 6',
        educationalTip: 'Saturation adds upper harmonics to pure sine wave 808 sub-bass, allowing the bassline to be heard on phone speakers and earbuds.',
        options: [
          { id: 'opt-1', label: 'Saturation / Overdrive', explanation: 'Correct! Saturation generates audible upper harmonics so pure sub-frequencies cut through on small speakers.', isCorrect: true, soundDemoType: 'saturation' },
          { id: 'opt-2', label: 'Sidechain Compression', explanation: 'Sidechain compression ducks amplitude in response to an external trigger, adding no crunch.', isCorrect: false },
          { id: 'opt-3', label: 'Normal Compression', explanation: 'Normal clean compression regulates dynamic volume without introducing intentional fuzz.', isCorrect: false }
        ]
      },
      {
        id: '808-2',
        prompt: 'Which of these will allow you to duck the 808 out when the kick hits?',
        contextKicker: 'Question 2 of 6',
        educationalTip: 'Routing the kick drum into the sidechain input of an 808 compressor momentarily pulls the 808 down so both do not clash.',
        options: [
          { id: 'opt-1', label: 'Sidechain Compression', explanation: 'Correct! Sidechaining triggers compressor gain reduction on the 808 every time the kick drum hits.', isCorrect: true, soundDemoType: 'compressor' },
          { id: 'opt-2', label: 'Normal Compression', explanation: 'Normal compression only reacts to the 808’s own amplitude, not the kick drum.', isCorrect: false },
          { id: 'opt-3', label: 'Reverb', explanation: 'Reverb on an 808 creates muddy, chaotic low-end buildup.', isCorrect: false }
        ]
      },
      {
        id: '808-3',
        prompt: 'Which of these will allow you to extend the decay of the 808 hits?',
        contextKicker: 'Question 3 of 6',
        educationalTip: 'A compressor with slow release or a transient designer boosting sustain holds up the decaying tail of the note.',
        options: [
          { id: 'opt-1', label: 'Compression with Slow Release / Transient Sustain Boost', explanation: 'Correct! Pulling up sustain or letting the compressor release slowly pulls the ringing tail forward.', isCorrect: true },
          { id: 'opt-2', label: 'Sidechain Compression', explanation: 'Sidechain compression pulls down the signal when triggered, not extending tail length.', isCorrect: false },
          { id: 'opt-3', label: 'High-Pass Filter', explanation: 'A high-pass filter cuts fundamental bass frequencies away.', isCorrect: false }
        ]
      },
      {
        id: '808-4',
        prompt: 'Which of these could add some glitchy and garbled distortion?',
        contextKicker: 'Question 4 of 6',
        educationalTip: 'Bitcrushing clamps down sample rate and bit resolution, producing jagged digital stepped distortion.',
        options: [
          { id: 'opt-1', label: 'Bitcrusher', explanation: 'Correct! Bitcrushing introduces digital quantization distortion, ideal for aggressive modern hip-hop 808s.', isCorrect: true, soundDemoType: 'bitcrush' },
          { id: 'opt-2', label: 'Sidechain Compression', explanation: 'Sidechain compression adjusts volume, not bit-depth or sample rate.', isCorrect: false },
          { id: 'opt-3', label: 'Normal Compression', explanation: 'Normal compression smooths peaks rather than crushing bit resolution.', isCorrect: false }
        ]
      },
      {
        id: '808-5',
        prompt: 'Which of these could widen and expand the sound (while keeping sub frequencies in mono)?',
        contextKicker: 'Question 5 of 6',
        educationalTip: 'Sub frequencies (below 120Hz) must stay centered/mono for punch and vinyl compatibility; widening should only apply to mid/high harmonics.',
        options: [
          { id: 'opt-1', label: 'Stereo Widener / Chorus on Upper Harmonics only', explanation: 'Correct! Splitting the band and widening only the mid/high frequencies creates a wide 808 while keeping sub-100Hz tight and mono.', isCorrect: true },
          { id: 'opt-2', label: 'Mono Utility', explanation: 'Mono summing collapses all stereo width to the dead center.', isCorrect: false },
          { id: 'opt-3', label: 'Sidechain Compression', explanation: 'Sidechain compression acts on gain, not stereo panning or phase width.', isCorrect: false }
        ]
      },
      {
        id: '808-6',
        prompt: 'Which of these could carve out room for the synths in the frequency spectrum?',
        contextKicker: 'Question 6 of 6',
        educationalTip: 'A low-pass filter or high-shelf cut removes unnecessary top end from the 808 so synths and vocals have full clarity in the midrange.',
        options: [
          { id: 'opt-1', label: 'Low-Pass Filter / High-Shelf Cut EQ', explanation: 'Correct! Rolling off frequencies above 2kHz–5kHz clears space for synths, vocal harmonies, and pads.', isCorrect: true, soundDemoType: 'filter' },
          { id: 'opt-2', label: 'Sidechain Compression', explanation: 'Sidechaining controls volume over time rather than removing higher frequency octaves.', isCorrect: false },
          { id: 'opt-3', label: 'Overdrive', explanation: 'Overdrive adds more frequencies into the synth realm.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'piano',
    track: 'mixing',
    category: 'instrument',
    title: 'Piano',
    subtitle: '6 Questions · Hammer Plinks, Upright Bass Pocket & Space',
    description: 'Clean close-mic hammer attacks, carve room for acoustic bass, and bathe keys in grand acoustic spaces.',
    iconName: 'piano',
    accentColor: 'cyan',
    completionTitle: 'You did it! Your piano sounds gorgeous! 🎹',
    completionSubtitle: 'Lush, sitting elegantly behind the vocals with zero harsh hammer clicks.',
    questions: [
      {
        id: 'p-1',
        prompt: 'Which of these would best automatically cut out plinks of the hammers hitting when they’re loud (because it was mic’d too close)?',
        contextKicker: 'Question 1 of 6',
        educationalTip: 'Close piano mics capture sharp hammer transients around 2.5kHz–4kHz. Dynamic EQ dips this frequency only on loud hammer strikes.',
        options: [
          { id: 'opt-1', label: 'Dynamic EQ', explanation: 'Correct! Dynamic EQ automatically clamps down on harsh 3kHz hammer click transients whenever the pianist hits hard.', isCorrect: true, soundDemoType: 'filter' },
          { id: 'opt-2', label: 'Normal Compression', explanation: 'Broadband compression pushes the hammer plink into the compressor detector and can exaggerate clickiness.', isCorrect: false },
          { id: 'opt-3', label: 'Digital Delay', explanation: 'Delay repeats the hammer plink multiple times.', isCorrect: false }
        ]
      },
      {
        id: 'p-2',
        prompt: 'Which of these could best get the piano out of the upright bass’s sonic space?',
        contextKicker: 'Question 2 of 6',
        educationalTip: 'A piano’s left hand easily collides with acoustic bass between 40Hz–150Hz. A high-pass filter creates clear separation.',
        options: [
          { id: 'opt-1', label: 'High-Pass Filter (Low Cut at 80–120 Hz)', explanation: 'Correct! Cutting sub rumble on the piano lets the upright bass own the foundational low end without mud.', isCorrect: true, soundDemoType: 'filter' },
          { id: 'opt-2', label: 'Dynamic EQ', explanation: 'While useful, a simple low-cut filter is the cleaner and more complete solution for sub-100Hz clearance.', isCorrect: false },
          { id: 'opt-3', label: 'Normal Compression', explanation: 'Compression does not remove low frequencies from the piano.', isCorrect: false }
        ]
      },
      {
        id: 'p-3',
        prompt: 'Which of these would add some noise and lo-fi vibes?',
        contextKicker: 'Question 3 of 6',
        educationalTip: 'Tape machine and vinyl emulators add slight pitch wow & flutter, tape hiss, and frequency rolloff.',
        options: [
          { id: 'opt-1', label: 'Tape / Vinyl Emulation Plugin', explanation: 'Correct! Tape/vinyl plugins add authentic mechanical wow, flutter, crackle, and soft harmonic saturation.', isCorrect: true, soundDemoType: 'saturation' },
          { id: 'opt-2', label: 'Clean Digital Limiter', explanation: 'A clean limiter aims for transparent dynamic control with zero coloration.', isCorrect: false },
          { id: 'opt-3', label: 'Dynamic EQ', explanation: 'Dynamic EQ is an analytical EQ tool, not a lo-fi texture generator.', isCorrect: false }
        ]
      },
      {
        id: 'p-4',
        prompt: 'Which of these could make the piano sound like it’s in a concert hall?',
        contextKicker: 'Question 4 of 6',
        educationalTip: 'Concert Hall reverb models a 1.8–2.5 second acoustic tail with rich spatial dispersion and authentic early reflections.',
        options: [
          { id: 'opt-1', label: 'Concert Hall Reverb', explanation: 'Correct! Hall reverb simulates a large auditorium or symphony hall with lush, diffuse reflections.', isCorrect: true, soundDemoType: 'reverb' },
          { id: 'opt-2', label: 'Slapback Delay', explanation: 'Slapback delay gives a rockabilly 100ms echo, not a grand symphonic hall.', isCorrect: false },
          { id: 'opt-3', label: 'Normal Compression', explanation: 'Compression controls dynamic range, not reverberant space.', isCorrect: false }
        ]
      },
      {
        id: 'p-5',
        prompt: 'Which of these could make high notes on a piano sound like twinkling stars?',
        contextKicker: 'Question 5 of 6',
        educationalTip: 'Shimmer reverbs route the reverb tail through an octave-up pitch shifter, generating ethereal, sparkling high-frequency sheen.',
        options: [
          { id: 'opt-1', label: 'Shimmer Reverb (Pitch-shifted Reverb)', explanation: 'Correct! Shimmer reverb feeds the reverb tail into a +1 octave pitch-shifter, creating a crystalline heavenly halo.', isCorrect: true, soundDemoType: 'reverb' },
          { id: 'opt-2', label: 'Normal Compression', explanation: 'Compression has no pitch-shifting or reverberant capability.', isCorrect: false },
          { id: 'opt-3', label: 'Dynamic EQ', explanation: 'Dynamic EQ only alters frequency amplitude, not octave generation.', isCorrect: false }
        ]
      },
      {
        id: 'p-6',
        prompt: 'Which of these could stabilize the piano in the mix to help it sit behind some vocals?',
        contextKicker: 'Question 6 of 6',
        educationalTip: 'Subtle bus compression (2:1 ratio, medium attack, auto release) glues dynamic piano notes so it stays tucked under the vocal.',
        options: [
          { id: 'opt-1', label: 'Subtle Bus Compression (2:1 or 3:1 Ratio)', explanation: 'Correct! Gentle compression reins in spontaneous loud keystrokes so the piano cradles the vocal consistently.', isCorrect: true, soundDemoType: 'compressor' },
          { id: 'opt-2', label: 'Dynamic EQ', explanation: 'Dynamic EQ addresses narrow frequency anomalies rather than overall mix seating.', isCorrect: false },
          { id: 'opt-3', label: 'Bitcrusher', explanation: 'Bitcrushing would make the piano aggressively harsh and pull attention away from vocals.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'snare',
    track: 'mixing',
    category: 'instrument',
    title: 'Snare',
    subtitle: '6 Questions · Transient Shaping, Sizzle & 80s Gate',
    description: 'Punch through dense walls of guitars and synths with transient attack, crack, and classic gated ambience.',
    iconName: 'snare-drum',
    accentColor: 'violet',
    completionTitle: 'You did it! Your snare is punching through the mix! 🥁',
    completionSubtitle: 'Crisp crack, controlled ring, and dynamic punch that drives the entire rhythm section.',
    questions: [
      {
        id: 'sn-1',
        prompt: 'Which of these could help you boost the transient of the snare without doing anything else?',
        contextKicker: 'Question 1 of 6',
        educationalTip: 'Transient designers detect the attack curve of an audio waveform and boost or attenuate it independent of track volume.',
        options: [
          { id: 'opt-1', label: 'Transient Shaper (Attack Boost)', explanation: 'Correct! A transient shaper isolates and amplifies the initial strike/attack without boosting the sustained ring.', isCorrect: true },
          { id: 'opt-2', label: 'Reverb', explanation: 'Reverb adds diffuse tail sustain, reducing perceived initial transient punch.', isCorrect: false },
          { id: 'opt-3', label: 'Low Shelf EQ Boost', explanation: 'Boosting low frequencies adds weight or thud, not sharp transient snap.', isCorrect: false },
          { id: 'opt-4', label: 'Chorus', explanation: 'Chorus smears drum transients by adding detuned copies.', isCorrect: false }
        ]
      },
      {
        id: 'sn-2',
        prompt: 'Which of these could most easily help you dip out the sizzle of an overly loud snare?',
        contextKicker: 'Question 2 of 6',
        educationalTip: 'Snare sizzle lives between 4kHz–7kHz. A dynamic EQ attenuates this frequency band only during hard hits.',
        options: [
          { id: 'opt-1', label: 'Dynamic EQ (4kHz - 7kHz dip)', explanation: 'Correct! Dynamic EQ automatically tames harsh high-frequency wire sizzle on hard hits while leaving quiet ghost notes alone.', isCorrect: true, soundDemoType: 'filter' },
          { id: 'opt-2', label: 'Static Boost EQ', explanation: 'Boosting will make the harsh sizzle even more unbearable.', isCorrect: false },
          { id: 'opt-3', label: 'Delay', explanation: 'Delay will echo the painful sizzle across multiple repetitions.', isCorrect: false },
          { id: 'opt-4', label: 'Limiter', explanation: 'A limiter will squash the entire drum rather than targeting specific wire frequencies.', isCorrect: false }
        ]
      },
      {
        id: 'sn-3',
        prompt: 'Which of these could get you that classic 80s snare sound (Phil Collins, Prince)?',
        contextKicker: 'Question 3 of 6',
        educationalTip: 'Gated reverb feeds the snare into a huge non-linear plate/hall reverb, then abruptly chops the tail off with a noise gate.',
        options: [
          { id: 'opt-1', label: 'Gated Reverb', explanation: 'Correct! Huge reverb tail suddenly cut off by a hard noise gate is the defining hallmark of the 1980s drum sound.', isCorrect: true, soundDemoType: 'gated' },
          { id: 'opt-2', label: 'Spring Reverb', explanation: 'Spring reverb sounds twangy and vintage 60s, not massive 80s.', isCorrect: false },
          { id: 'opt-3', label: 'Tape Delay', explanation: 'Tape delay produces repeating echoes rather than explosive gated bursts.', isCorrect: false },
          { id: 'opt-4', label: 'Bitcrusher', explanation: 'Bitcrushing produces 90s industrial or video-game noise.', isCorrect: false }
        ]
      },
      {
        id: 'sn-4',
        prompt: 'Which of these could crunch up and distort your snare sound?',
        contextKicker: 'Question 4 of 6',
        educationalTip: 'Clippers or tape/console saturators shave transient peaks into harmonic distortion, making the snare sound fat and dirty.',
        options: [
          { id: 'opt-1', label: 'Saturation / Hard Clipper', explanation: 'Correct! Driving into saturation/clipping flattens peak crests and adds gritty harmonic bite.', isCorrect: true, soundDemoType: 'saturation' },
          { id: 'opt-2', label: 'High-Pass Filter', explanation: 'A high-pass filter cleans low mud, adding no crunch or saturation.', isCorrect: false },
          { id: 'opt-3', label: 'Clean Digital Reverb', explanation: 'Reverb adds spacious reflections without crunchy distortion.', isCorrect: false },
          { id: 'opt-4', label: 'De-Esser', explanation: 'A de-esser softens top end, the opposite of crunch.', isCorrect: false }
        ]
      },
      {
        id: 'sn-5',
        prompt: 'Which of these could make your lower pitched boom-bap snare sound more like a tight and biting trap snare?',
        contextKicker: 'Question 5 of 6',
        educationalTip: 'Pitch-shifting upward (+200 to +400 cents) raises fundamental body pitch while shortening decay with an envelope shaper.',
        options: [
          { id: 'opt-1', label: 'Pitch Shifter (+cents upward) & Envelope Shortener', explanation: 'Correct! Pitching the snare up and tightening its release envelope transforms a loose vintage snare into a modern snappy trap crack.', isCorrect: true },
          { id: 'opt-2', label: 'Long Cathedral Reverb', explanation: 'Long reverb makes the snare huge and loose, the opposite of tight trap snare.', isCorrect: false },
          { id: 'opt-3', label: 'Stereo Chorus', explanation: 'Chorus widens and softens impact, reducing trap bite.', isCorrect: false },
          { id: 'opt-4', label: 'Sub-Bass Boost', explanation: 'Sub-bass boost makes the snare deeper and tubbier.', isCorrect: false }
        ]
      },
      {
        id: 'sn-6',
        prompt: 'Which of these could even out an inconsistently struck snare?',
        contextKicker: 'Question 6 of 6',
        educationalTip: 'A compressor with medium attack and fast release evens out wild velocity differences from an energetic drummer.',
        options: [
          { id: 'opt-1', label: 'Compressor / Peak Limiter', explanation: 'Correct! Compression controls the peaks of hard hits and pulls up ghost strokes for steady groove delivery.', isCorrect: true, soundDemoType: 'compressor' },
          { id: 'opt-2', label: 'Noise Gate', explanation: 'A gate might mute softer hits completely if set incorrectly!', isCorrect: false },
          { id: 'opt-3', label: 'Stereo Delay', explanation: 'Delay echoes the inconsistent hits without leveling their volume.', isCorrect: false },
          { id: 'opt-4', label: 'Tremolo', explanation: 'Tremolo creates artificial pulsating volume modulation.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'kick',
    track: 'mixing',
    category: 'instrument',
    title: 'Kick',
    subtitle: '6 Questions · Click Attenuation, Low-End Headroom & Mud',
    description: 'Balance 50Hz sub thump with 3kHz beater click, clear room for the 808, and eliminate boxy mud.',
    iconName: 'kick-drum',
    accentColor: 'orange',
    completionTitle: 'You did it! Your kick is booming! 💥',
    completionSubtitle: 'Punches right in your chest with low-end authority and clean separation from the bass.',
    questions: [
      {
        id: 'k-1',
        prompt: 'Which of these could reduce the clicky attack of the kick?',
        contextKicker: 'Question 1 of 6',
        educationalTip: 'Beater click lives around 3kHz to 5kHz. An EQ cut or transient shaper softening attack removes plastic clickiness.',
        options: [
          { id: 'opt-1', label: 'Parametric EQ Cut (3kHz - 5kHz) or Transient Shaper (Attenuate Attack)', explanation: 'Correct! Dipping the 3k–5kHz beater zone or softening transient attack turns plastic click into round thump.', isCorrect: true, soundDemoType: 'filter' },
          { id: 'opt-2', label: 'Sidechain Compression', explanation: 'Sidechain compression ducks other tracks when the kick plays, but doesn’t change the kick’s own click.', isCorrect: false },
          { id: 'opt-3', label: 'Stereo Widener', explanation: 'Stereo widening sub audio ruins mono compatibility and punch.', isCorrect: false }
        ]
      },
      {
        id: 'k-2',
        prompt: 'Which of these do you want to be cautious with on a kick drum?',
        contextKicker: 'Question 2 of 6',
        educationalTip: 'Long reverberation tails in the sub-100Hz register quickly build into muddy acoustic slop that ruins the mix punch.',
        options: [
          { id: 'opt-1', label: 'Long Decay Reverb', explanation: 'Correct! Over-reverberating a kick fills headroom with low-frequency rumble and washes out punch.', isCorrect: true },
          { id: 'opt-2', label: 'High-Pass Filter at 30 Hz', explanation: 'A 30Hz high-pass filter is actually standard practice to remove inaudible sub-sonic speaker strain.', isCorrect: false },
          { id: 'opt-3', label: 'Accurate Metering', explanation: 'Accurate metering is essential and safe.', isCorrect: false }
        ]
      },
      {
        id: 'k-3',
        prompt: 'Which other plugin might you be cautious over-using on a kick?',
        contextKicker: 'Question 3 of 6',
        educationalTip: 'Stereo wideners introduce phase cancellation. If the kick is spread wide, summing to mono (like club systems or phones) can make the bass vanish.',
        options: [
          { id: 'opt-1', label: 'Stereo Widener / Chorus (Phase cancelation hazard)', explanation: 'Correct! Kick fundamentals must stay centered in mono; widening causes devastating mono phase cancellation on club sound systems.', isCorrect: true },
          { id: 'opt-2', label: 'Subtle Parametric EQ', explanation: 'Parametric EQ is standard for sculpting kick drums.', isCorrect: false },
          { id: 'opt-3', label: 'Clip Meter', explanation: 'Clip meters are visual monitoring tools.', isCorrect: false }
        ]
      },
      {
        id: 'k-4',
        prompt: 'Which of these could get other instruments out of the way by turning them down when the kick strikes?',
        contextKicker: 'Question 4 of 6',
        educationalTip: 'Sidechain compression routes the kick into compressors on bass or synths, ducking them by 2–6dB for immediate punch.',
        options: [
          { id: 'opt-1', label: 'Sidechain Compression (routed to Bass/Synths)', explanation: 'Correct! When the kick hits, the sidechain compressor pulls other instruments down for instant pocket clearance.', isCorrect: true, soundDemoType: 'compressor' },
          { id: 'opt-2', label: 'Normal EQ on Kick', explanation: 'EQ on the kick affects only the kick, not other instrument tracks.', isCorrect: false },
          { id: 'opt-3', label: 'Flanger', explanation: 'A flanger creates comb filtering, not inter-track ducking.', isCorrect: false }
        ]
      },
      {
        id: 'k-5',
        prompt: 'Which of these could crunch up and fatten the sound of the kick?',
        contextKicker: 'Question 5 of 6',
        educationalTip: 'Analog tape saturation or sub-harmonic generators saturate the low frequencies, adding perceived weight and analog density.',
        options: [
          { id: 'opt-1', label: 'Tape Saturation / Sub-Harmonic Generator', explanation: 'Correct! Gentle saturation fattens low-end body and generates audible mid-harmonics.', isCorrect: true, soundDemoType: 'saturation' },
          { id: 'opt-2', label: 'High Shelf Boost', explanation: 'Boosting high shelf increases thin clickiness rather than fattening.', isCorrect: false },
          { id: 'opt-3', label: 'Gate', explanation: 'A gate shortens sustain rather than fattening tone.', isCorrect: false }
        ]
      },
      {
        id: 'k-6',
        prompt: 'Which of these plugins could cut out flabby and muddy frequencies from a kick recording?',
        contextKicker: 'Question 6 of 6',
        educationalTip: 'The 250Hz–400Hz region on a kick drum often sounds like cardboard box resonance. Dipping with an EQ cleans up the thump.',
        options: [
          { id: 'opt-1', label: 'Parametric EQ (cut at 250Hz - 400Hz)', explanation: 'Correct! Carving out the 300Hz cardboard pocket transforms a boxy kick into a modern punchy punch.', isCorrect: true, soundDemoType: 'filter' },
          { id: 'opt-2', label: 'Sidechain Compression', explanation: 'Sidechaining changes dynamic volume, not frequency resonance.', isCorrect: false },
          { id: 'opt-3', label: 'Stereo Reverb', explanation: 'Reverb amplifies muddy room resonance.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'room-mic',
    track: 'mixing',
    category: 'instrument',
    title: 'A Room Mic',
    subtitle: '6 Questions · Street Rumble, Stereo Width & Wall of Sound',
    description: 'Transform an ambient room microphone into an explosive wall-of-sound drum texture.',
    iconName: 'pencil-mic',
    accentColor: 'blue',
    completionTitle: 'You did it! Your room mic is helping fill out the space in your mix! 📻',
    completionSubtitle: 'Lush stereo dimension with explosive glue and zero low-frequency street rumble.',
    questions: [
      {
        id: 'rm-1',
        prompt: 'Which of these could cut down consistent low rumble of street noise in a room mic?',
        contextKicker: 'Question 1 of 6',
        educationalTip: 'Room mics capture traffic, AC hum, and footstep rumble below 80Hz. A steep high-pass filter eliminates this.',
        options: [
          { id: 'opt-1', label: 'High-Pass Filter (Low Cut at 80 Hz)', explanation: 'Correct! Rolling off everything below 80Hz cleans up air conditioner rumble and street noise.', isCorrect: true, soundDemoType: 'filter' },
          { id: 'opt-2', label: 'Dynamic EQ', explanation: 'Dynamic EQ is an active filter, but a high-pass filter provides complete sub-bass elimination.', isCorrect: false },
          { id: 'opt-3', label: 'Tape Saturation', explanation: 'Saturation will thicken and distort the rumble, making it worse.', isCorrect: false }
        ]
      },
      {
        id: 'rm-2',
        prompt: 'Which of these could move the sound from your room mic to the sides of your mix?',
        contextKicker: 'Question 2 of 6',
        educationalTip: 'Mid-Side processing allows you to attenuate the phantom center (Mid) while boosting the Stereo Sides, creating a wrap-around field.',
        options: [
          { id: 'opt-1', label: 'Mid-Side Processing / Stereo Widener (boost Sides, dip Mid)', explanation: 'Correct! Dipping the Mid channel and boosting the Sides leaves the center clear for kick/snare while room ambience wraps around.', isCorrect: true },
          { id: 'opt-2', label: 'Mono Summing', explanation: 'Mono summing places all sound directly in the dead center.', isCorrect: false },
          { id: 'opt-3', label: 'Bitcrusher', explanation: 'Bitcrushing introduces distortion, not spatial relocation.', isCorrect: false }
        ]
      },
      {
        id: 'rm-3',
        prompt: 'Which of these could add some extra harmonic fuzziness to the captured room mic sound?',
        contextKicker: 'Question 3 of 6',
        educationalTip: 'Overdriving a vintage preamp or console saturation plugin adds rich harmonic dirt and grit to room acoustics.',
        options: [
          { id: 'opt-1', label: 'Saturation / Preamp Drive', explanation: 'Correct! Driving analog saturation warms and dirties the ambient reflections.', isCorrect: true, soundDemoType: 'saturation' },
          { id: 'opt-2', label: 'Noise Gate', explanation: 'A gate cuts off quiet room decay completely.', isCorrect: false },
          { id: 'opt-3', label: 'De-Esser', explanation: 'A de-esser softens vocal sibilance, not adding harmonic fuzz.', isCorrect: false }
        ]
      },
      {
        id: 'rm-4',
        prompt: 'Which of these could dip out loud cymbal crashes when they hit?',
        contextKicker: 'Question 4 of 6',
        educationalTip: 'Room mics can be overwhelmed by harsh cymbal splash. Dynamic EQ clamps down on 6k–10kHz exclusively during heavy crashes.',
        options: [
          { id: 'opt-1', label: 'Dynamic EQ (attenuating 6k-10k on peak hits)', explanation: 'Correct! Dynamic EQ reacts selectively when cymbals crash, keeping the room warm without piercing ear fatigue.', isCorrect: true, soundDemoType: 'filter' },
          { id: 'opt-2', label: 'High Shelf Boost', explanation: 'A high boost makes the cymbal crashes even more ear-piercing.', isCorrect: false },
          { id: 'opt-3', label: 'Stereo Delay', explanation: 'Delay echoes the cymbal crashes repeatedly.', isCorrect: false }
        ]
      },
      {
        id: 'rm-5',
        prompt: 'Which of these could be pushed heavily to really turn the recording into a wall of sound?',
        contextKicker: 'Question 5 of 6',
        educationalTip: 'The famous "All-Buttons-In" 1176 FET compressor setting squashes room audio with extreme ratio and distortion, making drums sound gigantic.',
        options: [
          { id: 'opt-1', label: 'All-Buttons-In / 1176-style Heavy FET Compression', explanation: 'Correct! Slamming a room mic with extreme compression brings up quiet room resonance and creates an explosive sonic wall.', isCorrect: true, soundDemoType: 'compressor' },
          { id: 'opt-2', label: 'Subtle Master Limiter', explanation: 'A transparent master limiter avoids audible distortion and breathing.', isCorrect: false },
          { id: 'opt-3', label: 'Noise Gate', explanation: 'A noise gate eliminates the room decay that forms the wall of sound.', isCorrect: false }
        ]
      },
      {
        id: 'rm-6',
        prompt: 'Which of these could change or re-shape the original room from the recording into an entirely different room?',
        contextKicker: 'Question 6 of 6',
        educationalTip: 'Convolution reverbs load impulse response (IR) samples of real physical chambers, concert halls, and cathedrals.',
        options: [
          { id: 'opt-1', label: 'Convolution Reverb (with Impulse Response)', explanation: 'Correct! Convolution reverb applies real-world acoustic profiles to replace or transform the physical space.', isCorrect: true, soundDemoType: 'reverb' },
          { id: 'opt-2', label: 'Tremolo', explanation: 'Tremolo modulates volume in waves, not acoustic chamber geometry.', isCorrect: false },
          { id: 'opt-3', label: 'Bitcrusher', explanation: 'Bitcrusher reduces digital resolution.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'eq-module',
    track: 'mixing',
    category: 'mix-element',
    title: 'EQ (Equalization)',
    subtitle: '4 Questions · Curves, Filters & Frequency Pockets',
    description: 'Explore high-pass low cuts, nasal cuts, boomy acoustic dips, and airy high shelves.',
    iconName: 'eq',
    accentColor: 'amber',
    completionTitle: 'You did it! You EQ’d all your problems away! 🎚️',
    completionSubtitle: 'Every instrument has its dedicated frequency pocket and mud has been vanquished.',
    questions: [
      {
        id: 'eq-1',
        prompt: 'Which curve would cut out rumble and mitigate plosives on a vocal?',
        contextKicker: 'Question 1 of 4',
        educationalTip: 'A High-Pass Filter (also called Low Cut) attenuates everything below a chosen frequency (e.g., 80Hz–100Hz).',
        options: [
          { id: 'opt-1', label: 'High-Pass Filter (Low Cut Curve)', explanation: 'Correct! A high-pass filter blocks low frequency thumps and mic stand rumbles while passing all audio above.', isCorrect: true, soundDemoType: 'filter' },
          { id: 'opt-2', label: 'High Shelf Boost', explanation: 'A high shelf boosts high treble, ignoring low-frequency rumble.', isCorrect: false },
          { id: 'opt-3', label: 'Low Shelf Boost', explanation: 'Boosting low shelf would dramatically worsen plosive pops!', isCorrect: false },
          { id: 'opt-4', label: 'Narrow Notch at 1kHz', explanation: 'Notching 1kHz addresses midrange nasal tone, not low rumble.', isCorrect: false }
        ]
      },
      {
        id: 'eq-2',
        prompt: 'Which curve would fix a boomy-sounding acoustic guitar?',
        contextKicker: 'Question 2 of 4',
        educationalTip: 'A parametric bell filter with a moderate Q dipped between 200Hz–300Hz clears soundhole boom without thinning the instrument.',
        options: [
          { id: 'opt-1', label: 'Low-Mid Bell Filter Cut (dip at 200–300 Hz)', explanation: 'Correct! Dipping 200–300Hz removes internal body resonance and proximity effect boom.', isCorrect: true, soundDemoType: 'filter' },
          { id: 'opt-2', label: 'High Shelf Cut', explanation: 'Cutting high frequencies makes the guitar duller and woodier.', isCorrect: false },
          { id: 'opt-3', label: 'High-Pass at 1000 Hz', explanation: 'Cutting at 1kHz would eliminate virtually all acoustic body notes.', isCorrect: false }
        ]
      },
      {
        id: 'eq-3',
        prompt: 'Which curve would fix a nasal-sounding vocal, horn, or synth?',
        contextKicker: 'Question 3 of 4',
        educationalTip: 'Nasal "honk" frequency resonance sits squarely between 800Hz and 1.5kHz. A surgical bell cut relieves nasal quality.',
        options: [
          { id: 'opt-1', label: 'Bell Filter Cut in the 800Hz – 1.5kHz region', explanation: 'Correct! Sweeping a bell notch through 800Hz–1.5kHz eliminates the congested, nasal megaphone character.', isCorrect: true, soundDemoType: 'filter' },
          { id: 'opt-2', label: 'High-Pass Filter at 40Hz', explanation: 'Sub filtering does not touch the midrange nasal frequencies.', isCorrect: false },
          { id: 'opt-3', label: 'High Shelf Boost at 16kHz', explanation: 'Air boosts affect top sparkle, leaving nasal honk untouched.', isCorrect: false }
        ]
      },
      {
        id: 'eq-4',
        prompt: 'Which curve would add a little bit of crispiness and air to help vocals cut through the mix?',
        contextKicker: 'Question 4 of 4',
        educationalTip: 'A gentle High-Shelf Boost above 10kHz–12kHz adds high-frequency sheen and breath ("air") without introducing harshness.',
        options: [
          { id: 'opt-1', label: 'High-Shelf Boost (+2dB to +3dB above 10kHz–12kHz)', explanation: 'Correct! An air band high shelf opens up top-end clarity and expensive sheen on modern vocals.', isCorrect: true, soundDemoType: 'filter' },
          { id: 'opt-2', label: 'Low Cut at 500 Hz', explanation: 'Cutting at 500Hz empties out the vocal body, making it sound thin and tinny.', isCorrect: false },
          { id: 'opt-3', label: 'Mid Bell Boost at 1kHz', explanation: 'Boosting 1kHz adds harsh telephone honk rather than silky air.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'compression-module',
    track: 'mixing',
    category: 'mix-element',
    title: 'Compression',
    subtitle: '6 Questions · Transient Attack, Parallel & Sidechain',
    description: 'Learn serial compression, parallel "New York" thickness, sidechain ducking, and mix bus glue.',
    iconName: 'compressor',
    accentColor: 'indigo',
    completionTitle: 'You did it! Your mix sounds cohesive and glued together! 🗜️',
    completionSubtitle: 'Dynamics are under control, grooves are punchy, and the mix breathes musically.',
    questions: [
      {
        id: 'comp-1',
        prompt: 'Which setting would tame the transients of a vocal, horn, or snare drum?',
        contextKicker: 'Question 1 of 6',
        educationalTip: 'Attack time determines how quickly the compressor acts after crossing threshold. Fast attack (<10ms) immediately grabs spikes.',
        options: [
          { id: 'opt-1', label: 'Fast Attack Time (under 10ms)', explanation: 'Correct! A fast attack immediately catches sharp initial transients before they pass through.', isCorrect: true, soundDemoType: 'compressor' },
          { id: 'opt-2', label: 'Slow Attack Time (over 50ms)', explanation: 'Slow attack lets the entire initial transient punch right through uncompressed.', isCorrect: false },
          { id: 'opt-3', label: '1:1 Ratio', explanation: 'A 1:1 ratio performs no compression whatsoever.', isCorrect: false }
        ]
      },
      {
        id: 'comp-2',
        prompt: 'Which setting would extend the rumble of an 808 without changing its attack?',
        contextKicker: 'Question 2 of 6',
        educationalTip: 'A slower attack lets the front strike through untouched, while a slow release or low threshold sustains the decaying low end.',
        options: [
          { id: 'opt-1', label: 'Slow Attack with Medium/Long Release', explanation: 'Correct! The front punch punches through cleanly, while the compressor holds and sustains the decaying low rumble.', isCorrect: true },
          { id: 'opt-2', label: 'Ultra-Fast Attack with Instant Release', explanation: 'Fast attack flattens the front punch and instant release cuts the tail short.', isCorrect: false },
          { id: 'opt-3', label: 'Hard Gate', explanation: 'A gate abruptly cuts off the decay.', isCorrect: false }
        ]
      },
      {
        id: 'comp-3',
        prompt: 'Which setting would subtly glue together and smooth out the audio on a mix bus?',
        contextKicker: 'Question 3 of 6',
        educationalTip: 'Mix bus glue requires gentle ratios (1.5:1 or 2:1), slow attack (30ms) to preserve drum transients, and auto/smooth release.',
        options: [
          { id: 'opt-1', label: 'Gentle Ratio (1.5:1 to 2:1), Slow Attack (30ms), Auto Release with 1–2dB Gain Reduction', explanation: 'Correct! Gentle settings glue disparate instruments together into a cohesive record without squashing punch.', isCorrect: true },
          { id: 'opt-2', label: '20:1 Brickwall Ratio, 0.1ms Attack', explanation: 'An aggressive brickwall setting will destroy all groove, dynamic contrast, and life in the mix.', isCorrect: false },
          { id: 'opt-3', label: 'Hard Expander', explanation: 'An expander increases dynamic range rather than gluing.', isCorrect: false }
        ]
      },
      {
        id: 'comp-4',
        prompt: 'Which technique would involve creating a highly compressed “wall” of a signal to mix in with the original unprocessed signal?',
        contextKicker: 'Question 4 of 6',
        educationalTip: 'Parallel Compression (often called New York compression) blends a heavily squashed, driven duplicate track underneath the pristine original.',
        options: [
          { id: 'opt-1', label: 'Parallel Compression', explanation: 'Correct! Parallel compression blends an aggressive, brickwalled duplicate with the dynamic clean signal for thickness + punch.', isCorrect: true, soundDemoType: 'compressor' },
          { id: 'opt-2', label: 'Serial Compression', explanation: 'Serial compression places compressors in line one after another, rather than side-by-side in parallel.', isCorrect: false },
          { id: 'opt-3', label: 'Sidechain Compression', explanation: 'Sidechain compression uses an external signal to duck volume.', isCorrect: false }
        ]
      },
      {
        id: 'comp-5',
        prompt: 'Which technique would allow you to have a trumpet solo automatically turn down some synth chords underneath it?',
        contextKicker: 'Question 5 of 6',
        educationalTip: 'Sidechain compression routes the trumpet signal into the detector input of a compressor inserted on the synth track.',
        options: [
          { id: 'opt-1', label: 'Sidechain Compression', explanation: 'Correct! The trumpet acts as the key input: whenever it plays, the synth chords dip down automatically.', isCorrect: true, soundDemoType: 'compressor' },
          { id: 'opt-2', label: 'Parallel Compression', explanation: 'Parallel compression layers compressed and uncompressed copies of the same instrument.', isCorrect: false },
          { id: 'opt-3', label: 'Serial Compression', explanation: 'Serial compression uses multiple compressors on one track in sequence.', isCorrect: false }
        ]
      },
      {
        id: 'comp-6',
        prompt: 'Which technique would involve layering multiple compressors together in series to create smooth and natural sounding compression?',
        contextKicker: 'Question 6 of 6',
        educationalTip: 'Serial compression uses 2 or 3 compressors each doing 1–2dB of reduction (e.g. fast 1176 catching peaks followed by slow LA-2A smoothing body).',
        options: [
          { id: 'opt-1', label: 'Serial Compression', explanation: 'Correct! Stacking two compressors in series (e.g., peak tamer + optical leveler) sounds vastly more natural than one compressor working overtime.', isCorrect: true },
          { id: 'opt-2', label: 'Parallel Compression', explanation: 'Parallel compression runs paths concurrently side-by-side rather than sequentially in series.', isCorrect: false },
          { id: 'opt-3', label: 'Sidechain Compression', explanation: 'Sidechain compression relies on an external trigger source.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'reverbs-module',
    track: 'mixing',
    category: 'mix-element',
    title: 'Reverbs',
    subtitle: '6 Questions · Gated, Room, Plate, Spring & Hall',
    description: 'Explore acoustic chambers, mechanical plates, spring reverb tanks, and classic 80s gated reverb.',
    iconName: 'reverb',
    accentColor: 'teal',
    completionTitle: 'You did it! Your music sounds great in space! 🌌',
    completionSubtitle: 'Every sound has depth, dimension, and physical presence without muddy washiness.',
    questions: [
      {
        id: 'rev-1',
        prompt: 'Which of these will achieve the stereotypically 80s-sounding non-linear reverb?',
        contextKicker: 'Question 1 of 6',
        educationalTip: 'Gated Reverb cuts off abruptly before naturally decaying, popularized on 80s drums by artists like Genesis and Prince.',
        options: [
          { id: 'opt-1', label: 'Gated Reverb', explanation: 'Correct! A lush reverb tail abruptly severed by a noise gate created the iconic punchy 80s drum sound.', isCorrect: true, soundDemoType: 'gated' },
          { id: 'opt-2', label: 'Spring Reverb', explanation: 'Spring reverb produces bouncy surf twang.', isCorrect: false },
          { id: 'opt-3', label: 'Plate Reverb', explanation: 'Plate reverb has a smooth continuous decay.', isCorrect: false },
          { id: 'opt-4', label: 'Room Reverb', explanation: 'Room reverb models natural acoustic reflections.', isCorrect: false }
        ]
      },
      {
        id: 'rev-2',
        prompt: 'Which of these will be the best to glue instruments together in a warm small space while not adding too much expansiveness to the mix?',
        contextKicker: 'Question 2 of 6',
        educationalTip: 'Small Room Reverb (0.4s–0.9s decay) gives direct instruments cohesive acoustic reflections without pushing them into the background.',
        options: [
          { id: 'opt-1', label: 'Room Reverb', explanation: 'Correct! Room reverb provides early reflections that make studio recordings feel like they were performed together in one room.', isCorrect: true, soundDemoType: 'reverb' },
          { id: 'opt-2', label: 'Cathedral Reverb', explanation: 'Cathedral reverb is massive (4-8 seconds) and will completely wash out the mix.', isCorrect: false },
          { id: 'opt-3', label: 'Shimmer Reverb', explanation: 'Shimmer reverb pitch-shifts tails into glistening octaves.', isCorrect: false },
          { id: 'opt-4', label: 'Spring Reverb', explanation: 'Spring reverb has metallic resonance that does not sound like a natural room.', isCorrect: false }
        ]
      },
      {
        id: 'rev-3',
        prompt: 'Which of these will shimmer in an unnatural but pleasing way, especially nice on vocals?',
        contextKicker: 'Question 3 of 6',
        educationalTip: 'Plate Reverbs (such as the EMT 140) use a suspended steel plate with electromagnetic transducers for bright, shimmering density.',
        options: [
          { id: 'opt-1', label: 'Plate Reverb', explanation: 'Correct! Plate reverbs have a dense, bright diffusion that sits beautifully on vocals and strings.', isCorrect: true, soundDemoType: 'reverb' },
          { id: 'opt-2', label: 'Small Dry Room', explanation: 'A small dry room sounds neutral and woody.', isCorrect: false },
          { id: 'opt-3', label: 'Slapback Echo', explanation: 'Slapback is a distinct single delay tap, not a diffuse shimmering reverb.', isCorrect: false }
        ]
      },
      {
        id: 'rev-4',
        prompt: 'Which of these started as an effect built into guitar amps, creating a quick ringing vibration?',
        contextKicker: 'Question 4 of 6',
        educationalTip: 'Spring reverbs send audio through physical steel springs inside guitar amplifiers (like Fender Twin Reverbs).',
        options: [
          { id: 'opt-1', label: 'Spring Reverb', explanation: 'Correct! Spring reverbs mechanically bounce audio vibrations through helical springs.', isCorrect: true, soundDemoType: 'reverb' },
          { id: 'opt-2', label: 'Hall Reverb', explanation: 'Hall reverbs simulate physical concert halls.', isCorrect: false },
          { id: 'opt-3', label: 'Convolution Reverb', explanation: 'Convolution reverb uses mathematical impulse response processing.', isCorrect: false }
        ]
      },
      {
        id: 'rev-5',
        prompt: 'Which of these could take out muddiness from a reverb bus if there isn’t a filter on the plugin?',
        contextKicker: 'Question 5 of 6',
        educationalTip: 'The "Abbey Road Reverb Trick" inserts an EQ before/after the reverb, high-passing below 500Hz and low-passing above 6kHz.',
        options: [
          { id: 'opt-1', label: 'Parametric EQ (High-Pass at 500Hz & Low-Pass at 6kHz on the Reverb Aux Bus)', explanation: 'Correct! Filtering low rumble and harsh top sizzle before/after reverb (Abbey Road trick) keeps mixes clean and pristine.', isCorrect: true, soundDemoType: 'filter' },
          { id: 'opt-2', label: 'Chorus Plugin', explanation: 'A chorus plugin will thicken the mud even further.', isCorrect: false },
          { id: 'opt-3', label: 'Bitcrusher', explanation: 'Bitcrushing adds digital hash and noise to the reverb.', isCorrect: false }
        ]
      },
      {
        id: 'rev-6',
        prompt: 'Which of these could re-create a larger natural space like a cathedral, room, or concert hall?',
        contextKicker: 'Question 6 of 6',
        educationalTip: 'Hall Reverb and Convolution Reverbs sample or calculate physical multi-second acoustic decay envelopes.',
        options: [
          { id: 'opt-1', label: 'Hall Reverb / Convolution Reverb', explanation: 'Correct! Hall and Convolution reverbs simulate authentic large-scale physical architecture with expansive decay tails.', isCorrect: true, soundDemoType: 'reverb' },
          { id: 'opt-2', label: 'Spring Reverb', explanation: 'Spring reverbs are compact mechanical amp tanks with metallic twang.', isCorrect: false },
          { id: 'opt-3', label: 'Slapback Delay', explanation: 'Slapback delay is a single quick 100ms echo.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'delays-modulations',
    track: 'mixing',
    category: 'mix-element',
    title: 'Delays & Modulations',
    subtitle: '6 Questions · Slapback, Ping-Pong, Tremolo & Chorus',
    description: 'Explore slapback beef, stereo ping-pong movement, volume tremolo, and lush multi-voice doubling.',
    iconName: 'delay',
    accentColor: 'emerald',
    completionTitle: 'You did it! You added more flavor to your mix! 🎛️',
    completionSubtitle: 'Rhythmic movement, stereo depth, and modulation without cluttering your stereo center.',
    questions: [
      {
        id: 'dm-1',
        prompt: 'Which would create a slapback delay to beef up the sound of an individual instrument?',
        contextKicker: 'Question 1 of 6',
        educationalTip: 'Slapback delay uses a single echo tap between 70ms and 140ms with 0% feedback, famous in rockabilly and John Lennon vocals.',
        options: [
          { id: 'opt-1', label: 'Short Delay (70ms – 120ms) with 0% or low feedback', explanation: 'Correct! A single tight delay repetition thickens signals without creating rhythmic clutter.', isCorrect: true },
          { id: 'opt-2', label: 'Ping-Pong Delay with 2000ms delay and 80% feedback', explanation: 'A 2-second high feedback delay creates long echoing repeats, not a tight slapback.', isCorrect: false },
          { id: 'opt-3', label: 'Cathedral Reverb', explanation: 'Reverb is diffuse reflections, not a clean single slapback delay tap.', isCorrect: false }
        ]
      },
      {
        id: 'dm-2',
        prompt: 'Which delay settings would create a back and forth ping-pong effect?',
        contextKicker: 'Question 2 of 6',
        educationalTip: 'Ping-pong delay alternates repeating echoes across the Left and Right stereo channels.',
        options: [
          { id: 'opt-1', label: 'Stereo Ping-Pong Delay (alternating Left and Right output channels)', explanation: 'Correct! Ping-pong mode bounces each repetition between the left and right speakers for rhythmic stereo interest.', isCorrect: true },
          { id: 'opt-2', label: 'Mono Tape Delay centered in the middle', explanation: 'A mono delay plays strictly in the phantom center.', isCorrect: false },
          { id: 'opt-3', label: 'High-Pass Filter', explanation: 'A filter shapes tone, not stereo delay bouncing.', isCorrect: false }
        ]
      },
      {
        id: 'dm-3',
        prompt: 'Which simple delay setting would create more depth in the mix while avoiding the potential washiness of a reverb?',
        contextKicker: 'Question 3 of 6',
        educationalTip: 'A tempo-synced 1/4 or 1/8 note delay tucked 15–20dB below the lead track provides spatial depth without cluttering the mix.',
        options: [
          { id: 'opt-1', label: 'Tempo-synced 1/4 or 1/8 note delay tucked low in the mix', explanation: 'Correct! Delays provide clear spatial separation without the muddy diffuse cloud that long reverbs create.', isCorrect: true },
          { id: 'opt-2', label: '10-Second Wet Cathedral Reverb', explanation: 'A 10-second cathedral reverb is the textbook definition of washiness.', isCorrect: false },
          { id: 'opt-3', label: 'Fast Tremolo', explanation: 'Tremolo creates volume flutter, not spatial depth.', isCorrect: false }
        ]
      },
      {
        id: 'dm-4',
        prompt: 'Which would add a wobble in volume?',
        contextKicker: 'Question 4 of 6',
        educationalTip: 'Tremolo modulates Amplitude (volume). Vibrato modulates Pitch. Don’t confuse the two!',
        options: [
          { id: 'opt-1', label: 'Tremolo', explanation: 'Correct! Tremolo is the periodic modulation of volume/amplitude via an LFO.', isCorrect: true, soundDemoType: 'tremolo' },
          { id: 'opt-2', label: 'Vibrato', explanation: 'Vibrato modulates pitch (frequency), not volume.', isCorrect: false },
          { id: 'opt-3', label: 'Chorus', explanation: 'Chorus combines pitch modulation and delay.', isCorrect: false },
          { id: 'opt-4', label: 'Flanger', explanation: 'Flangers use time-swept comb filtering.', isCorrect: false }
        ]
      },
      {
        id: 'dm-5',
        prompt: 'Which sweeping effect is a big part of many funk guitarists’ sound?',
        contextKicker: 'Question 5 of 6',
        educationalTip: 'Envelope filters (Auto-Wah) and Phasers create sweeping resonant filter peaks responsive to pick attack.',
        options: [
          { id: 'opt-1', label: 'Envelope Filter / Auto-Wah / Phaser', explanation: 'Correct! Envelope filters sweep resonant filter peaks with strumming dynamics, iconic in funk guitar.', isCorrect: true, soundDemoType: 'filter' },
          { id: 'opt-2', label: 'Hard Limiter', explanation: 'A limiter chops off volume peaks without filter sweeps.', isCorrect: false },
          { id: 'opt-3', label: 'Gated Reverb', explanation: 'Gated reverb is an 80s drum effect.', isCorrect: false }
        ]
      },
      {
        id: 'dm-6',
        prompt: 'Which would mix in a duplicated signal to bring a wider multi-voiced sound?',
        contextKicker: 'Question 6 of 6',
        educationalTip: 'Chorus and Doublers clone the audio, modulate the pitch slightly (±5–10 cents), and offset timing by 15–30ms.',
        options: [
          { id: 'opt-1', label: 'Chorus / Stereo Doubler', explanation: 'Correct! Chorus blends delayed and pitch-modulated duplicates to simulate an ensemble of multiple voices.', isCorrect: true, soundDemoType: 'chorus' },
          { id: 'opt-2', label: 'De-Esser', explanation: 'De-essers clamp down sibilance on high frequencies.', isCorrect: false },
          { id: 'opt-3', label: 'Noise Gate', explanation: 'Noise gates mute unwanted audio below a set threshold.', isCorrect: false },
          { id: 'opt-4', label: 'Tremolo', explanation: 'Tremolo pulses volume without creating multi-voice doubling.', isCorrect: false }
        ]
      }
    ]
  }
];
