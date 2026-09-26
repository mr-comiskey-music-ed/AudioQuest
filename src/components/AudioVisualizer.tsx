import React, { useState } from 'react';
import { Play, Activity } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { AUDIO_EFFECT_ICONS, AudioEffectIcon, AudioEffectType } from './AudioEngineeringIcons';

interface AudioVisualizerProps {
  demoType?: AudioEffectType | 'filter' | 'gated' | 'bitcrush' | string;
  title?: string;
}

const DEMO_TO_ICON: Record<string, AudioEffectType> = {
  'de-esser': 'de-esser',
  compressor: 'compressor',
  filter: 'hi-pass-filter',
  saturation: 'saturation',
  chorus: 'chorus',
  reverb: 'reverb',
  gated: 'reverb',
  bitcrush: 'bitcrusher',
  tremolo: 'tremolo',
};

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ demoType, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!demoType) {
    return null;
  }

  const handlePlayDemo = () => {
    setIsPlaying(true);
    soundEngine.playConceptDemo(demoType);
    setTimeout(() => setIsPlaying(false), 900);
  };

  const labels: Record<string, { name: string; desc: string }> = {
    'de-esser': { name: 'De-Esser Action', desc: 'Listen to frequency-dependent high attenuation' },
    compressor: { name: 'Compression Clamp', desc: 'Hear dynamic leveling and peak suppression' },
    filter: { name: 'Filter Frequency Sweep', desc: 'Listen to high-pass cutoff sweep in action' },
    saturation: { name: 'Harmonic Saturation', desc: 'Warm analog clipping & harmonic excitation' },
    chorus: { name: 'Chorus Doubling', desc: 'Detuned multi-voice modulation spread' },
    reverb: { name: 'Reverb', desc: 'Diffuse room reflections & decay tail' },
    gated: { name: 'Classic 80s Gated Snare', desc: 'Explosive reverb tail abruptly severed by gate' },
    bitcrush: { name: 'Digital Bitcrush', desc: 'Stepped quantization & lo-fi sample downsampling' },
    tremolo: { name: 'Tremolo Volume Pulse', desc: 'LFO-modulated periodic amplitude pulsing' },
  };

  const iconKey: AudioEffectType =
    demoType in AUDIO_EFFECT_ICONS
      ? (demoType as AudioEffectType)
      : DEMO_TO_ICON[demoType] || 'eq';

  const meta = AUDIO_EFFECT_ICONS[iconKey];
  const info = labels[demoType] || (meta ? { name: meta.name, desc: meta.description } : { name: 'Audio Demo', desc: 'Interactive concept audio preview' });

  return (
    <div className="p-3 bg-slate-900/90 border border-amber-500/30 rounded-xl flex items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-14 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 p-0.5">
          <AudioEffectIcon name={iconKey} className="w-full h-full text-amber-400" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-slate-200">
            <span className="truncate">{title || info.name}</span>
          </div>
          <div className="text-[11px] text-slate-400 truncate">{info.desc}</div>
        </div>
      </div>

      <button
        onClick={handlePlayDemo}
        disabled={isPlaying}
        className="px-3 py-1.5 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 whitespace-nowrap active:scale-95 shadow-sm shadow-amber-400/20 cursor-pointer"
      >
        <Play className={`w-3 h-3 fill-current ${isPlaying ? 'animate-spin' : ''}`} />
        <span>{isPlaying ? 'Playing...' : 'Hear Effect'}</span>
      </button>
    </div>
  );
};
