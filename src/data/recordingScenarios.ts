import { Scenario } from '../types/game';

export const recordingScenarios: Scenario[] = [
  {
    id: 'recording-vocals',
    track: 'recording',
    category: 'instrument',
    title: 'Vocals',
    subtitle: '11 Questions · Mic Choice, Pop Filters, Phantom Power & Patterns',
    description: 'Master studio and live vocal tracking: mic capsules, polar patterns, pop filters, shockmounts, and +48V phantom power.',
    iconName: 'vocal-mic',
    accentColor: 'indigo',
    completionTitle: 'You did it! Your vocal recording sounds good! 🎙️',
    completionSubtitle: 'Zero plosives, perfect cardioid isolation, and pristine studio capture with +48V power and shockmount protection.',
    questions: [
      {
        id: 'rec-vox-1',
        prompt: 'Which would help you avoid plosives on the mic?',
        contextKicker: 'Question 1 of 11',
        educationalTip: 'Plosives ("P" and "B" bursts of air) produce rapid pressure waves that overload condenser mic capsules. A pop filter diffuses this air blast.',
        options: [
          { id: 'opt-1', label: 'Pop Filter (Nylon / Metal Mesh)', explanation: 'Correct! A pop filter placed 2–4 inches in front of the capsule diffuses wind bursts from "P" and "B" sounds.', isCorrect: true },
          { id: 'opt-2', label: 'Shockmount', explanation: 'A shockmount isolates mechanical floor vibrations, not acoustic air bursts.', isCorrect: false },
          { id: 'opt-3', label: 'XLR Cable', explanation: 'An XLR cable carries electrical signal; it has no effect on physical air blasts.', isCorrect: false },
          { id: 'opt-4', label: 'Phantom Power Switch', explanation: 'Phantom power energizes active condenser circuitry, but cannot stop mechanical air pressure.', isCorrect: false }
        ]
      },
      {
        id: 'rec-vox-2',
        prompt: 'Which is the standard type of microphone choice for live vocals?',
        contextKicker: 'Question 2 of 11',
        educationalTip: 'Handheld dynamic microphones are the worldwide industry standard for live performance due to their ruggedness and feedback rejection.',
        options: [
          { id: 'opt-1', label: 'Handheld Dynamic Microphone', explanation: 'Correct! Handheld dynamic mics are rugged, resist feedback, and deliver clear live vocal presence.', isCorrect: true },
          { id: 'opt-2', label: 'Large Diaphragm Studio Condenser', explanation: 'Delicate studio condensers pick up intense stage bleed and feedback.', isCorrect: false },
          { id: 'opt-3', label: 'Delicate Studio Ribbon Microphone', explanation: 'Ribbon mics have fragile aluminum ribbons that easily capture stage noise and feedback.', isCorrect: false },
          { id: 'opt-4', label: 'Piezo Acoustic Contact Pickup', explanation: 'Piezo transducers attach to acoustic instrument bridges and sound harsh on human voices.', isCorrect: false }
        ]
      },
      {
        id: 'rec-vox-3',
        prompt: 'Which will help you avoid handling noise and keep a condenser mic in place?',
        contextKicker: 'Question 3 of 11',
        educationalTip: 'Shockmounts use elastic suspension bands to float the microphone body, stopping footsteps and mic stand bumps from reaching the capsule.',
        options: [
          { id: 'opt-1', label: 'Shockmount (Elastic Suspension Cradle)', explanation: 'Correct! Shockmounts decouple the microphone mechanically so room footsteps and stand rumble never reach the recording.', isCorrect: true },
          { id: 'opt-2', label: 'Standard Plastic Mic Clip', explanation: 'A hard plastic clip couples the stand vibrations directly into the mic body.', isCorrect: false },
          { id: 'opt-3', label: 'Gaffer Tape', explanation: 'Taping the mic to a stand creates rigid physical contact that transfers foot thumps.', isCorrect: false },
          { id: 'opt-4', label: 'Foam Windscreen', explanation: 'Foam screens diffuse wind, not structural stand vibration.', isCorrect: false }
        ]
      },
      {
        id: 'rec-vox-4',
        prompt: 'Which will help you avoid the negative effects of an overly reverberant room?',
        contextKicker: 'Question 4 of 11',
        educationalTip: 'Curved acoustic vocal shields / reflection filters absorb rear and side soundwaves before they bounce around untreated drywall.',
        options: [
          { id: 'opt-1', label: 'Vocal Reflection Filter / Acoustic Baffle Shield', explanation: 'Correct! Portable reflection shields sit behind the mic to absorb reflections and maintain dry, clean vocal takes.', isCorrect: true },
          { id: 'opt-2', label: 'Point mic directly at a bare concrete wall', explanation: 'Pointing at a bare wall guarantees harsh slapback flutter echoes.', isCorrect: false },
          { id: 'opt-3', label: 'Turning preamp gain to 100%', explanation: 'Cranking preamp gain brings quiet room reflections and room noise up even louder.', isCorrect: false },
          { id: 'opt-4', label: 'Removing the pop filter', explanation: 'Removing the pop filter invites plosives and does nothing for room acoustics.', isCorrect: false }
        ]
      },
      {
        id: 'rec-vox-5',
        prompt: 'Which would be the standard mic type for recording vocals in a studio?',
        contextKicker: 'Question 5 of 11',
        educationalTip: 'Large Diaphragm Condensers (LDCs) feature wide frequency response, fast transient sensitivity, and low self-noise, capturing full vocal nuance.',
        options: [
          { id: 'opt-1', label: 'LDC (Large Diaphragm Condenser)', explanation: 'Correct! Large diaphragm condenser mics are the quintessential studio vocal microphones for rich detail and depth.', isCorrect: true },
          { id: 'opt-2', label: 'Kick Drum Mic', explanation: 'Kick drum mics are tuned with scooped mids and heavy sub frequencies, making them too muffled and boomy for studio vocal tracking.', isCorrect: false },
          { id: 'opt-3', label: 'SDC (Small Diaphragm Condenser)', explanation: 'While pencil condensers excel on acoustic guitars and cymbals, their smaller capsules can sound overly thin or clinical for studio lead vocals.', isCorrect: false },
          { id: 'opt-4', label: 'Dynamic Instrument Mic (SM57-style)', explanation: 'Instrument dynamics handle loud guitar amps and snares, but lack the airy top-end detail and nuance of a studio vocal condenser.', isCorrect: false }
        ]
      },
      {
        id: 'rec-vox-6',
        prompt: 'Which setting is required for use of condenser microphones?',
        contextKicker: 'Question 6 of 11',
        educationalTip: 'Condenser mics require an external direct-current voltage (+48V Phantom Power) to charge the capacitor plates and power internal impedance converters.',
        options: [
          { id: 'opt-1', label: '+48V Phantom Power', explanation: 'Correct! Condenser microphones must have +48V phantom power active through the balanced XLR connection to function.', isCorrect: true },
          { id: 'opt-2', label: '-20dB Pad', explanation: 'A pad attenuates loud signals; it does not supply operating electricity.', isCorrect: false },
          { id: 'opt-3', label: 'Phase Invert Switch (Ø)', explanation: 'Phase invert inverts the electrical polarity of the audio waveform.', isCorrect: false },
          { id: 'opt-4', label: 'Line / Instrument Hi-Z Mode', explanation: 'Hi-Z mode is for high-impedance electric guitars and basses, not low-impedance microphones.', isCorrect: false }
        ]
      },
      {
        id: 'rec-vox-7',
        prompt: 'Which would hold the mic on the stand in a live setting?',
        contextKicker: 'Question 7 of 11',
        educationalTip: 'A standard durable threaded mic clip grips handheld dynamic mics securely on stage.',
        options: [
          { id: 'opt-1', label: 'Mic Clip', explanation: 'Correct! A standard mic clip screws onto a stage boom stand and allows quick insertion and removal for the singer.', isCorrect: true },
          { id: 'opt-2', label: 'Large Elastic Spider Shockmount', explanation: 'Spider mounts are bulky, fragile, and clumsy for live stage movement.', isCorrect: false },
          { id: 'opt-3', label: 'Gaffer Tape Ball', explanation: 'Taping mics to stands is unprofessional and insecure on stage.', isCorrect: false }
        ]
      },
      {
        id: 'rec-vox-8',
        prompt: 'Which is the most common polar pattern for a vocal microphone (picks up front, rejects rear)?',
        contextKicker: 'Question 8 of 11',
        educationalTip: 'A cardioid (heart-shaped) polar pattern has maximum sensitivity directly on-axis (0°) and total rejection at 180° (rear).',
        options: [
          { id: 'opt-1', label: 'Cardioid Polar Pattern', explanation: 'Correct! Cardioid polar patterns capture sound from the front while rejecting sound from behind, avoiding stage bleed and feedback.', isCorrect: true },
          { id: 'opt-2', label: 'Omnidirectional Pattern', explanation: 'Omni mics pick up sound equally in a 360-degree sphere from all directions.', isCorrect: false },
          { id: 'opt-3', label: 'Figure-8 (Bidirectional) Pattern', explanation: 'Figure-8 captures sound equally from front and rear while rejecting the sides.', isCorrect: false },
          { id: 'opt-4', label: 'Shotgun / Line Gradient Pattern', explanation: 'Shotgun mics use long interference tubes for narrow long-range capture, standard in film boom work rather than studio music vocals.', isCorrect: false }
        ]
      },
      {
        id: 'rec-vox-9',
        prompt: 'Which would help you hear yourself as you record (without sound bleeding into the mic)?',
        contextKicker: 'Question 9 of 11',
        educationalTip: 'Closed-back headphones seal acoustic energy around the singer’s ears, preventing headphone click track and backing music bleed into the vocal mic.',
        options: [
          { id: 'opt-1', label: 'Closed-Back Studio Headphones', explanation: 'Correct! Closed-back headphones prevent acoustic bleed from leaking into the sensitive studio vocal mic during tracking.', isCorrect: true },
          { id: 'opt-2', label: 'Open-Back Studio Headphones', explanation: 'Open-back headphones leak loud audio into the room, risking click-track bleed into the vocal mic.', isCorrect: false },
          { id: 'opt-3', label: 'Studio Monitor Speakers', explanation: 'Studio monitors in the tracking room will cause intense feedback and severe backing track bleed into the mic.', isCorrect: false }
        ]
      },
      {
        id: 'rec-vox-10',
        prompt: 'Which cable would connect a microphone to a preamp or audio interface?',
        contextKicker: 'Question 10 of 11',
        educationalTip: 'Standard balanced 3-pin XLR cables carry differential audio signals (Pin 1 Ground, Pin 2 Hot, Pin 3 Cold), rejecting RF interference.',
        options: [
          { id: 'opt-1', label: '3-Pin Balanced XLR Cable', explanation: 'Correct! XLR cables supply balanced low-impedance connection and carry +48V phantom power safely.', isCorrect: true },
          { id: 'opt-2', label: '1/4" TS Unbalanced Instrument Cable', explanation: 'TS cables are unbalanced, susceptible to noise, and cannot carry phantom power.', isCorrect: false },
          { id: 'opt-3', label: 'RCA Stereo Cable', explanation: 'RCA cables are unbalanced consumer cables for stereo line-level audio.', isCorrect: false },
          { id: 'opt-4', label: '3.5mm Aux Cable', explanation: 'Aux cables are unbalanced consumer headphone connections.', isCorrect: false }
        ]
      },
      {
        id: 'rec-vox-11',
        prompt: 'Which recording technique could make a vocal sound powerful and exciting on a chorus?',
        contextKicker: 'Question 11 of 11',
        educationalTip: 'Recording the same vocal multiple times (vocal doubling) and panning or layering them creates a massive, lush, chorus-ready vocal stack.',
        options: [
          { id: 'opt-1', label: 'Recording the same vocal multiple times / Vocal Doubling', explanation: 'Correct! Vocal doubling thickens the sound naturally through slight timing and pitch variations between takes.', isCorrect: true },
          { id: 'opt-2', label: 'Placing the mic 20 feet away in another room', explanation: 'Distant mic placement results in a washed-out, distant acoustic room tone rather than an intimate powerful chorus.', isCorrect: false },
          { id: 'opt-3', label: 'Turning off phantom power', explanation: 'Turning off phantom power disables the condenser microphone entirely.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'recording-drums',
    track: 'recording',
    category: 'instrument',
    title: 'Drum Set',
    subtitle: '7 Questions · Snare Micing, Phase Issues & Overhead Pairs',
    description: 'Capture acoustic drums: SM57 snare top/bottom techniques, overhead stereo phase alignment, and kick mic selections.',
    iconName: 'drum-set',
    accentColor: 'orange',
    completionTitle: 'You did it! Your drums are being recorded well! 🥁',
    completionSubtitle: 'Massive punch, tight stereo imaging, aligned phase coherence, and crisp snare wire sizzle.',
    questions: [
      {
        id: 'rec-drum-1',
        prompt: 'Which would be a standard choice (live or recording) for miking a snare drum?',
        contextKicker: 'Question 1 of 7',
        educationalTip: 'The standard cardioid dynamic instrument microphone has been the undisputed gold standard for snare drums for over 50 years due to its high SPL handling and presence peak.',
        options: [
          { id: 'opt-1', label: 'Dynamic Instrument Microphone', explanation: 'Correct! A dynamic instrument mic handles immense sound pressure levels (SPL) and has a distinct midrange crack tailored for snares.', isCorrect: true },
          { id: 'opt-2', label: 'Large Diaphragm Condenser (LDC)', explanation: 'A delicate large diaphragm condenser would risk diaphragm damage or clipping from close snare hits and rogue drumstick strikes.', isCorrect: false },
          { id: 'opt-3', label: 'Ribbon Microphone', explanation: 'Ribbon diaphragms can be damaged by sudden high-velocity drumstick air displacement.', isCorrect: false },
          { id: 'opt-4', label: 'Lavalier Clip Mic', explanation: 'Lavaliers are made for speech lapels and cannot handle high drum pressure levels.', isCorrect: false }
        ]
      },
      {
        id: 'rec-drum-2',
        prompt: 'Which technique would allow you to capture more of the sizzle of the snare drum?',
        contextKicker: 'Question 2 of 7',
        educationalTip: 'Placing a second microphone underneath the snare pointed at the metal snare wires captures the crisp, buzzing sizzle.',
        options: [
          { id: 'opt-1', label: 'Under-Snare Mic (Snare Bottom) pointing at the wires with inverted phase (Ø)', explanation: 'Correct! An under-snare mic captures the snappy snare wire response. Because the bottom head moves away while the top moves down, inverting phase is essential!', isCorrect: true },
          { id: 'opt-2', label: 'Moving the top mic 6 feet back into the room', explanation: 'Moving back captures more room acoustics and cymbals, losing snare sizzle.', isCorrect: false },
          { id: 'opt-3', label: 'Wrapping the snare drum in thick bath towels', explanation: 'Towels completely mute and deaden the snare drum.', isCorrect: false }
        ]
      },
      {
        id: 'rec-drum-3',
        prompt: 'Which potential problem would you want to be aware of when placing two overhead microphones?',
        contextKicker: 'Question 3 of 7',
        educationalTip: 'If two overhead mics are slightly different distances from the snare drum, the sound arrives at different times, causing comb filtering and Phase Cancellation.',
        options: [
          { id: 'opt-1', label: 'Phase Cancellation (Comb Filtering)', explanation: 'Correct! When overhead mics receive snare hits at slight time differences, out-of-phase waveforms cancel out punch and thin the snare sound.', isCorrect: true },
          { id: 'opt-2', label: 'Magnetic Battery Overheating', explanation: 'Overhead microphones do not overheat drum kits.', isCorrect: false },
          { id: 'opt-3', label: 'Excessive Digital Quantization', explanation: 'Quantization error is related to digital bit depth, not acoustic microphone placement.', isCorrect: false }
        ]
      },
      {
        id: 'rec-drum-4',
        prompt: 'Which technique would capture the balanced sound of the entire drum set with stereo width?',
        contextKicker: 'Question 4 of 7',
        educationalTip: 'Spaced Pair (A/B), ORTF, or the classic 3-mic Glyn Johns overhead technique captures the full kit image and cymbal wash with balanced perspective.',
        options: [
          { id: 'opt-1', label: 'Spaced Pair (A/B) or Glyn Johns Overhead Technique', explanation: 'Correct! Spaced pair or Glyn Johns placement captures realistic stereo spread and balanced cymbal/kit imaging.', isCorrect: true },
          { id: 'opt-2', label: 'A single microphone placed inside the snare drum cavity', explanation: 'Inside the snare only captures boxy snare rattle, missing cymbals and kick entirely.', isCorrect: false },
          { id: 'opt-3', label: 'Direct Injection (DI) box into the hi-hat stand', explanation: 'Drum kits are acoustic instruments; you cannot plug an acoustic hi-hat into a DI box!', isCorrect: false }
        ]
      },
      {
        id: 'rec-drum-5',
        prompt: 'Which mic would be a standard option for miking a kick drum?',
        contextKicker: 'Question 5 of 7',
        educationalTip: 'Large diaphragm dynamic kick microphones are tuned with pre-contoured EQ curves boosting 60Hz thump and 4kHz click.',
        options: [
          { id: 'opt-1', label: 'Large Diaphragm Kick Microphone', explanation: 'Correct! These large-diaphragm dynamic kick microphones are tailored specifically for huge sub-lows and punchy beater attack.', isCorrect: true },
          { id: 'opt-2', label: 'Small Diaphragm Condenser Pencil Mic', explanation: 'Pencil condensers have small capsules that can be overwhelmed by kick port air blasts.', isCorrect: false },
          { id: 'opt-3', label: 'Handheld Dynamic Vocal Mic', explanation: 'Handheld dynamic vocal mics have a built-in bass rolloff designed for vocal proximity, lacking deep 50Hz sub punch.', isCorrect: false }
        ]
      },
      {
        id: 'rec-drum-6',
        prompt: 'Which would change the physical sound of the drums (frequently used in jazz music)?',
        contextKicker: 'Question 6 of 7',
        educationalTip: 'Wire drum brushes replace wooden drumsticks, creating soft, swooshing legato sweeps and gentle tapping typical of jazz ballads.',
        options: [
          { id: 'opt-1', label: 'Drum Brushes / Rutes', explanation: 'Correct! Wire brushes allow jazz drummers to stir and sweep across coated snare heads for smooth textured rhythms.', isCorrect: true },
          { id: 'opt-2', label: 'Heavy Metal Marching Drumsticks', explanation: 'Heavy wooden sticks produce intense loud cracks, not gentle jazz textures.', isCorrect: false },
          { id: 'opt-3', label: 'Plastic Triangle Mallet', explanation: 'Triangle mallets will damage drumheads and produce a thin click.', isCorrect: false }
        ]
      },
      {
        id: 'rec-drum-7',
        prompt: 'Which type of dynamic microphone would be a premier choice for miking toms?',
        contextKicker: 'Question 7 of 7',
        educationalTip: 'A large-diaphragm dynamic microphone is legendary for its deep low-end response, smooth highs, and fast tom transients.',
        options: [
          { id: 'opt-1', label: 'Large-Diaphragm Dynamic Tom Mic', explanation: 'Correct! A large-diaphragm dynamic tom mic has an extended low-frequency response and high SPL handling, making it the premier tom-tom mic choice.', isCorrect: true },
          { id: 'opt-2', label: 'Lavalier Lapel Microphone', explanation: 'Lavalier mics are made for television dialogue, not heavy drum acoustic impacts.', isCorrect: false },
          { id: 'opt-3', label: 'Smartphone Microphone', explanation: 'Smartphone mics clip heavily and have noisy converters.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'recording-guitar',
    track: 'recording',
    category: 'instrument',
    title: 'Electric Guitar (Amp Miking)',
    subtitle: '2 Questions · Live Dynamic Mics & Speaker Cone Placement',
    description: 'Mic tube amplifiers for live sound: select durable dynamic mics and speaker cone placement.',
    iconName: 'electric-guitar',
    accentColor: 'amber',
    completionTitle: 'You did it! Your electric guitar recording sounds good! 🎸',
    completionSubtitle: 'Warm analog drive, zero cone fizz, and rich spatial air captured right from the amplifier cabinet.',
    questions: [
      {
        id: 'rec-eg-1',
        prompt: 'Which type of microphone is most commonly used for miking a loud electric guitar amplifier on a live sound stage due to its durability and high SPL handling?',
        contextKicker: 'Question 1 of 2',
        educationalTip: 'Moving-coil dynamic instrument microphones are rugged and handle extreme sound pressure levels without distorting.',
        options: [
          { id: 'opt-1', label: 'Dynamic Instrument Microphone (moving-coil)', explanation: 'Correct! Dynamic instrument mics are built rugged to handle immense live amplifier volume and reject stage bleed.', isCorrect: true },
          { id: 'opt-2', label: 'Vintage Tube Condenser Microphone', explanation: 'Delicate tube condensers can be easily damaged by high SPLs and pick up excessive stage bleed.', isCorrect: false },
          { id: 'opt-3', label: 'Delicate Studio Ribbon Microphone', explanation: 'Ribbon mics have fragile foil ribbons that can be blown by strong guitar cab air blasts.', isCorrect: false }
        ]
      },
      {
        id: 'rec-eg-2',
        prompt: 'Which amp mic placement technique will give you a more mellow, warm tone?',
        contextKicker: 'Question 2 of 2',
        educationalTip: 'Moving the microphone toward the outer rim/edge of the speaker cone or angling it off-axis softens harsh highs and captures warm low-mids.',
        options: [
          { id: 'opt-1', label: 'Positioning the mic toward the outer edge of the speaker cone or angled off-axis', explanation: 'Correct! The outer edge of the speaker cone vibrates with darker, warmer tone, rolling off ice-pick treble.', isCorrect: true },
          { id: 'opt-2', label: 'Aiming the close mic straight on-axis at the center dust cap', explanation: 'The center dust cap produces the most shrill, piercing high-frequency response.', isCorrect: false },
          { id: 'opt-3', label: 'Using a bright small-diaphragm condenser close on the center cap', explanation: 'A bright condenser close on the center cap exaggerates harsh high frequencies.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'recording-acoustic',
    track: 'recording',
    category: 'instrument',
    title: 'Acoustic Guitar',
    subtitle: '4 Questions · 12th Fret Sweet Spot, Stereo Pairs & Mics',
    description: 'Master acoustic guitar recording: find the 12th-fret balance sweet spot, avoid soundhole proximity mud, and choose pencil condensers.',
    iconName: 'acoustic-guitar',
    accentColor: 'emerald',
    completionTitle: 'You did it! Your acoustic guitar recording sounds good! 🪕',
    completionSubtitle: 'Crisp string detail, full woody resonance, and zero boomy soundhole buildup.',
    questions: [
      {
        id: 'rec-ag-1',
        prompt: 'Which is the generally recommended starting placement for recording an acoustic guitar with a single mic?',
        contextKicker: 'Question 1 of 4',
        educationalTip: 'Pointing a microphone at the 12th fret (where the neck meets the body) from 6–10 inches away balances string sparkle and warm body resonance without low mud.',
        options: [
          { id: 'opt-1', label: 'Pointed at the 12th Fret (angled slightly toward the soundhole from 6–10 inches away)', explanation: 'Correct! The 12th fret yields the optimal balance of fretboard articulation, string sparkle, and body tone.', isCorrect: true },
          { id: 'opt-2', label: 'Stuffed directly inside the soundhole', explanation: 'Placing a mic in the soundhole captures unbearable low-frequency air pressure and boomy mud.', isCorrect: false },
          { id: 'opt-3', label: 'Behind the headstock pointing at the tuning pegs', explanation: 'The headstock produces minimal sound projection compared to the guitar top.', isCorrect: false },
          { id: 'opt-4', label: 'Placed 3 feet away pointing directly at the player\'s chest', explanation: 'This captures vocal breath and body movement rather than guitar string articulation.', isCorrect: false }
        ]
      },
      {
        id: 'rec-ag-2',
        prompt: 'Why might you want to avoid pointing a studio microphone directly into the acoustic guitar’s soundhole?',
        contextKicker: 'Question 2 of 4',
        educationalTip: 'The soundhole acts as a Helmholtz resonator. Direct close micing results in massive 100Hz–250Hz low-frequency resonance and proximity boom.',
        options: [
          { id: 'opt-1', label: 'Massive low-frequency resonance and proximity boom (100Hz–250Hz) overwhelm the recording', explanation: 'Correct! The soundhole acts as an acoustic bass port, generating boomy, muddy low-end buildup that overloads the microphone.', isCorrect: true },
          { id: 'opt-2', label: 'It will capture unwanted room flutter echoes', explanation: 'Room reflections depend on room acoustics, whereas soundhole micing generates direct resonant boom.', isCorrect: false },
          { id: 'opt-3', label: 'The guitar strings will become completely inaudible', explanation: 'Strings remain audible, but are drowned out by overpowering resonant boom.', isCorrect: false }
        ]
      },
      {
        id: 'rec-ag-3',
        prompt: 'Which type of microphone is widely revered in studios for capturing delicate acoustic guitar fingerpicking?',
        contextKicker: 'Question 3 of 4',
        educationalTip: 'Small Diaphragm Condensers (SDC / "Pencil" mics) have ultra-light diaphragms that react instantly to fast transients.',
        options: [
          { id: 'opt-1', label: 'Small Diaphragm Condenser (SDC "Pencil" Mic)', explanation: 'Correct! Small diaphragm condensers have unmatched transient accuracy and consistent off-axis frequency response, ideal for acoustic strings.', isCorrect: true },
          { id: 'opt-2', label: 'Kick Drum Mic', explanation: 'Kick mics are pre-equalized for sub-lows and muffled highs, totally wrong for delicate acoustic guitar.', isCorrect: false },
          { id: 'opt-3', label: 'Handheld Vocal Microphone', explanation: 'Vocal dynamic mics lack the high-frequency air and transient speed of a studio condenser.', isCorrect: false }
        ]
      },
      {
        id: 'rec-ag-4',
        prompt: 'Which stereo micing technique uses two microphones angled at 90° with capsules nearly touching to prevent phase cancellation?',
        contextKicker: 'Question 4 of 4',
        educationalTip: 'The XY Coincident Pair places two directional capsules as close as physically possible to eliminate time arrival differences and phase comb filtering.',
        options: [
          { id: 'opt-1', label: 'XY Coincident Pair', explanation: 'Correct! Because the capsules are in the exact same point in space (coincident), arrival times are identical, providing excellent stereo width with zero phase cancellation.', isCorrect: true },
          { id: 'opt-2', label: 'A single dynamic mic placed 6 feet back facing the side wall', explanation: 'Side wall placement captures muddy room reflections rather than direct instrument stereo image.', isCorrect: false },
          { id: 'opt-3', label: 'A single large-diaphragm condenser placed 4 feet away pointing at the bridge', explanation: 'A single mic placed 4 feet away is mono, not a coincident stereo pair.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'recording-bass-synths',
    track: 'recording',
    category: 'instrument',
    title: 'Piano, Keys, & Bass',
    subtitle: '7 Questions · DI Boxes, Grand Piano Micing, Isolation & Synths',
    description: 'Master tracking keys and bass: DI boxes, acoustic grand piano stereo micing, piano isolation, and analog synthesizers.',
    iconName: 'acoustic-piano',
    accentColor: 'rose',
    completionTitle: 'You did it! Your piano, keys & bass tracking is world-class! 🎹🎚️',
    completionSubtitle: 'Pristine sub fundamental clarity, lush acoustic piano soundboard depth, and warm analog synth character.',
    questions: [
      {
        id: 'rec-bs-1',
        prompt: 'Which standard studio tool converts a high-impedance instrument signal into a low-impedance balanced mic signal?',
        contextKicker: 'Question 1 of 7',
        options: [
          { id: 'opt-1', label: 'Direct Injection (DI) Box', explanation: 'Correct! A Direct Injection (DI) box matches electrical impedance and balances the line, converting unbalanced high-Z instrument signals into balanced low-Z mic-level signals for clean direct recording.', isCorrect: true },
          { id: 'opt-2', label: 'Guitar Capo', explanation: 'A capo clamps frets on stringed instruments, performing no electronic conversion.', isCorrect: false },
          { id: 'opt-3', label: 'Pop Filter', explanation: 'A pop filter stops vocal plosive air, not electrical impedance.', isCorrect: false }
        ]
      },
      {
        id: 'rec-bs-2',
        prompt: 'When tracking an electric bass or synth through a DI box, which switch helps eliminate unwanted 60Hz electrical hum or ground loop buzz?',
        contextKicker: 'Question 2 of 7',
        educationalTip: 'A ground loop occurs when interconnected studio equipment shares different electrical ground paths. Flipping the Ground Lift switch disconnects Pin 1 to break the loop and silence the buzz.',
        options: [
          { id: 'opt-1', label: 'Ground Lift Switch', explanation: 'Correct! The Ground Lift switch disconnects Pin 1 (ground) between the instrument and the interface to break ground loops and eliminate 60Hz AC buzz.', isCorrect: true },
          { id: 'opt-2', label: 'Pad Switch (-20dB)', explanation: 'A pad switch attenuates loud incoming signals to prevent clipping, but does not isolate electrical ground hum.', isCorrect: false },
          { id: 'opt-3', label: 'Polarity / Phase Invert Switch (Ø)', explanation: 'Phase invert flips the audio waveform 180 degrees, but does not stop continuous 60Hz ground buzz.', isCorrect: false }
        ]
      },
      {
        id: 'rec-bs-3',
        prompt: 'How does adjusting the piano lid position (Full-Stick vs. Half-Stick) affect acoustic piano tracking?',
        contextKicker: 'Question 3 of 7',
        options: [
          { id: 'opt-1', label: 'Full-Stick opens the lid fully for maximum projection and brightness, while Half-Stick lowers volume and dampens high-frequency harshness.', explanation: 'Correct! Using full-stick is standard for classical and prominent pop piano, whereas half-stick helps tame high frequencies and blend with a busy band.', isCorrect: true },
          { id: 'opt-2', label: 'Lid positions only change the piano key color.', explanation: 'Lid position physically directs sound projection and acoustic dispersion.', isCorrect: false },
          { id: 'opt-3', label: 'Lowering the lid turns the grand piano into an electric guitar.', explanation: 'A piano remains an acoustic string instrument regardless of lid position.', isCorrect: false }
        ]
      },
      {
        id: 'rec-bs-4',
        prompt: 'When recording an acoustic grand piano, which micing approach is widely used to capture a balanced, expansive stereo soundstage?',
        contextKicker: 'Question 4 of 7',
        options: [
          { id: 'opt-1', label: 'Using a stereo pair (such as spaced A/B, ORTF, or Blumlein) positioned over the open soundboard and curved lid', explanation: 'Correct! Spaced or coincident stereo pairs overlooking the open soundboard capture wide, natural piano resonance and hammer transients.', isCorrect: true },
          { id: 'opt-2', label: 'Taping a single dynamic handheld mic directly onto the soundboard wood', explanation: 'Taping a mic directly to the soundboard deadens string vibration and introduces mechanical thumps.', isCorrect: false },
          { id: 'opt-3', label: 'Placing a boundary mic flat on the floor underneath the piano bench', explanation: 'Floor placement under the bench captures foot shuffling rather than piano soundboard projection.', isCorrect: false }
        ]
      },
      {
        id: 'rec-bs-5',
        prompt: 'How can you achieve a tighter, more isolated acoustic piano sound when recording live in the same room with drums and guitars?',
        contextKicker: 'Question 5 of 7',
        options: [
          { id: 'opt-1', label: 'Using acoustic gobos/baffles around the piano and close-micing with directional cardioid or supercardioid condensers', explanation: 'Correct! Acoustic baffles and close directional mics reject room bleed and instrument spill while maintaining tight piano articulation.', isCorrect: true },
          { id: 'opt-2', label: 'Removing the piano lid entirely and opening all studio doors to the hallway', explanation: 'Removing lids and opening doors invites massive acoustic bleed from the entire building.', isCorrect: false },
          { id: 'opt-3', label: 'Placing the piano outside in the parking lot with an XLR cable', explanation: 'Outdoor placement exposes instruments to weather, traffic noise, and temperature shifts.', isCorrect: false }
        ]
      },
      {
        id: 'rec-bs-6',
        prompt: 'What is considered the industry best practice for recording electric bass in modern music production?',
        contextKicker: 'Question 6 of 7',
        options: [
          { id: 'opt-1', label: 'Dual Tracking: Clean DI (for sub definition) + Mic on Bass Amp (for character and grit)', explanation: 'Correct! Simultaneously recording a clean DI track (for deep, pure low-end foundation) and an amplifier mic track (for warm midrange grit and speaker breakup) produces the perfect bass mix.', isCorrect: true },
          { id: 'opt-2', label: 'Recording through a mobile phone voice memo', explanation: 'A phone microphone distorts heavily and misses true sub frequencies.', isCorrect: false },
          { id: 'opt-3', label: 'Muting all bass in the song completely', explanation: 'Removing the bass removes the tonal foundation of the track.', isCorrect: false }
        ]
      },
      {
        id: 'rec-bs-7',
        prompt: 'When tracking analog synths into an audio interface, which input level should you select?',
        contextKicker: 'Question 7 of 7',
        options: [
          { id: 'opt-1', label: 'Line-Level Input', explanation: 'Correct! Synthesizers output line-level audio (+4dBu or -10dBV). Plugging into an active Line input avoids overloading sensitive mic preamps and preventing distortion.', isCorrect: true },
          { id: 'opt-2', label: 'High-Gain Mic Preamp at +60dB', explanation: 'Feeding line-level synths into a high-gain mic preamp causes massive clipping distortion.', isCorrect: false },
          { id: 'opt-3', label: 'Turntable Phono Preamp', explanation: 'Phono preamps apply RIAA curves designed for vinyl record styluses, distorting synth frequencies.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'recording-other',
    track: 'recording',
    category: 'instrument',
    title: 'Other',
    subtitle: '6 Questions · Cello, Brass, Choir, Ensembles in a Circle, Shotgun Isolation & Double Bass Pickups',
    description: 'Master orchestral and ensemble tracking: micing a cello, brass horn sections, choirs, omni/shotgun pattern applications, and double bass pickups.',
    iconName: 'Mic2',
    accentColor: 'indigo',
    completionTitle: 'You did it! Your ensemble & orchestral recording sounds majestic! 🎻🎺',
    completionSubtitle: 'Warm cello resonance, balanced brass horns, choir room acoustics, and specialized polar pattern isolation captured flawlessly.',
    questions: [
      {
        id: 'rec-oth-1',
        prompt: 'What is the best approach and equipment to use when micing a cello in a studio session?',
        contextKicker: 'Question 1 of 6',
        educationalTip: 'Placing a large-diaphragm condenser or ribbon microphone 2-3 feet away, aimed slightly toward the bridge and F-holes, captures warm organic cello resonance.',
        options: [
          { id: 'opt-1', label: 'Use a large-diaphragm condenser or ribbon microphone placed 2 to 3 feet away, aimed slightly toward the bridge and F-holes', explanation: 'Correct! A quality condenser or ribbon mic placed a couple of feet away captures the rich wood warmth and bowing articulation of a cello without harsh fingerboard noise.', isCorrect: true },
          { id: 'opt-2', label: 'Placing a close boundary mic flat on the floor underneath the endpin', explanation: 'Floor placement captures floor thumps rather than cello body resonance.', isCorrect: false },
          { id: 'opt-3', label: 'Using a single dynamic vocal mic 6 feet back pointing at the ceiling', explanation: 'A distant upward-pointing dynamic mic captures muddy room reverberation instead of direct cello tone.', isCorrect: false }
        ]
      },
      {
        id: 'rec-oth-2',
        prompt: 'How should you position microphones for a brass horn section (trumpets, trombones) to capture power without harsh high-frequency shrillness?',
        contextKicker: 'Question 2 of 6',
        options: [
          { id: 'opt-1', label: 'Place microphones 2 to 4 feet back and slightly above the bell cluster, pointing downward', explanation: 'Correct! Micing brass directly on-axis into the bells produces ear-piercing harshness; pulling back slightly captures blended horn section power.', isCorrect: true },
          { id: 'opt-2', label: 'Placing a miniature lavalier clip-on mic inside each valve casing', explanation: 'Placing mics inside valve mechanisms blocks instrument operation and causes extreme key-click noise.', isCorrect: false },
          { id: 'opt-3', label: 'Using a single ribbon mic in an adjacent isolated vocal booth', explanation: 'Isolating brass in another room disconnects the horn section from the rhythm section and loses power.', isCorrect: false }
        ]
      },
      {
        id: 'rec-oth-3',
        prompt: 'Which non-technical factors should you pay close attention to when recording a choir?',
        contextKicker: 'Question 3 of 6',
        educationalTip: 'A choir relies heavily on the natural acoustics, reflections, and reverberation of the performance room.',
        options: [
          { id: 'opt-1', label: 'The acoustic and reverb of the room they\'re in', explanation: 'Correct! A choir relies heavily on the natural acoustics, reflections, and reverberation of the performance space to sound resonant and majestic.', isCorrect: true },
          { id: 'opt-2', label: 'The exact color of the musician sheet music stands', explanation: 'Stand colors have no bearing on choral acoustic performance.', isCorrect: false },
          { id: 'opt-3', label: 'The brand of microphone cables used on stage', explanation: 'Standard balanced cables carry signal transparently regardless of brand logo.', isCorrect: false }
        ]
      },
      {
        id: 'rec-oth-4',
        prompt: 'A mic with which polar pattern would be suitable for recording a choir or instrumental ensemble sitting in a circle?',
        contextKicker: 'Question 4 of 6',
        educationalTip: 'Omnidirectional microphones capture sound equally from all 360 degrees around the capsule.',
        options: [
          { id: 'opt-1', label: 'Omnidirectional Pattern', explanation: 'Correct! Omnidirectional mics capture 360 degrees of sound equally, making them ideal for ensembles or choirs arranged in a circle around the mic.', isCorrect: true },
          { id: 'opt-2', label: 'Shotgun / Line Gradient Pattern', explanation: 'Shotgun patterns have extremely narrow front pickup and reject sound from the sides, making them unsuitable for ensembles in a circle.', isCorrect: false },
          { id: 'opt-3', label: 'Hypercardioid Pattern', explanation: 'Hypercardioid patterns have tight directional rejection lobes and a rear pickup lobe, missing performers seated on the sides.', isCorrect: false }
        ]
      },
      {
        id: 'rec-oth-5',
        prompt: 'A mic with which polar pattern would be suitable for isolating one person\'s vocal performance in a very noisy room or for recording vocal performances for tv/movie?',
        contextKicker: 'Question 5 of 6',
        educationalTip: 'Shotgun / line gradient microphones use interference tubes to achieve extreme directional rejection of side noise.',
        options: [
          { id: 'opt-1', label: 'Shotgun / Line Gradient Pattern', explanation: 'Correct! Shotgun mics feature an extremely narrow forward pickup lobe and severe off-axis rejection, perfect for isolating dialogue and vocals in noisy environments.', isCorrect: true },
          { id: 'opt-2', label: 'Omnidirectional Pattern', explanation: 'Omni mics pick up sound equally from all directions, capturing maximum room noise.', isCorrect: false },
          { id: 'opt-3', label: 'Figure-8 Bidirectional Pattern', explanation: 'Figure-8 picks up sound equally from front and rear, letting in unwanted room noise from behind.', isCorrect: false }
        ]
      },
      {
        id: 'rec-oth-6',
        prompt: 'Why do many double bassists in jazz and pop contexts have pickups with 1/4" outputs?',
        contextKicker: 'Question 6 of 6',
        educationalTip: 'Bridge pickups output a high-impedance unbalanced instrument signal that connects directly via 1/4" TS cable into a DI box or bass amplifier.',
        options: [
          { id: 'opt-1', label: 'To connect directly via an instrument cable into a DI box or amplifier', explanation: 'Correct! Piezo or magnetic bridge pickups output a high-impedance instrument signal that plugs directly via 1/4" TS cable into a DI box or bass amp.', isCorrect: true },
          { id: 'opt-2', label: 'To supply +48V phantom power directly to the strings', explanation: 'String vibrations do not require or accept DC phantom power.', isCorrect: false },
          { id: 'opt-3', label: 'To convert the double bass into a wireless MIDI keyboard', explanation: 'Piezo pickups output audio signals, not digital MIDI data.', isCorrect: false }
        ]
      }
    ]
  }
];
