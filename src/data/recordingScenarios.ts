import { Scenario } from '../types/game';

export const recordingScenarios: Scenario[] = [
  {
    id: 'recording-vocals',
    track: 'recording',
    category: 'instrument',
    title: 'Lead Vocals',
    subtitle: '10 Questions · Mic Choice, Pop Filters, Phantom Power & Patterns',
    description: 'Master studio and live vocal tracking: mic capsules, polar patterns, pop filters, shockmounts, and +48V phantom power.',
    iconName: 'vocal-mic',
    accentColor: 'indigo',
    completionTitle: 'You did it! Your lead vocal sounds good! 🎙️',
    completionSubtitle: 'Zero plosives, perfect cardioid isolation, and pristine studio capture with +48V power and shockmount protection.',
    questions: [
      {
        id: 'rec-vox-1',
        prompt: 'Which would help you avoid plosives on the mic?',
        contextKicker: 'Question 1 of 10',
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
        prompt: 'Which is the standard mic choice for live vocals?',
        contextKicker: 'Question 2 of 10',
        educationalTip: 'The Shure SM58 is the worldwide industry standard dynamic microphone for live performance due to its ruggedness and feedback rejection.',
        options: [
          { id: 'opt-1', label: 'Shure SM58 (Dynamic Microphone)', explanation: 'Correct! The SM58 is practically indestructible, resists feedback, and delivers clear live vocal presence.', isCorrect: true },
          { id: 'opt-2', label: 'Neumann U87 (Large Condenser)', explanation: 'The U87 is a $3,600+ delicate studio condenser that would pick up intense stage bleed and feedback.', isCorrect: false },
          { id: 'opt-3', label: 'Royer R-121 (Ribbon Microphone)', explanation: 'Ribbon mics have delicate aluminum ribbons with figure-8 patterns that easily capture feedback and stage noise.', isCorrect: false },
          { id: 'opt-4', label: 'Piezo Contact Transducer', explanation: 'Piezo transducers attach to acoustic bodies and sound harsh and unnatural on human voices.', isCorrect: false }
        ]
      },
      {
        id: 'rec-vox-3',
        prompt: 'Which will help avoid handling noise and keep a condenser mic in place?',
        contextKicker: 'Question 3 of 10',
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
        contextKicker: 'Question 4 of 10',
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
        contextKicker: 'Question 5 of 10',
        educationalTip: 'Large Diaphragm Condensers (LDCs) feature wide frequency response, fast transient sensitivity, and low self-noise, capturing full vocal nuance.',
        options: [
          { id: 'opt-1', label: 'Large Diaphragm Condenser (LDC)', explanation: 'Correct! Large diaphragm condenser mics are the quintessential studio vocal microphones for rich detail and depth.', isCorrect: true },
          { id: 'opt-2', label: 'Boundary PZM Microphone', explanation: 'Boundary mics are designed for conference tables or boundary wall mounting, not close lead vocals.', isCorrect: false },
          { id: 'opt-3', label: 'Carbon Granule Microphone', explanation: 'Carbon mics are antique telephone transmitters with extreme distortion and narrow bandpass response.', isCorrect: false },
          { id: 'opt-4', label: 'Subwoofer Speaker Inverted as Mic', explanation: 'Subwoofers as mics (like SubKick) only capture frequencies below 100Hz, missing all vocal formants.', isCorrect: false }
        ]
      },
      {
        id: 'rec-vox-6',
        prompt: 'Which setting is required for use of condenser microphones?',
        contextKicker: 'Question 6 of 10',
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
        contextKicker: 'Question 7 of 10',
        educationalTip: 'A standard durable threaded mic clip grips handheld dynamic mics securely on stage.',
        options: [
          { id: 'opt-1', label: 'Mic Clip', explanation: 'Correct! A standard mic clip screws onto a stage boom stand and allows quick insertion and removal for the singer.', isCorrect: true },
          { id: 'opt-2', label: 'Large Elastic Spider Shockmount', explanation: 'Spider mounts are bulky, fragile, and clumsy for live stage movement.', isCorrect: false },
          { id: 'opt-3', label: 'Gaffer Tape Ball', explanation: 'Taping mics to stands is unprofessional and insecure on stage.', isCorrect: false }
        ]
      },
      {
        id: 'rec-vox-8',
        prompt: 'Which demonstrates the directionality of many vocal microphones (picks up front, rejects rear)?',
        contextKicker: 'Question 8 of 10',
        educationalTip: 'A cardioid (heart-shaped) polar pattern has maximum sensitivity directly on-axis (0°) and total rejection at 180° (rear).',
        options: [
          { id: 'opt-1', label: 'Cardioid Polar Pattern', explanation: 'Correct! Cardioid polar patterns capture sound from the front while rejecting sound from behind, avoiding stage bleed and feedback.', isCorrect: true },
          { id: 'opt-2', label: 'Omnidirectional Pattern', explanation: 'Omni mics pick up sound equally in a 360-degree sphere from all directions.', isCorrect: false },
          { id: 'opt-3', label: 'Figure-8 (Bidirectional) Pattern', explanation: 'Figure-8 captures sound equally from front and rear while rejecting the sides.', isCorrect: false },
          { id: 'opt-4', label: 'Hyper-Phase Transducer', explanation: 'Hyper-Phase is not a recognized acoustic polar pattern.', isCorrect: false }
        ]
      },
      {
        id: 'rec-vox-9',
        prompt: 'Which would help you hear yourself as you record (without sound bleeding into the mic)?',
        contextKicker: 'Question 9 of 10',
        educationalTip: 'Closed-back headphones seal acoustic energy around the singer’s ears, preventing headphone click track and backing music bleed into the vocal mic.',
        options: [
          { id: 'opt-1', label: 'Closed-Back Studio Headphones with Direct Monitoring', explanation: 'Correct! Closed-back headphones prevent acoustic bleed from leaking into the sensitive studio vocal mic.', isCorrect: true },
          { id: 'opt-2', label: 'Open-Back Studio Headphones at maximum volume', explanation: 'Open-back headphones leak loud audio into the room, ruining the vocal recording with click-track bleed.', isCorrect: false },
          { id: 'opt-3', label: 'Blasting Studio Monitor Speakers in the room', explanation: 'Blasting speakers in the room will cause intense feedback and severe backing track bleed.', isCorrect: false }
        ]
      },
      {
        id: 'rec-vox-10',
        prompt: 'Which cable would connect a microphone to a preamp or audio interface?',
        contextKicker: 'Question 10 of 10',
        educationalTip: 'Standard balanced 3-pin XLR cables carry differential audio signals (Pin 1 Ground, Pin 2 Hot, Pin 3 Cold), rejecting RF interference.',
        options: [
          { id: 'opt-1', label: '3-Pin Balanced XLR Cable', explanation: 'Correct! XLR cables supply balanced low-impedance connection and carry +48V phantom power safely.', isCorrect: true },
          { id: 'opt-2', label: '1/4" TS Unbalanced Instrument Cable', explanation: 'TS cables are unbalanced, susceptible to noise, and cannot carry phantom power.', isCorrect: false },
          { id: 'opt-3', label: 'RCA Stereo Cable', explanation: 'RCA cables are unbalanced consumer cables for stereo line-level audio.', isCorrect: false },
          { id: 'opt-4', label: '3.5mm Aux Cable', explanation: 'Aux cables are unbalanced consumer headphone connections.', isCorrect: false }
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
        educationalTip: 'The Shure SM57 cardioid dynamic microphone has been the undisputed gold standard for snare drums for over 50 years due to its high SPL handling and presence peak.',
        options: [
          { id: 'opt-1', label: 'Shure SM57 (Dynamic Microphone)', explanation: 'Correct! The SM57 handles immense sound pressure levels (SPL) and has a distinct midrange crack tailored for snares.', isCorrect: true },
          { id: 'opt-2', label: 'Neumann U87 Large Condenser', explanation: 'A delicate U87 would risk diaphragm damage or clipping from close snare hits and rogue drumstick strikes.', isCorrect: false },
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
        educationalTip: 'Large diaphragm dynamic kick mics (AKG D112, Shure Beta 52A, Audix D6) are tuned with pre-contoured EQ curves boosting 60Hz thump and 4kHz click.',
        options: [
          { id: 'opt-1', label: 'AKG D112 / Shure Beta 52A / Audix D6', explanation: 'Correct! These large-diaphragm dynamic kick microphones are tailored specifically for huge sub-lows and punchy beater attack.', isCorrect: true },
          { id: 'opt-2', label: 'Small Diaphragm Condenser Pencil Mic', explanation: 'Pencil condensers have small capsules that can be overwhelmed by kick port air blasts.', isCorrect: false },
          { id: 'opt-3', label: 'Shure SM58 Vocal Mic', explanation: 'The SM58 has a built-in bass rolloff designed for vocal proximity, lacking deep 50Hz sub punch.', isCorrect: false }
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
        prompt: 'Which microphone (other than an SM57) would be a good choice for miking toms?',
        contextKicker: 'Question 7 of 7',
        educationalTip: 'The Sennheiser MD421 is a legendary large-diaphragm dynamic microphone famous for its deep low-end response, smooth highs, and fast tom transients.',
        options: [
          { id: 'opt-1', label: 'Sennheiser MD421', explanation: 'Correct! The MD421 has an extended low-frequency response and high SPL handling, making it the premier tom-tom mic choice.', isCorrect: true },
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
    subtitle: '8 Questions · Dynamic Classics, Room Mics & Cone Placement',
    description: 'Mic tube amplifiers: compare the SM57, MD421, and e609, dial speaker cone angles, and mix close + room mics.',
    iconName: 'electric-guitar',
    accentColor: 'amber',
    completionTitle: 'You did it! Your electric guitar recording sounds good! 🎸',
    completionSubtitle: 'Warm analog drive, zero cone fizz, and rich spatial air captured right from the amplifier cabinet.',
    questions: [
      {
        id: 'rec-eg-1',
        prompt: 'Which is one of the three classic dynamic mics frequently used to mic a guitar amp?',
        contextKicker: 'Question 1 of 8 (1 of 3 Dynamic Classics)',
        educationalTip: 'The Shure SM57 is the definitive guitar cabinet microphone, capturing mid-frequency bite and punch.',
        options: [
          { id: 'opt-1', label: 'Shure SM57', explanation: 'Correct! The SM57 is on countless legendary guitar cabinet recordings throughout rock history.', isCorrect: true },
          { id: 'opt-2', label: 'AKG 414', explanation: 'The AKG C414 is a multi-pattern condenser mic, not a dynamic mic.', isCorrect: false },
          { id: 'opt-3', label: 'Neumann U87', explanation: 'The U87 is a large diaphragm condenser mic, not a dynamic mic.', isCorrect: false },
          { id: 'opt-4', label: 'Royer R-121', explanation: 'The Royer R-121 is a ribbon microphone, not a dynamic moving-coil mic.', isCorrect: false }
        ]
      },
      {
        id: 'rec-eg-2',
        prompt: 'Which other mic is a dynamic mic frequently used to mic a guitar amp (often hung over the cab)?',
        contextKicker: 'Question 2 of 8 (2 of 3 Dynamic Classics)',
        educationalTip: 'The Sennheiser e609 has a flat front face designed to drape directly over an amplifier grill without a mic stand.',
        options: [
          { id: 'opt-1', label: 'Sennheiser e609', explanation: 'Correct! The e609’s flat profile lets engineers drape it over the amp cabinet grill right in front of the speaker cone.', isCorrect: true },
          { id: 'opt-2', label: 'AKG 414', explanation: 'The AKG 414 is a condenser, not a dynamic mic.', isCorrect: false },
          { id: 'opt-3', label: 'Royer R-121', explanation: 'The Royer R-121 is a ribbon mic.', isCorrect: false }
        ]
      },
      {
        id: 'rec-eg-3',
        prompt: 'Which third mic is a dynamic mic frequently used to mic a guitar amp (known for thick low-end body)?',
        contextKicker: 'Question 3 of 8 (3 of 3 Dynamic Classics)',
        educationalTip: 'The Sennheiser MD421 dynamic microphone offers extended bass response and a 5-position bass rolloff switch.',
        options: [
          { id: 'opt-1', label: 'Sennheiser MD421', explanation: 'Correct! The MD421 captures rich low-end chunk and balanced highs, frequently paired alongside an SM57.', isCorrect: true },
          { id: 'opt-2', label: 'Neumann U87', explanation: 'The U87 is a condenser mic, not a dynamic moving-coil mic.', isCorrect: false },
          { id: 'opt-3', label: 'Royer R-121', explanation: 'The Royer R-121 is a ribbon mic.', isCorrect: false }
        ]
      },
      {
        id: 'rec-eg-4',
        prompt: 'Which type of microphone would be best suited to capturing an ambient room sound of the guitar amp?',
        contextKicker: 'Question 4 of 8',
        educationalTip: 'Condenser mics (like the Neumann U87 / AKG 414) and Ribbon mics (Royer R-121) excel at capturing diffuse room air and acoustic decay.',
        options: [
          { id: 'opt-1', label: 'Large Diaphragm Condenser (Neumann U87 / AKG 414) or Ribbon Mic', explanation: 'Correct! Condensers and ribbons pick up delicate room reflections and high-frequency acoustic air far better than close dynamics.', isCorrect: true },
          { id: 'opt-2', label: 'Shure SM57 pointed at the floor', explanation: 'A close dynamic mic 10 feet away sounds thin and lacks open ambient sensitivity.', isCorrect: false },
          { id: 'opt-3', label: 'Guitar pickup contact sensor', explanation: 'A contact sensor only picks up physical string vibrations, not the room acoustic air.', isCorrect: false }
        ]
      },
      {
        id: 'rec-eg-5',
        prompt: 'Which amp recording technique will give you multiple sounds to mix together later?',
        contextKicker: 'Question 5 of 8',
        educationalTip: 'Multi-miking (e.g. blending an SM57 for bite with a Royer R-121 or MD421 for warmth, plus a DI track) offers maximum mixing flexibility.',
        options: [
          { id: 'opt-1', label: 'Multi-Micing (Blending Close Dynamic + Ribbon/Room, or Mic + Clean DI)', explanation: 'Correct! Combining two complementary mics (e.g. SM57 on the cone for bite + Ribbon on the edge for warmth) lets you blend tone in the mix.', isCorrect: true },
          { id: 'opt-2', label: 'Placing one mic 2 inches inside the amp’s power cable socket', explanation: 'This is an electrical hazard and captures no sound.', isCorrect: false },
          { id: 'opt-3', label: 'Recording on a mono cassette voice memo', explanation: 'A single low-quality voice memo offers zero tonal blending options.', isCorrect: false }
        ]
      },
      {
        id: 'rec-eg-6',
        prompt: 'Which mic placement technique will give you the harshest / brightest sound out of the amplifier?',
        contextKicker: 'Question 6 of 8',
        educationalTip: 'The center dust cap of the speaker cone produces the most intense high frequencies and pick attack; placing a mic straight on-axis here yields maximum bite/fizz.',
        options: [
          { id: 'opt-1', label: 'Pointed directly on-axis at the center of the speaker cone (dust cap)', explanation: 'Correct! The center of the cone radiates high-frequency energy directly. Pointing right at the center produces the brightest, most aggressive tone.', isCorrect: true },
          { id: 'opt-2', label: 'Angled at the outer edge of the speaker cone', explanation: 'The edge of the cone radiates dark, mellow frequencies.', isCorrect: false },
          { id: 'opt-3', label: 'Placed 5 feet away in the hallway', explanation: 'Placing far away produces ambient room reflections, not harsh direct cone bite.', isCorrect: false }
        ]
      },
      {
        id: 'rec-eg-7',
        prompt: 'Which amp mic placement technique will give you slightly more room sound in the recording?',
        contextKicker: 'Question 7 of 8',
        educationalTip: 'Backing the microphone 1 to 3 feet away from the grill cloth lets the sound waves develop and blends direct amp tone with room reflections.',
        options: [
          { id: 'opt-1', label: 'Backing the mic 1 to 3 feet away from the grill cloth', explanation: 'Correct! Moving the mic back decreases the ratio of direct sound to reflected sound, integrating natural room ambience.', isCorrect: true },
          { id: 'opt-2', label: 'Pressing the mic capsule right against the grill cloth (0 inches)', explanation: 'Close proximity minimizes room sound and maximizes proximity effect bass.', isCorrect: false },
          { id: 'opt-3', label: 'Turning the master volume of the amp to zero', explanation: 'With volume at zero there is no sound at all.', isCorrect: false }
        ]
      },
      {
        id: 'rec-eg-8',
        prompt: 'Which amp mic placement technique will give you a more mellow, warm tone?',
        contextKicker: 'Question 8 of 8',
        educationalTip: 'Moving the microphone toward the outer rim/edge of the speaker cone or angling it off-axis softens harsh highs and captures warm low-mids.',
        options: [
          { id: 'opt-1', label: 'Positioning the mic toward the outer edge of the speaker cone or angled off-axis', explanation: 'Correct! The outer edge of the speaker cone vibrates with darker, warmer tone, rolling off ice-pick treble.', isCorrect: true },
          { id: 'opt-2', label: 'Aiming directly at the center dust cap with gain boosted', explanation: 'The center dust cap produces the most shrill, piercing high-frequency response.', isCorrect: false },
          { id: 'opt-3', label: 'Using a broken XLR cable', explanation: 'A broken cable will produce static or silence.', isCorrect: false }
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
        prompt: 'Which is the universally recommended starting placement for recording an acoustic guitar with a single mic?',
        contextKicker: 'Question 1 of 4',
        educationalTip: 'Pointing a microphone at the 12th fret (where the neck meets the body) from 6–10 inches away balances string sparkle and warm body resonance without low mud.',
        options: [
          { id: 'opt-1', label: 'Pointed at the 12th Fret (angled slightly toward the soundhole from 6–10 inches away)', explanation: 'Correct! The 12th fret yields the optimal balance of fretboard articulation, string sparkle, and body tone.', isCorrect: true },
          { id: 'opt-2', label: 'Stuffed directly inside the soundhole', explanation: 'Placing a mic in the soundhole captures unbearable low-frequency air pressure and boomy mud.', isCorrect: false },
          { id: 'opt-3', label: 'Behind the headstock pointing at the tuning pegs', explanation: 'The headstock produces minimal sound projection compared to the guitar top.', isCorrect: false },
          { id: 'opt-4', label: 'On the floor underneath the player’s shoe', explanation: 'Floormount picks up shoe tapping and muffled bottom reflections.', isCorrect: false }
        ]
      },
      {
        id: 'rec-ag-2',
        prompt: 'Why should you avoid pointing a studio microphone directly into the acoustic guitar’s soundhole?',
        contextKicker: 'Question 2 of 4',
        educationalTip: 'The soundhole acts as a Helmholtz resonator. Direct close micing results in massive 100Hz–250Hz low-frequency resonance and proximity boom.',
        options: [
          { id: 'opt-1', label: 'Massive low-frequency resonance and proximity boom (100Hz–250Hz) overwhelm the recording', explanation: 'Correct! The soundhole acts as an acoustic bass port, generating boomy, muddy low-end buildup that overloads the microphone.', isCorrect: true },
          { id: 'opt-2', label: 'The soundhole will burn the microphone capsule with heat', explanation: 'Acoustic guitars generate sound waves, not thermal heat.', isCorrect: false },
          { id: 'opt-3', label: 'The guitar strings will become completely inaudible', explanation: 'Strings are audible, but drowned out by overpowering resonant boom.', isCorrect: false }
        ]
      },
      {
        id: 'rec-ag-3',
        prompt: 'Which type of microphone is widely revered in studios for capturing delicate acoustic guitar fingerpicking?',
        contextKicker: 'Question 3 of 4',
        educationalTip: 'Small Diaphragm Condensers (SDC / "Pencil" mics like the Neumann KM184 or Rode NT5) have ultra-light diaphragms that react instantly to fast transients.',
        options: [
          { id: 'opt-1', label: 'Small Diaphragm Condenser (SDC "Pencil" Mic)', explanation: 'Correct! Small diaphragm condensers have unmatched transient accuracy and consistent off-axis frequency response, ideal for acoustic strings.', isCorrect: true },
          { id: 'opt-2', label: 'Heavy Kick Drum Dynamic Mic', explanation: 'Kick mics are pre-equalized for sub-lows and muffled highs, totally wrong for delicate acoustic guitar.', isCorrect: false },
          { id: 'opt-3', label: 'Handheld Karaoke Mic', explanation: 'Cheap dynamic karaoke mics lack high-frequency detail and dynamic range.', isCorrect: false }
        ]
      },
      {
        id: 'rec-ag-4',
        prompt: 'Which stereo micing technique uses two microphones angled at 90° with capsules nearly touching to prevent phase cancellation?',
        contextKicker: 'Question 4 of 4',
        educationalTip: 'The XY Coincident Pair places two directional capsules as close as physically possible to eliminate time arrival differences and phase comb filtering.',
        options: [
          { id: 'opt-1', label: 'XY Coincident Pair', explanation: 'Correct! Because the capsules are in the exact same point in space (coincident), arrival times are identical, providing excellent stereo width with zero phase cancellation.', isCorrect: true },
          { id: 'opt-2', label: 'Spaced 20 feet apart in opposite rooms', explanation: 'Placing mics in different rooms ruins acoustic coherence.', isCorrect: false },
          { id: 'opt-3', label: 'One mic inside the guitar and one in the closet', explanation: 'This creates terrible phase and tonal mismatch.', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'recording-bass-synths',
    track: 'recording',
    category: 'instrument',
    title: 'Bass & Analog Synths',
    subtitle: '4 Questions · DI Boxes, Active Buffers & Blending',
    description: 'Master tracking electric bass and analog synthesizers: direct injection (DI), impedance matching, ground loops, and dual tracking.',
    iconName: 'di-box',
    accentColor: 'rose',
    completionTitle: 'You did it! Your bass & synth tracking is solid! 🎚️',
    completionSubtitle: 'Pristine sub fundamental clarity, zero ground buzz, and warm saturated amp character.',
    questions: [
      {
        id: 'rec-bs-1',
        prompt: 'Which standard studio tool converts a high-impedance instrument signal into a low-impedance balanced mic signal?',
        contextKicker: 'Question 1 of 4',
        options: [
          { id: 'opt-1', label: 'Direct Injection (DI) Box', explanation: 'Correct! A Direct Injection (DI) box matches electrical impedance and balances the line, converting unbalanced high-Z instrument signals into balanced low-Z mic-level signals for clean direct recording.', isCorrect: true },
          { id: 'opt-2', label: 'Guitar Capo', explanation: 'A capo clamps frets on stringed instruments, performing no electronic conversion.', isCorrect: false },
          { id: 'opt-3', label: 'Pop Filter', explanation: 'A pop filter stops vocal plosive air, not electrical impedance.', isCorrect: false }
        ]
      },
      {
        id: 'rec-bs-2',
        prompt: 'What is the primary operational difference between a Passive DI box and an Active DI box?',
        contextKicker: 'Question 2 of 4',
        options: [
          { id: 'opt-1', label: 'Active DI boxes feature internal preamplification buffers requiring power, ideal for low-output passive pickups and synthesizers.', explanation: 'Correct! Active DIs use internal circuitry (powered by battery or +48V phantom power) to buffer fragile high-impedance signals without loading down weak instrument pickups.', isCorrect: true },
          { id: 'opt-2', label: 'Passive DI boxes require wall power and generate loud synth distortion.', explanation: 'Passive DIs do not require power and use audio transformers.', isCorrect: false },
          { id: 'opt-3', label: 'Active DI boxes can only be used with acoustic drum overheads.', explanation: 'Active DIs are specifically designed for electric basses, keyboards, and active synthesizers.', isCorrect: false }
        ]
      },
      {
        id: 'rec-bs-3',
        prompt: 'What is considered the industry best practice for recording electric bass in modern music production?',
        contextKicker: 'Question 3 of 4',
        options: [
          { id: 'opt-1', label: 'Dual Tracking: Clean DI (for sub definition) + Mic on Bass Amp (for character and grit)', explanation: 'Correct! Simultaneously recording a clean DI track (for deep, pure low-end foundation) and an amplifier mic track (for warm midrange grit and speaker breakup) produces the perfect bass mix.', isCorrect: true },
          { id: 'opt-2', label: 'Recording through a mobile phone voice memo', explanation: 'A phone microphone distorts heavily and misses true sub frequencies.', isCorrect: false },
          { id: 'opt-3', label: 'Muting all bass in the song completely', explanation: 'Removing the bass removes the tonal foundation of the track.', isCorrect: false }
        ]
      },
      {
        id: 'rec-bs-4',
        prompt: 'When tracking analog synths into an audio interface, which input level should you select?',
        contextKicker: 'Question 4 of 4',
        options: [
          { id: 'opt-1', label: 'Line-Level Input', explanation: 'Correct! Synthesizers output line-level audio (+4dBu or -10dBV). Plugging into an active Line input avoids overloading sensitive mic preamps and preventing distortion.', isCorrect: true },
          { id: 'opt-2', label: 'High-Gain Mic Preamp at +60dB', explanation: 'Feeding line-level synths into a high-gain mic preamp causes massive clipping distortion.', isCorrect: false },
          { id: 'opt-3', label: 'Turntable Phono Preamp', explanation: 'Phono preamps apply RIAA curves designed for vinyl record styluses, distorting synth frequencies.', isCorrect: false }
        ]
      }
    ]
  }
];
