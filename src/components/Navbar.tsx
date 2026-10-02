import React from 'react';
import { Volume2, VolumeX, FileSpreadsheet, Headphones } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { AudioEffectIcon } from './AudioEngineeringIcons';

export type ActiveTab = 'adventure' | 'grade-report';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  onOpenSchematics?: () => void;
  isSchematicsOpen?: boolean;
  onReturnToChallengeMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isMuted,
  setIsMuted,
  onOpenSchematics,
  isSchematicsOpen = false,
  onReturnToChallengeMenu,
}) => {
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  };

  const isAdventureActive = activeTab === 'adventure' && !isSchematicsOpen;
  const isGradeReportActive = activeTab === 'grade-report' && !isSchematicsOpen;
  const isEffectsGearActive = isSchematicsOpen;

  const handleAdventureClick = () => {
    if (onReturnToChallengeMenu) {
      onReturnToChallengeMenu();
    } else {
      setActiveTab('adventure');
    }
  };

  return (
    <header className="relative sm:sticky top-0 z-40 bg-slate-950/98 backdrop-blur-lg border-b border-slate-800 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={handleAdventureClick}
          className="text-lg font-bold tracking-tight text-white hover:text-emerald-400 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <Headphones className="w-5 h-5 text-emerald-400" />
          <span>AudioQuest</span>
        </button>

        {/* Zone 2: Navigation Links (Green for Adventure, Red for Grade Report, Blue for Effects & Gear) */}
        <nav className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-end gap-1.5 md:gap-3 text-xs md:text-sm font-medium w-full sm:w-auto">
          {/* TAB 1: ADVENTURE (GREEN) */}
          <button
            onClick={handleAdventureClick}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap font-semibold cursor-pointer ${
              isAdventureActive
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400 shadow-md shadow-emerald-950/50'
                : 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-950/30 border border-transparent'
            }`}
          >
            Choose-Your-Own-Adventure
          </button>

          {/* TAB 2: GRADE REPORT (RED) */}
          <button
            onClick={() => setActiveTab('grade-report')}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 font-semibold cursor-pointer ${
              isGradeReportActive
                ? 'bg-rose-600 hover:bg-rose-500 text-white border border-rose-400 shadow-md shadow-rose-950/50'
                : 'text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 border border-transparent'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-current" />
            <span>Grade Report</span>
          </button>

          {/* TAB 3: EFFECTS & GEAR (BLUE) */}
          {onOpenSchematics && (
            <button
              onClick={onOpenSchematics}
              className={`px-2.5 sm:px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 font-semibold cursor-pointer ${
                isEffectsGearActive
                  ? 'bg-sky-600 hover:bg-sky-500 text-white border border-sky-400 shadow-md shadow-sky-950/50'
                  : 'text-slate-400 hover:text-sky-300 hover:bg-sky-950/30 border border-transparent'
              }`}
              title="Open full library of audio effects, polar patterns & studio gear"
            >
              <AudioEffectIcon name="eq" className="w-4 h-4 text-current" />
              <span className="hidden sm:inline">FX & Gear Library</span>
              <span className="sm:hidden">FX & Gear Library</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Audio controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            aria-label="Toggle Sound"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
