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
  ArrowLeft,
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
  frequency: { label: 'EQ', icon: <Filter className="w-3.5 h-3.5" /> },
  dynamics: { label: 'Dynamics', icon: <Sliders className="w-3.5 h-3.5" /> },
  time: { label: 'Space & Modulation', icon: <Waves className="w-3.5 h-3.5" /> },
  harmonics: { label: 'Distortions', icon: <Sparkles className="w-3.5 h-3.5" /> },
  microphones: { label: 'Microphones', icon: <Mic2 className="w-3.5 h-3.5" /> },
  instruments: { label: 'Instruments', icon: <Guitar className="w-3.5 h-3.5" /> },
  gear: { label: 'Studio Hardware', icon: <Wrench className="w-3.5 h-3.5" /> },
  'polar-patterns': { label: 'Polar Patterns', icon: <Compass className="w-3.5 h-3.5" /> },
};

const CATEGORY_ORDER = ['frequency', 'dynamics', 'time', 'harmonics', 'microphones', 'instruments', 'gear', 'polar-patterns'];

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
  const [showMobileDetail, setShowMobileDetail] = useState(Boolean(selectedEffectInitial));

  // Directly navigate to the respective gear/effect item and its specific category tab
  useEffect(() => {
    if (isOpen) {
      if (selectedEffectInitial && AUDIO_EFFECT_ICONS[selectedEffectInitial]) {
        setSelectedEffect(selectedEffectInitial);
        setShowMobileDetail(true);
        const itemCategory = AUDIO_EFFECT_ICONS[selectedEffectInitial]?.category;
        if (itemCategory) {
          setFilterCategory(itemCategory);
        }
      } else {
        setShowMobileDetail(false);
        setFilterCategory('all');
      }
    }
  }, [isOpen, selectedEffectInitial]);

  if (!isOpen) return null;

  const rawEffectKeys = Object.keys(AUDIO_EFFECT_ICONS) as AudioEffectType[];
  const effectKeys = [...rawEffectKeys].sort((a, b) => {
    const catA = AUDIO_EFFECT_ICONS[a].category;
    const catB = AUDIO_EFFECT_ICONS[b].category;
    const idxA = CATEGORY_ORDER.indexOf(catA);
    const idxB = CATEGORY_ORDER.indexOf(catB);
    return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
  });

  const filteredKeys =
    filterCategory === 'all'
      ? effectKeys
      : effectKeys.filter((k) => AUDIO_EFFECT_ICONS[k].category === filterCategory);

  const handleSelectCategory = (catKey: string) => {
    setFilterCategory(catKey);
    setShowMobileDetail(false);
    const keysInCat = catKey === 'all'
      ? effectKeys
      : effectKeys.filter((k) => AUDIO_EFFECT_ICONS[k].category === catKey);
    if (keysInCat.length > 0) {
      setSelectedEffect(keysInCat[0]);
    }
  };

  const activeMeta = AUDIO_EFFECT_ICONS[selectedEffect];

  const handlePlaySound = (effect: AudioEffectType) => {
    setIsPlaying(true);
    soundEngine.playConceptDemo(effect);
    setTimeout(() => setIsPlaying(false), 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl h-[82vh] max-h-[82vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-400/20">
              <AudioEffectIcon name={selectedEffect} className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Audio Effects & Studio Gear Library</span>
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
        <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-950/20 flex flex-wrap items-center gap-2 shrink-0">
          {Object.entries(CATEGORY_LABELS).map(([catKey, info]) => (
            <button
              key={catKey}
              onClick={() => handleSelectCategory(catKey)}
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
          <div className="lg:col-span-7 lg:overflow-y-auto lg:max-h-[calc(82vh-210px)] lg:pr-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {filteredKeys.map((key) => {
                const item = AUDIO_EFFECT_ICONS[key];
                const isCurrent = selectedEffect === key;
                return (
                  <AudioEffectCard
                    key={key}
                    effect={key}
                    caption={item.name}
                    active={isCurrent}
                    onClick={() => {
                      setSelectedEffect(key);
                      setShowMobileDetail(true);
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Right Panel: Detailed Equipment & Tool Inspector (Pops up in front on mobile, pinned column on desktop) */}
          <div
            className={`${
              showMobileDetail
                ? 'absolute inset-0 z-30 bg-slate-900 overflow-y-auto lg:static lg:inset-auto lg:z-auto'
                : 'hidden lg:flex'
            } lg:col-span-5 lg:bg-slate-950/60 lg:max-h-[calc(82vh-210px)] lg:overflow-y-auto p-4 sm:p-5 flex flex-col justify-between border border-slate-800 rounded-2xl space-y-4 shrink-0 shadow-2xl lg:shadow-none animate-in fade-in duration-150`}
          >
            <div className="space-y-4">
              {/* Mobile Back Header: Arrow & button to go back to "All FX & Gear" */}
              <div className="lg:hidden flex items-center justify-between pb-3 border-b border-slate-800/80 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setShowMobileDetail(false);
                    setFilterCategory('all');
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  <span>All FX & Gear</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-lg">
                  {activeMeta.category.toUpperCase()} TOOL
                </span>
              </div>

              {/* High-Resolution Display Frame with Side-by-Side Graphic and Audio Button / Title */}
              <div className="p-4 bg-slate-900 border-2 border-slate-800 rounded-xl flex flex-col sm:flex-row items-center gap-4 relative group">
                <div className="w-36 h-28 shrink-0 flex items-center justify-center bg-slate-950/60 rounded-lg border border-slate-800 p-2">
                  <AudioEffectIcon
                    name={selectedEffect}
                    className="w-full h-full text-amber-300 transition-transform group-hover:scale-105 duration-200"
                  />
                </div>
                <div className="flex-1 min-w-0 text-center sm:text-left space-y-3 w-full">
                  <div>
                    <div className="text-base sm:text-lg font-bold text-white tracking-wide whitespace-normal break-words">
                      {activeMeta.name}
                    </div>
                  </div>

                  {hasAudioPlayback(selectedEffect) ? (
                    <button
                      onClick={() => handlePlaySound(selectedEffect)}
                      disabled={isPlaying}
                      className="w-full px-4 py-2 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Play className={`w-3.5 h-3.5 fill-current ${isPlaying ? 'animate-spin' : ''}`} />
                      <span>{isPlaying ? 'Auditioning...' : `Hear ${activeMeta.name.split(' (')[0]}`}</span>
                    </button>
                  ) : (
                    <div className="text-[11px] font-mono text-slate-400 bg-slate-950/60 border border-slate-800 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                      <span>Visual & Hardware Reference</span>
                    </div>
                  )}
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

            {/* Mobile Bottom Quick Actions */}
            <div className="lg:hidden pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  setShowMobileDetail(false);
                  setFilterCategory('all');
                }}
                className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All FX & Gear</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium cursor-pointer active:scale-95 transition-colors"
              >
                Done
              </button>
            </div>
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
