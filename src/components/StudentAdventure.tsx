import React, { useState, useEffect } from 'react';
import {
  Mic2,
  Sliders,
  Sparkles,
  Disc,
  Piano,
  Activity,
  Drum,
  Radio,
  Gauge,
  Waves,
  Repeat,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Check,
  Award,
  ArrowRight,
  Info,
  Volume2,
  FileSpreadsheet,
  Trophy,
  Medal,
  Crown,
  Lock,
} from 'lucide-react';
import {
  Scenario,
  TrackType,
  QuestionAttemptLog,
  StudentSession,
  StudentPortfolio,
  CompletedScenarioRecord,
} from '../types/game';
import { mixingScenarios } from '../data/mixingScenarios';
import { recordingScenarios } from '../data/recordingScenarios';
import { soundEngine } from '../utils/audio';
import { computeVerificationHash } from '../utils/codec';
import {
  getStoredPortfolio,
  saveCompletedScenario,
} from '../utils/portfolioStorage';
import { AudioVisualizer } from './AudioVisualizer';
import {
  AudioEffectIcon,
  AudioEffectCard,
  detectAudioEffectKey,
  AUDIO_EFFECT_ICONS,
  AudioEffectType,
  hasAudioPlayback,
} from './AudioEngineeringIcons';

interface AchievementBadge {
  id: string;
  milestone: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ACHIEVEMENT_BADGES: AchievementBadge[] = [
  {
    id: 'badge-1',
    milestone: 1,
    title: 'First Track',
    description: 'Complete 1 studio challenge',
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    id: 'badge-2',
    milestone: 2,
    title: 'Stereo Pair',
    description: 'Master 2 studio challenges',
    icon: <Disc className="w-5 h-5" />,
  },
  {
    id: 'badge-4',
    milestone: 4,
    title: 'Studio Quartet',
    description: 'Conquer 4 mixing & recording challenges',
    icon: <Medal className="w-5 h-5" />,
  },
  {
    id: 'badge-8',
    milestone: 8,
    title: 'Board Operator',
    description: 'Complete 8 professional challenges',
    icon: <Trophy className="w-5 h-5" />,
  },
  {
    id: 'badge-18',
    milestone: 18,
    title: 'Master Engineer',
    description: 'Complete all 18 studio challenges',
    icon: <Crown className="w-5 h-5" />,
  },
];

const iconMap: Record<string, React.ReactNode> = {
  Mic2: <Mic2 className="w-5 h-5" />,
  Sliders: <Sliders className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Disc: <Disc className="w-5 h-5" />,
  Piano: <Piano className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Drum: <Drum className="w-5 h-5" />,
  Radio: <Radio className="w-5 h-5" />,
  Gauge: <Gauge className="w-5 h-5" />,
  Waves: <Waves className="w-5 h-5" />,
  Repeat: <Repeat className="w-5 h-5" />,
  Guitar: <Sparkles className="w-5 h-5" />,
};

interface StudentAdventureProps {
  onSessionCompleted?: (session: StudentSession) => void;
  onPortfolioUpdated?: (portfolio: StudentPortfolio) => void;
  onViewGradeReport?: () => void;
  onOpenSchematics?: (effect?: AudioEffectType) => void;
  resetTrigger?: number;
}

export const StudentAdventure: React.FC<StudentAdventureProps> = ({
  onSessionCompleted,
  onPortfolioUpdated,
  onViewGradeReport,
  onOpenSchematics,
  resetTrigger,
}) => {
  // Student Portfolio across all challenges
  const [portfolio, setPortfolio] = useState<StudentPortfolio | null>(() =>
    getStoredPortfolio()
  );

  // Track & Scenario selection with localStorage auto-save restoration
  const [selectedTrack, setSelectedTrack] = useState<TrackType>(() => {
    const saved = localStorage.getItem('aq_active_track');
    return (saved === 'recording' ? 'recording' : 'mixing') as TrackType;
  });

  const [activeScenario, setActiveScenario] = useState<Scenario | null>(() => {
    const saved = localStorage.getItem('aq_active_adventure');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.scenarioId) {
          const allScenarios = [...mixingScenarios, ...recordingScenarios];
          const found = allScenarios.find((s) => s.id === parsed.scenarioId);
          if (found) return found;
        }
      } catch (e) {
        // ignore
      }
    }
    return null;
  });

  // Adventure gameplay state with localStorage auto-save restoration
  const [questionIndex, setQuestionIndex] = useState<number>(() => {
    const saved = localStorage.getItem('aq_active_adventure');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.questionIndex === 'number') return parsed.questionIndex;
      } catch (e) {}
    }
    return 0;
  });

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(() => {
    const saved = localStorage.getItem('aq_active_adventure');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.selectedOptionId || null;
      } catch (e) {}
    }
    return null;
  });

  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'incorrect'>(() => {
    const saved = localStorage.getItem('aq_active_adventure');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.feedbackState || 'idle';
      } catch (e) {}
    }
    return 'idle';
  });

  const [currentAttempts, setCurrentAttempts] = useState<string[]>(() => {
    const saved = localStorage.getItem('aq_active_adventure');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.currentAttempts || [];
      } catch (e) {}
    }
    return [];
  });

  const [playingDemoKey, setPlayingDemoKey] = useState<string | null>(null);

  const handlePlayDemo = (demoKey: string) => {
    setPlayingDemoKey(demoKey);
    soundEngine.playConceptDemo(demoKey, () => {
      setPlayingDemoKey((current) => (current === demoKey ? null : current));
    });
  };

  const [logs, setLogs] = useState<QuestionAttemptLog[]>(() => {
    const saved = localStorage.getItem('aq_active_adventure');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.logs || [];
      } catch (e) {}
    }
    return [];
  });

  const [startTime, setStartTime] = useState<number>(() => {
    const saved = localStorage.getItem('aq_active_adventure');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.startTime || Date.now();
      } catch (e) {}
    }
    return Date.now();
  });

  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    const saved = localStorage.getItem('aq_active_adventure');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return !!parsed.isCompleted;
      } catch (e) {}
    }
    return false;
  });

  useEffect(() => {
    if (resetTrigger !== undefined && resetTrigger > 0) {
      localStorage.removeItem('aq_active_adventure');
      setActiveScenario(null);
      setIsCompleted(false);
      setQuestionIndex(0);
      setSelectedOptionId(null);
      setFeedbackState('idle');
      setCurrentAttempts([]);
      setLogs([]);
    }
  }, [resetTrigger]);

  // Auto-save active adventure progress to localStorage on any state change
  useEffect(() => {
    if (activeScenario) {
      const payload = {
        scenarioId: activeScenario.id,
        questionIndex,
        selectedOptionId,
        feedbackState,
        currentAttempts,
        logs,
        startTime,
        isCompleted,
      };
      localStorage.setItem('aq_active_adventure', JSON.stringify(payload));
    } else {
      localStorage.removeItem('aq_active_adventure');
    }
  }, [
    activeScenario,
    questionIndex,
    selectedOptionId,
    feedbackState,
    currentAttempts,
    logs,
    startTime,
    isCompleted,
  ]);

  // Auto-save active track
  useEffect(() => {
    localStorage.setItem('aq_active_track', selectedTrack);
  }, [selectedTrack]);

  // Refresh portfolio from storage when component mounts
  useEffect(() => {
    setPortfolio(getStoredPortfolio());
  }, []);

  const currentScenarios = selectedTrack === 'mixing' ? mixingScenarios : recordingScenarios;
  const currentQuestion = activeScenario ? activeScenario.questions[questionIndex] : null;

  const startScenario = (scenario: Scenario) => {
    setActiveScenario(scenario);
    setQuestionIndex(0);
    setSelectedOptionId(null);
    setFeedbackState('idle');
    setCurrentAttempts([]);
    setLogs([]);
    setStartTime(Date.now());
    setIsCompleted(false);
  };

  const exitScenario = () => {
    localStorage.removeItem('aq_active_adventure');
    setActiveScenario(null);
    setIsCompleted(false);
  };

  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;
    if (feedbackState === 'correct') return; // already solved

    const option = currentQuestion.options.find((o) => o.id === optionId);
    if (!option) return;

    setSelectedOptionId(optionId);
    const newAttempts = [...currentAttempts, option.label];
    setCurrentAttempts(newAttempts);

    if (option.isCorrect) {
      setFeedbackState('correct');
      soundEngine.playSuccess();

      // Log this question
      const logEntry: QuestionAttemptLog = {
        questionId: currentQuestion.id,
        questionPrompt: currentQuestion.prompt,
        attempts: newAttempts,
        finalAnswer: option.label,
        isCorrect: true,
        wasFirstTry: newAttempts.length === 1,
      };

      const updatedLogs = [...logs, logEntry];
      setLogs(updatedLogs);
    } else {
      setFeedbackState('incorrect');
      soundEngine.playIncorrect();
    }
  };

  const handleNextQuestion = () => {
    if (!activeScenario) return;
    if (questionIndex < activeScenario.questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setFeedbackState('idle');
      setCurrentAttempts([]);
    }
  };

  const completeAdventure = (finalLogs: QuestionAttemptLog[]) => {
    if (!activeScenario) return;

    // Student identity comes strictly from Grade Report / storage
    const currentName =
      localStorage.getItem('aq_student_name') ||
      portfolio?.studentName ||
      'Student';
    const currentPeriod =
      localStorage.getItem('aq_student_period') ||
      portfolio?.period ||
      'Period 1';

    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const totalQuestions = activeScenario.questions.length;
    const firstTryCount = finalLogs.filter((l) => l.wasFirstTry).length;
    const totalPoints = finalLogs.reduce((acc, log) => {
      if (log.attempts.length === 1) return acc + 1.0;
      if (log.attempts.length === 2) return acc + 0.5;
      return acc + 0.0;
    }, 0);
    const score = Math.round((totalPoints / totalQuestions) * 100);

    const scenarioRecord: CompletedScenarioRecord = {
      scenarioId: activeScenario.id,
      scenarioTitle: activeScenario.title,
      trackId: activeScenario.track,
      trackTitle: activeScenario.track === 'mixing' ? 'Mixing Challenges' : 'Recording Challenges',
      category: activeScenario.category || 'instrument',
      completedAt: new Date().toISOString(),
      timeSpentSeconds: timeSpent,
      totalQuestions,
      firstTryCorrectCount: firstTryCount,
      scorePercentage: score,
      totalAttempts: finalLogs.reduce((acc, curr) => acc + curr.attempts.length, 0),
      logs: finalLogs,
    };

    // Save to master student portfolio covering all challenges
    const updatedPortfolio = saveCompletedScenario(scenarioRecord, currentName, currentPeriod);
    setPortfolio(updatedPortfolio);
    onPortfolioUpdated?.(updatedPortfolio);

    // Also notify session listener
    const baseSession: Omit<StudentSession, 'verificationHash'> = {
      studentName: currentName,
      period: currentPeriod,
      sessionId: `AQ-${Date.now()}`,
      completedAt: scenarioRecord.completedAt,
      trackId: scenarioRecord.trackId,
      trackTitle: scenarioRecord.trackTitle,
      scenarioId: scenarioRecord.scenarioId,
      scenarioTitle: scenarioRecord.scenarioTitle,
      totalQuestions,
      firstTryCorrectCount: firstTryCount,
      scorePercentage: score,
      totalAttempts: scenarioRecord.totalAttempts,
      timeSpentSeconds: timeSpent,
      logs: finalLogs,
    };
    const hash = computeVerificationHash(baseSession);
    onSessionCompleted?.({ ...baseSession, verificationHash: hash });

    setIsCompleted(true);
    // Clear active ongoing adventure save since it's completed
    localStorage.removeItem('aq_active_adventure');
  };

  // 1. CHALLENGE SELECTION SCREEN
  if (!activeScenario) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6 space-y-4 sm:space-y-5">
        {/* Welcome & Overview Banner */}
        <div className="p-4 sm:p-5 bg-slate-900/80 border border-slate-800 rounded-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-1.5">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              AudioQuest Studio Adventures
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-none leading-relaxed">
              Step into the producer's chair. Diagnose real-world acoustic, tracking, and mixing challenges across professional studio instruments. Your progress is auto-saved as you go.
            </p>
          </div>
        </div>

        {/* Combined Portfolio Progress & Studio Achievement Badges Bar */}
        <div className="p-4 sm:p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                    Studio Achievements & Portfolio Progress
                  </h2>
                  <span className="text-[10px] font-mono text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                    {ACHIEVEMENT_BADGES.filter((b) => (portfolio?.totalScenariosCompleted || 0) >= b.milestone).length} / {ACHIEVEMENT_BADGES.length} Unlocked
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  <span className="font-semibold text-amber-400 font-mono">
                    {portfolio?.totalScenariosCompleted || 0}
                  </span>{' '}
                  of 18 Challenges Completed · Cumulative Grade:{' '}
                  <span className="font-semibold text-emerald-400 font-mono">
                    {portfolio?.overallScorePercentage || 0}%
                  </span>{' '}
                  ({portfolio?.overallFirstTryCount || 0}/{portfolio?.overallTotalQuestions || 0} first-try)
                </p>
              </div>
            </div>


          </div>

          {/* Compact Badges Row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-800/80">
            {ACHIEVEMENT_BADGES.map((badge) => {
              const completedCount = portfolio?.totalScenariosCompleted || 0;
              const isUnlocked = completedCount >= badge.milestone;
              const progress = Math.min(completedCount, badge.milestone);

              return (
                <div
                  key={badge.id}
                  className={`p-2 rounded-lg border flex items-center gap-2.5 transition-all ${
                    isUnlocked
                      ? 'bg-amber-500/10 border-amber-500/40 text-white'
                      : 'bg-slate-950/40 border-slate-800/80 opacity-50 text-slate-400'
                  }`}
                  title={`${badge.title}: ${badge.description}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                      isUnlocked
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                        : 'bg-slate-900 text-slate-500 border-slate-800'
                    }`}
                  >
                    {isUnlocked ? badge.icon : <Lock className="w-3.5 h-3.5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold truncate text-white">{badge.title}</div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {isUnlocked ? 'Unlocked' : `${progress}/${badge.milestone}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* HIGH-VISIBILITY SUB-TABS: "MIXING" & "RECORDING" */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
            Select Engineering Discipline:
          </div>

          <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-900/90 border-2 border-slate-800 rounded-2xl shadow-xl">
            {/* SUB-TAB 1: MIXING */}
            <button
              onClick={() => setSelectedTrack('mixing')}
              className={`py-3.5 px-3 sm:px-6 rounded-xl transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left cursor-pointer ${
                selectedTrack === 'mixing'
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20 font-bold scale-[1.01]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80 font-medium'
              }`}
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  selectedTrack === 'mixing'
                    ? 'bg-slate-950 text-amber-400'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Sliders className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-sm sm:text-lg font-black tracking-wider uppercase">
                    MIXING
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase hidden sm:inline-block ${
                      selectedTrack === 'mixing'
                        ? 'bg-slate-950/20 text-slate-950 border border-slate-950/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    12 Challenges
                  </span>
                </div>
                <div
                  className={`text-[11px] leading-tight hidden sm:flex items-center gap-1.5 flex-wrap pt-0.5 ${
                    selectedTrack === 'mixing' ? 'text-slate-900 font-medium' : 'text-slate-500'
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    <AudioEffectIcon name="eq" className="w-3.5 h-3.5" /> EQ
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <AudioEffectIcon name="compressor" className="w-3.5 h-3.5" /> compression
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <AudioEffectIcon name="saturation" className="w-3.5 h-3.5" /> saturation
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <AudioEffectIcon name="reverb" className="w-3.5 h-3.5" /> spatial FX
                  </span>
                </div>
              </div>
            </button>

            {/* SUB-TAB 2: RECORDING */}
            <button
              onClick={() => setSelectedTrack('recording')}
              className={`py-3.5 px-3 sm:px-6 rounded-xl transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left cursor-pointer ${
                selectedTrack === 'recording'
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20 font-bold scale-[1.01]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80 font-medium'
              }`}
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  selectedTrack === 'recording'
                    ? 'bg-slate-950 text-amber-400'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Mic2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-sm sm:text-lg font-black tracking-wider uppercase">
                    RECORDING
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase hidden sm:inline-block ${
                      selectedTrack === 'recording'
                        ? 'bg-slate-950/20 text-slate-950 border border-slate-950/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    6 Challenges
                  </span>
                </div>
                <div
                  className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold flex-wrap ${
                    selectedTrack === 'recording' ? 'text-slate-950/80' : 'text-slate-500'
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    <AudioEffectIcon name="dynamic-mic" className="w-3.5 h-3.5" /> mics
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <AudioEffectIcon name="acoustic-guitar" className="w-3.5 h-3.5" /> instruments
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <AudioEffectIcon name="drum-set" className="w-3.5 h-3.5" /> drums
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <AudioEffectIcon name="electric-guitar" className="w-3.5 h-3.5" /> amps
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <span>
                {selectedTrack === 'mixing'
                  ? 'Mixing Challenges: Select an Instrument or Problem to Solve'
                  : 'Recording Challenges: Select a Tracking Scenario to Solve'}
              </span>
            </h2>
            <span className="text-xs text-slate-500 font-mono hidden md:inline">
              Click any challenge to start
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentScenarios.map((scenario) => {
              const completedRecord = portfolio?.scenarios.find(
                (s) => s.scenarioId === scenario.id
              );
              // Extract detected effects tested in this scenario (limited to 3)
              const scenarioEffects = Array.from(
                new Set(
                  scenario.questions
                    .flatMap((q) => q.options.map((o) => detectAudioEffectKey(o.label)))
                    .filter((k): k is AudioEffectType => k !== null)
                )
              ).slice(0, 3);

              return (
                <div
                  key={scenario.id}
                  onClick={() => startScenario(scenario)}
                  className={`group relative p-4 bg-slate-900/70 hover:bg-slate-900 border rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2.5 ${
                    completedRecord
                      ? 'border-emerald-500/50 bg-emerald-950/15 hover:border-emerald-400'
                      : 'border-slate-800 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/5'
                  }`}
                >
                  <div className="space-y-2">
                    {/* Top Row: Schematic Icon, Title/Instrument, Score/Techniques Bubble */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform p-1">
                          {AUDIO_EFFECT_ICONS[scenario.iconName as AudioEffectType] ? (
                            <AudioEffectIcon
                              name={scenario.iconName as AudioEffectType}
                              className="w-5 h-5"
                            />
                          ) : (
                            iconMap[scenario.iconName] || <Sliders className="w-4 h-4" />
                          )}
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                          {scenario.title}
                        </h3>
                      </div>

                      {completedRecord ? (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded border bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-semibold flex items-center gap-1 shrink-0">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                          <span>{completedRecord.scorePercentage}%</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                          {scenario.questions.length} Techniques
                        </span>
                      )}
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {scenario.description}
                      </p>
                    </div>

                    {/* Covered gear & effects tags (up to 3) */}
                    {scenarioEffects.length > 0 && (
                      <div className="pt-1 hidden sm:flex items-center gap-1.5 flex-wrap">
                        {scenarioEffects.map((eff) => (
                          <span
                            key={eff}
                            title={`Covers: ${AUDIO_EFFECT_ICONS[eff]?.name}`}
                            className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 group-hover:border-amber-500/30 group-hover:text-amber-300 transition-colors"
                          >
                            <AudioEffectIcon name={eff} className="w-3 h-3" />
                            <span>{AUDIO_EFFECT_ICONS[eff]?.name.split(' (')[0]}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400">
                    <span>{completedRecord ? 'Replay Challenge' : 'Launch Challenge'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 2. CHALLENGE COMPLETED SCREEN
  if (isCompleted) {
    const totalQ = activeScenario.questions.length;
    const firstTryCount = logs.filter((l) => l.wasFirstTry).length;
    const totalPoints = logs.reduce((acc, log) => {
      if (log.attempts.length === 1) return acc + 1.0;
      if (log.attempts.length === 2) return acc + 0.5;
      return acc + 0.0;
    }, 0);
    const savedRecord = portfolio?.scenarios.find((s) => s.scenarioId === activeScenario.id);
    const scorePct = savedRecord?.scorePercentage ?? Math.round((totalPoints / totalQ) * 100);

    const activeStudentName =
      localStorage.getItem('aq_student_name') ||
      portfolio?.studentName ||
      'Student';
    const activePeriod =
      localStorage.getItem('aq_student_period') ||
      portfolio?.period ||
      'Period 1';

    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <div className="p-8 bg-slate-900/80 border border-slate-800 rounded-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {activeScenario.completionTitle}
            </h1>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              {activeScenario.completionSubtitle}
            </p>

            {/* Instrument Audio Tag for Challenge */}
            {activeScenario.iconName && hasAudioPlayback(activeScenario.iconName as AudioEffectType) && (
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => soundEngine.playConceptDemo(activeScenario.iconName)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-semibold cursor-pointer transition-all hover:scale-105"
                  title="Play mastered sound"
                >
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span>Hear Mastered {AUDIO_EFFECT_ICONS[activeScenario.iconName as AudioEffectType]?.name.split(' (')[0] || activeScenario.title}</span>
                </button>
              </div>
            )}
          </div>

          {/* Performance Stats for this Challenge */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-4 border-t border-slate-800">
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400">Student Profile</div>
              <div className="text-sm font-semibold text-white truncate">
                {activeStudentName}
              </div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400">Class Section</div>
              <div className="text-sm font-semibold text-white">{activePeriod}</div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400">Challenge Score</div>
              <div className="text-sm font-semibold text-amber-400 font-mono">
                {scorePct}%
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                {totalPoints} / {totalQ} pts · {firstTryCount} 1st-try
              </div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400">Total Tool Attempts</div>
              <div className="text-sm font-semibold text-emerald-400 font-mono">
                {logs.reduce((acc, l) => acc + l.attempts.length, 0)}
              </div>
            </div>
          </div>

          {/* Unlocked Badges Summary on Completion */}
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 max-w-lg mx-auto space-y-2">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Studio Milestone Badges Unlocked</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {ACHIEVEMENT_BADGES.map((badge) => {
                const isUnlocked = (portfolio?.totalScenariosCompleted || 0) >= badge.milestone;
                if (!isUnlocked) return null;
                return (
                  <span
                    key={badge.id}
                    className="inline-flex items-center gap-1.5 text-xs font-medium bg-amber-500/15 border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-lg shadow-sm"
                  >
                    {badge.icon}
                    <span>{badge.title}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Primary Action: Choose Another / Next Challenge */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={exitScenario}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer scale-105"
            >
              <span>Choose Another Challenge</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Subtle Grade Report Link */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center">
            {onViewGradeReport && (
              <button
                onClick={onViewGradeReport}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-slate-800/50 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
                <span>View Grade Report & Get Code ({portfolio?.totalScenariosCompleted || 1} Completed)</span>
              </button>
            )}
          </div>
        </div>

        {/* Step-by-Step Question Review Log */}
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4">
          <h2 className="text-sm font-semibold text-slate-300">
            Session Answer History
          </h2>
          <div className="divide-y divide-slate-800/80">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-1">
                  <div className="text-xs font-medium text-slate-200">
                    {idx + 1}. {log.questionPrompt}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Final Answer:{' '}
                    {(() => {
                      const ansEffect = detectAudioEffectKey(log.finalAnswer);
                      return (
                        <span className="text-emerald-400 font-medium inline-flex items-center gap-1.5">
                          {ansEffect && (
                            <span className="w-5 h-4 inline-flex items-center justify-center p-0.5 rounded bg-slate-950 border border-slate-700 text-amber-300">
                              <AudioEffectIcon name={ansEffect} className="w-full h-full" />
                            </span>
                          )}
                          <span>{log.finalAnswer}</span>
                        </span>
                      );
                    })()}
                    {log.attempts.length > 1 && (
                      <span className="text-amber-400/80 ml-2">
                        (Tried {log.attempts.length} tools before solving)
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  {log.wasFirstTry ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      <Check className="w-3 h-3" />
                      <span>1st-Try (+100%)</span>
                    </span>
                  ) : log.attempts.length === 2 ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                      <span>2nd-Try (+50%)</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded">
                      {log.attempts.length} attempts (0%)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 3. CHALLENGE IN-PROGRESS QUESTION VIEW
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Breadcrumb & Exit */}
      <div className="flex items-center justify-between">
        <button
          onClick={exitScenario}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Exit to Challenge Menu</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400">
            Question {questionIndex + 1} of {activeScenario.questions.length}
          </span>
          <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 transition-all duration-300"
              style={{
                width: `${((questionIndex + 1) / activeScenario.questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="p-6 md:p-8 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
              {activeScenario.title}
            </span>
            {currentQuestion?.contextKicker && (
              <span className="text-xs text-slate-400 font-mono">
                {currentQuestion.contextKicker}
              </span>
            )}
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {currentQuestion?.prompt}
          </h1>

          {currentQuestion?.subtitle && (
            <p className="text-sm text-slate-400">{currentQuestion.subtitle}</p>
          )}
        </div>

        {/* Unified Correct Technique & Explanation Card (between question and answers) */}
        {feedbackState === 'correct' && selectedOptionId && (() => {
          const selectedOpt = currentQuestion?.options.find((o) => o.id === selectedOptionId);
          const effKey = selectedOpt ? detectAudioEffectKey(selectedOpt.label) : null;
          const dKey = effKey || selectedOpt?.soundDemoType || activeScenario?.iconName;
          const isPlaying = dKey && playingDemoKey === dKey;
          return (
            <div className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-semibold text-sm text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Correct Technique!</span>
                </div>
                <div className="flex items-center gap-2">
                  {dKey && hasAudioPlayback(dKey as AudioEffectType) && (
                    <button
                      type="button"
                      onClick={() => handlePlayDemo(dKey)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                        isPlaying
                          ? 'bg-emerald-500 text-slate-950 border-white ring-2 ring-emerald-400/50 animate-pulse'
                          : 'text-emerald-300 hover:text-white bg-emerald-500/20 border-emerald-500/40 hover:bg-emerald-500/30'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Hear Effect</span>
                    </button>
                  )}
                  {effKey && onOpenSchematics && (
                    <button
                      type="button"
                      onClick={() => onOpenSchematics(effKey)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>Explore in FX & Gear Library</span>
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                {selectedOpt?.explanation}
              </p>

              <div className="pt-2 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-3">
                {/* Bottom Left: Audio demo icon + general description */}
                {dKey && (() => {
                  const demoType = dKey;
                  const DEMO_TO_ICON: Record<string, AudioEffectType> = {
                    'de-esser': 'de-esser',
                    compressor: 'compressor',
                    'serial-compression': 'serial-compression',
                    'parallel-compression': 'parallel-compression',
                    'sidechain-compression': 'sidechain-compression',
                    filter: 'hi-pass-filter',
                    saturation: 'saturation',
                    chorus: 'chorus',
                    reverb: 'reverb',
                    gated: 'reverb',
                    bitcrush: 'bitcrusher',
                    tremolo: 'tremolo',
                  };
                  const labels: Record<string, { name: string; desc: string }> = {
                    'de-esser': { name: 'De-Esser Action', desc: 'Listen to frequency-dependent high attenuation' },
                    compressor: { name: 'Compression Clamp', desc: 'Hear dynamic leveling and peak suppression' },
                    'serial-compression': { name: 'Serial Compression', desc: 'Chaining multiple units for transparent gain reduction' },
                    'parallel-compression': { name: 'Parallel Compression', desc: 'Blending squashed parallel copy with dry signal' },
                    'sidechain-compression': { name: 'Sidechain Compression', desc: 'Ducking volume automatically from an external trigger' },
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
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0 p-0.5">
                        <AudioEffectIcon name={iconKey} className="w-full h-full" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-emerald-100 truncate">{info.name}</div>
                        <div className="text-[10px] text-emerald-300/85 truncate">{info.desc}</div>
                      </div>
                    </div>
                  );
                })()}

                {/* Bottom Right: Next Technique Button */}
                <div>
                  {questionIndex < activeScenario.questions.length - 1 ? (
                    <button
                      onClick={handleNextQuestion}
                      className="px-4 py-2 text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
                    >
                      <span>Next Technique</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => completeAdventure(logs)}
                      className="px-4 py-2 text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
                    >
                      <span>Finish Challenge</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Options Grid */}
        <div className="grid grid-cols-1 gap-3 pt-2">
          {currentQuestion?.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const hasAttempted = currentAttempts.includes(option.label);
            const effectKey = detectAudioEffectKey(option.label);
            const demoKey = effectKey || option.soundDemoType || activeScenario?.iconName;
            const isPlayingThis = demoKey && playingDemoKey === demoKey;

            let btnStyle =
              'bg-slate-950/80 hover:bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700';

            if (isSelected) {
              if (option.isCorrect) {
                btnStyle =
                  'bg-emerald-500/15 border-emerald-500/60 text-emerald-200 shadow-sm shadow-emerald-500/10';
              } else {
                btnStyle = 'bg-rose-500/15 border-rose-500/60 text-rose-200';
              }
            } else if (hasAttempted && !option.isCorrect) {
              btnStyle = 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60';
            }

            return (
              <div
                key={option.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (feedbackState !== 'correct') {
                    handleSelectOption(option.id);
                  }
                }}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && feedbackState !== 'correct') {
                    e.preventDefault();
                    handleSelectOption(option.id);
                  }
                }}
                className={`p-4 rounded-xl border text-left transition-all duration-150 flex items-center justify-between gap-4 select-none ${
                  feedbackState === 'correct' ? 'cursor-default' : 'cursor-pointer'
                } ${btnStyle}`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected && option.isCorrect
                        ? 'border-emerald-400 bg-emerald-500 text-slate-950'
                        : isSelected && !option.isCorrect
                        ? 'border-rose-400 bg-rose-500 text-white'
                        : 'border-slate-700 bg-slate-900 text-slate-400'
                    }`}
                  >
                    {isSelected && option.isCorrect ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : isSelected && !option.isCorrect ? (
                      <XCircle className="w-3.5 h-3.5" />
                    ) : (
                      <span className="text-xs font-semibold">
                        {String.fromCharCode(
                          65 + currentQuestion.options.findIndex((o) => o.id === option.id)
                        )}
                      </span>
                    )}
                  </div>

                  {/* Equipment & FX Icon */}
                  {effectKey && (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenSchematics?.(effectKey);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.stopPropagation();
                          e.preventDefault();
                          onOpenSchematics?.(effectKey);
                        }
                      }}
                      title={`${AUDIO_EFFECT_ICONS[effectKey]?.name} (click to inspect info)`}
                      className={`relative z-10 w-12 h-8 rounded-lg border flex items-center justify-center p-0.5 shrink-0 transition-all cursor-pointer hover:border-amber-400/80 hover:bg-slate-800 pointer-events-auto active:scale-95 ${
                        isSelected && option.isCorrect
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                          : isSelected && !option.isCorrect
                          ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                          : 'bg-slate-900 border-slate-700/80 text-slate-300'
                      }`}
                    >
                      <AudioEffectIcon
                        name={effectKey}
                        className={`w-full h-full ${
                          activeScenario?.id === 'eq-module' &&
                          (questionIndex === 1 || questionIndex === 2) &&
                          option.id === 'opt-1'
                            ? 'scale-y-[-1]'
                            : ''
                        }`}
                      />
                    </div>
                  )}

                  <span className="text-sm font-semibold whitespace-normal break-words flex-1">{option.label}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {effectKey && onOpenSchematics && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenSchematics(effectKey);
                      }}
                      title="Inspect info & sound demo"
                      className="relative z-10 text-[10px] font-mono text-slate-300 hover:text-amber-300 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700 hover:border-amber-400/80 hover:bg-slate-800 transition-all inline-flex items-center gap-1 cursor-pointer active:scale-95 shadow-sm pointer-events-auto"
                    >
                      <Info className="w-3 h-3 text-amber-400" />
                      <span>Info</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Incorrect Attempt Feedback Box at the Bottom */}
        {feedbackState === 'incorrect' && selectedOptionId && (() => {
          const incorrectOpt = currentQuestion?.options.find((o) => o.id === selectedOptionId);
          return (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-xs text-rose-300">
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Incorrect Technique: {incorrectOpt?.label}</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                {incorrectOpt?.explanation}
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
