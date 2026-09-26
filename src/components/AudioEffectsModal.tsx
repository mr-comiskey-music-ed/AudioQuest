import React, { useState, useEffect } from 'react';
import {
  X,
  Volume2,
  Play,
  Sparkles,
  Filter,
  Sliders,
  Waves,
  Layers,
  Disc,
  Music,
  Mic2,
  Guitar,
  Wrench,
  Compass,
  Boxes,
  Info,
} from 'lucide-react';
import {
  AUDIO_EFFECT_ICONS,
  AudioEffectType,
  AudioEffectCard,
  AudioEffectIcon,
  hasAudioPlayback,
} from './AudioEngineeringIcons';
import { soundEngine } from '../utils/audio';

interface AudioEffectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEffectInitial?: AudioEffectType | null;
}

const CATEGORY_LABELS: Record<string, { label: string; icon: React.ReactNode }> = {
  all: { label: 'All Effects & Gear', icon: <Layers className="w-3.5 h-3.5" /> },
  frequency: { label: 'EQ & Curves', icon: <Filter className="w-3.5 h-3.5" /> },
  dynamics: { label: 'Dynamics & Level', icon: <Sliders className="w-3.5 h-3.5" /> },
  time: { label: 'Time & Modulation', icon: <Waves className="w-3.5 h-3.5" /> },
  harmonics: { label: 'Harmonics & Drive', icon: <Sparkles className="w-3.5 h-3.5" /> },
  microphones: { label: 'Microphones', icon: <Mic2 className="w-3.5 h-3.5" /> },
  instruments: { label: 'Instruments & Amps', icon: <Guitar className="w-3.5 h-3.5" /> },
  gear: { label: 'Studio Hardware', icon: <Wrench className="w-3.5 h-3.5" /> },
  'polar-patterns': { label: 'Polar Patterns', icon: <Compass className="w-3.5 h-3.5" /> },
  other: { label: 'Other', icon: <Boxes className="w-3.5 h-3.5" /> },
};

export const AudioEffectsModal: React.FC<AudioEffectsModalProps> = ({
  isOpen,
  onClose,
  selectedEffectInitial,
}) => {
  const [selectedEffect, setSelectedEffect] = useState<AudioEffectType>(
    selectedEffectInitial || 'eq'
  );
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState(false);

  // Directly navigate to the respective gear/effect item and its specific category tab
  useEffect(() => {
    if (isOpen) {
      if (selectedEffectInitial && AUDIO_EFFECT_ICONS[selectedEffectInitial]) {
        setSelectedEffect(selectedEffectInitial);
        const itemCategory = AUDIO_EFFECT_ICONS[selectedEffectInitial]?.category;
        if (itemCategory) {
          setFilterCategory(itemCategory);
        }
      } else {
        setFilterCategory('all');
      }
    }
  }, [isOpen, selectedEffectInitial]);

  if (!isOpen) return null;

  const effectKeys = Object.keys(AUDIO_EFFECT_ICONS) as AudioEffectType[];
  const filteredKeys =
    filterCategory === 'all'
      ? effectKeys
      : effectKeys.filter((k) => AUDIO_EFFECT_ICONS[k].category === filterCategory);

  const activeMeta = AUDIO_EFFECT_ICONS[selectedEffect];

  const handlePlaySound = (effect: AudioEffectType) => {
    setIsPlaying(true);
    soundEngine.playConceptDemo(effect);
    setTimeout(() => setIsPlaying(false), 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-400/20">
              <AudioEffectIcon name={selectedEffect} className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Audio Effects & Studio Gear Library</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase font-semibold">
                  {effectKeys.length} Effects & Gear
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Reference collection of audio processors, microphones, instruments & studio gear
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-950/20 flex flex-wrap items-center gap-2">
          {Object.entries(CATEGORY_LABELS).map(([catKey, info]) => (
            <button
              key={catKey}
              onClick={() => setFilterCategory(catKey)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                filterCategory === catKey
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-sm'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {info.icon}
              <span>{info.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto lg:overflow-hidden">
          {/* Left Grid: Effect & Gear Cards with independent smooth scrolling */}
          <div className="lg:col-span-7 lg:overflow-y-auto lg:max-h-[calc(90vh-210px)] lg:pr-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {filteredKeys.map((key) => {
                const item = AUDIO_EFFECT_ICONS[key];
                const isCurrent = selectedEffect === key;
                return (
                  <AudioEffectCard
                    key={key}
                    effect={key}
                    caption={item.name.split(' (')[0]}
                    active={isCurrent}
                    onClick={() => {
                      setSelectedEffect(key);
                      if (hasAudioPlayback(key)) {
                        handlePlaySound(key);
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Right Panel: Detailed Equipment & Tool Inspector (Always pinned in view) */}
          <div className="lg:col-span-5 bg-slate-950/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 lg:max-h-[calc(90vh-210px)] lg:overflow-y-auto shrink-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-lg">
                  {activeMeta.category.toUpperCase()} TOOL
                </span>
              </div>

              {/* High-Resolution Display Frame */}
              <div className="p-3 bg-slate-900 border-2 border-slate-800 rounded-xl flex flex-col items-center justify-center relative group min-h-[160px]">
                <AudioEffectIcon
                  name={selectedEffect}
                  className="w-56 h-32 text-amber-300 transition-transform group-hover:scale-105 duration-200"
                />
                <div className="text-center mt-2">
                  <div className="text-base font-bold text-white tracking-wide">
                    {activeMeta.name}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Engineering Function
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-lg border border-slate-800/80">
                  {activeMeta.description}
                </p>
              </div>
            </div>

            {/* Sound Preview Action (Only for Effects, Pitch Shifter, and Instruments) */}
            {hasAudioPlayback(selectedEffect) ? (
              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  onClick={() => handlePlaySound(selectedEffect)}
                  disabled={isPlaying}
                  className="w-full px-4 py-2.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${isPlaying ? 'animate-spin' : ''}`} />
                  <span>{isPlaying ? 'Auditioning...' : `Hear ${activeMeta.name.split(' (')[0]}`}</span>
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-500" />
                  <span>Studio hardware & acoustic reference</span>
                </div>
                <span className="text-[10px] font-mono uppercase bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-400">
                  Visual Reference
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-500">
          <span>Select any effect or instrument card to inspect details and audition audio examples</span>
          <button
            onClick={onClose}
            className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
