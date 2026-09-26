import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle,
  AlertTriangle,
  Download,
  Copy,
  Check,
  GraduationCap,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  ChevronDown,
  ChevronUp,
  Trash2,
  Clock,
  Sparkles,
  User,
} from 'lucide-react';
import {
  decodeSubmissionCode,
  parseBatchCodes,
  encodeStudentPortfolio,
  encodeStudentSession,
} from '../utils/codec';
import {
  getStoredPortfolio,
  clearStudentPortfolio,
  saveCompletedScenario,
  updateStudentProfileInPortfolio,
} from '../utils/portfolioStorage';
import { StudentPortfolio, CompletedScenarioRecord, StudentSession } from '../types/game';
import {
  AudioEffectIcon,
  detectAudioEffectKey,
  AUDIO_EFFECT_ICONS,
  AudioEffectType,
} from './AudioEngineeringIcons';

interface GradeReportProps {
  portfolio?: StudentPortfolio | null;
  latestSession?: StudentSession | null;
  initialCode?: string;
  defaultSubTab?: 'student' | 'teacher';
  onNavigateToAdventure?: () => void;
  onPortfolioChange?: (portfolio: StudentPortfolio | null) => void;
  onOpenSchematics?: (effect?: AudioEffectType) => void;
}

export const GradeReport: React.FC<GradeReportProps> = ({
  portfolio: propPortfolio,
  latestSession,
  initialCode = '',
  defaultSubTab = 'student',
  onNavigateToAdventure,
  onPortfolioChange,
  onOpenSchematics,
}) => {
  // Load current portfolio from props or local storage
  const [portfolio, setPortfolio] = useState<StudentPortfolio | null>(() => {
    return propPortfolio || getStoredPortfolio();
  });

  // Student Profile state (housed exclusively in Grade Report)
  const [studentName, setStudentName] = useState<string>(() => {
    return (
      localStorage.getItem('aq_student_name') ||
      propPortfolio?.studentName ||
      getStoredPortfolio()?.studentName ||
      ''
    );
  });

  const [period, setPeriod] = useState<string>(() => {
    return (
      localStorage.getItem('aq_student_period') ||
      propPortfolio?.period ||
      getStoredPortfolio()?.period ||
      'Period 1'
    );
  });

  const [subTab, setSubTab] = useState<'student' | 'teacher'>(() => {
    if (initialCode) return 'teacher';
    return defaultSubTab;
  });

  // Keep portfolio in sync if prop changes
  useEffect(() => {
    if (propPortfolio) {
      setPortfolio(propPortfolio);
      if (propPortfolio.studentName) setStudentName(propPortfolio.studentName);
      if (propPortfolio.period) setPeriod(propPortfolio.period);
    } else {
      const stored = getStoredPortfolio();
      setPortfolio(stored);
      if (stored?.studentName) setStudentName(stored.studentName);
      if (stored?.period) setPeriod(stored.period);
    }
  }, [propPortfolio]);

  const handleStudentNameChange = (name: string) => {
    setStudentName(name);
    localStorage.setItem('aq_student_name', name);
    if (portfolio) {
      const updated = updateStudentProfileInPortfolio(name, period);
      if (updated) {
        setPortfolio(updated);
        onPortfolioChange?.(updated);
      }
    }
  };

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
    localStorage.setItem('aq_student_period', newPeriod);
    if (portfolio) {
      const updated = updateStudentProfileInPortfolio(studentName, newPeriod);
      if (updated) {
        setPortfolio(updated);
        onPortfolioChange?.(updated);
      }
    }
  };

  // Student generator state
  const [submissionScope, setSubmissionScope] = useState<'all' | string>('all');
  const [studentCode, setStudentCode] = useState<string>('');
  const [studentCopied, setStudentCopied] = useState(false);
  const [expandedStudentScenarioId, setExpandedStudentScenarioId] = useState<string | null>(null);

  // Teacher checker state
  const [teacherMode, setTeacherMode] = useState<'single' | 'batch'>('single');
  const [singleCodeInput, setSingleCodeInput] = useState<string>(initialCode);
  const [batchCodeInput, setBatchCodeInput] = useState<string>('');
  const [copiedRecord, setCopiedRecord] = useState(false);
  const [copiedMultiRow, setCopiedMultiRow] = useState(false);
  const [teacherNotes, setTeacherNotes] = useState<string>('');
  const [selectedAuditScenarioId, setSelectedAuditScenarioId] = useState<string>('all');

  // Keep portfolio in sync if prop changes
  useEffect(() => {
    if (propPortfolio) {
      setPortfolio(propPortfolio);
    } else {
      setPortfolio(getStoredPortfolio());
    }
  }, [propPortfolio]);

  // Synchronize initial code
  useEffect(() => {
    if (initialCode) {
      setSingleCodeInput(initialCode);
      setSubTab('teacher');
    }
  }, [initialCode]);

  // Generate Base64 submission code whenever portfolio or scope changes
  useEffect(() => {
    if (!portfolio || portfolio.scenarios.length === 0) {
      setStudentCode('');
      return;
    }

    if (submissionScope === 'all') {
      // Encode ALL student work across the app
      const code = encodeStudentPortfolio(portfolio);
      setStudentCode(code);
    } else {
      // Encode single specific scenario
      const targetScenario = portfolio.scenarios.find((s) => s.scenarioId === submissionScope);
      if (targetScenario) {
        const singleSessionData: Omit<StudentSession, 'verificationHash'> = {
          studentName: portfolio.studentName,
          period: portfolio.period,
          sessionId: `AQ-${Date.now()}`,
          completedAt: targetScenario.completedAt,
          trackId: targetScenario.trackId,
          trackTitle: targetScenario.trackTitle,
          scenarioId: targetScenario.scenarioId,
          scenarioTitle: targetScenario.scenarioTitle,
          totalQuestions: targetScenario.totalQuestions,
          firstTryCorrectCount: targetScenario.firstTryCorrectCount,
          scorePercentage: targetScenario.scorePercentage,
          totalAttempts: targetScenario.totalAttempts,
          timeSpentSeconds: targetScenario.timeSpentSeconds,
          logs: targetScenario.logs,
        };
        const code = encodeStudentSession(singleSessionData);
        setStudentCode(code);
      }
    }
  }, [portfolio, submissionScope]);

  // Teacher Single Student Audit live decode
  const singleDecodeResult = singleCodeInput.trim()
    ? decodeSubmissionCode(singleCodeInput)
    : null;
  const decodedPortfolio = singleDecodeResult?.data;

  // Teacher Batch Roster live decode
  const batchResult = parseBatchCodes(batchCodeInput);

  const handleCopyStudentCode = () => {
    if (!studentCode) return;
    navigator.clipboard.writeText(studentCode);
    setStudentCopied(true);
    setTimeout(() => setStudentCopied(false), 2500);
  };

  const handleCopyGradebookSummary = () => {
    if (!decodedPortfolio) return;
    const formattedDate = new Date(decodedPortfolio.updatedAt).toLocaleDateString();
    const scenarioList = decodedPortfolio.scenarios
      .map((s) => `${s.scenarioTitle} (${s.scorePercentage}%)`)
      .join('; ');
    const row = `${decodedPortfolio.studentName}\t${decodedPortfolio.period}\t${decodedPortfolio.overallScorePercentage}%\t${decodedPortfolio.totalScenariosCompleted} scenarios\t${decodedPortfolio.overallFirstTryCount}/${decodedPortfolio.overallTotalQuestions}\t${decodedPortfolio.overallTotalAttempts} attempts\t${formattedDate}\t${scenarioList}\t${teacherNotes || 'Completed'}`;
    navigator.clipboard.writeText(row);
    setCopiedRecord(true);
    setTimeout(() => setCopiedRecord(false), 2000);
  };

  const handleCopyGradebookMultiRow = () => {
    if (!decodedPortfolio) return;
    const formattedDate = new Date(decodedPortfolio.updatedAt).toLocaleDateString();
    const rows = decodedPortfolio.scenarios.map((s) => {
      return `${decodedPortfolio.studentName}\t${decodedPortfolio.period}\t${s.scenarioTitle}\t${s.scorePercentage}%\t${s.firstTryCorrectCount}/${s.totalQuestions}\t${s.totalAttempts} attempts\t${s.timeSpentSeconds}s\t${formattedDate}\t${teacherNotes || 'Completed'}`;
    });
    navigator.clipboard.writeText(rows.join('\n'));
    setCopiedMultiRow(true);
    setTimeout(() => setCopiedMultiRow(false), 2000);
  };

  const handleExportCSV = () => {
    if (batchResult.validPortfolios.length === 0) return;
    const headers = [
      'Student Name',
      'Period',
      'Scenarios Completed',
      'Overall Score %',
      '1st-Try Correct',
      'Total Questions',
      'Total Tool Attempts',
      'Total Time (sec)',
      'Scenarios Breakdown',
      'Last Completed Date',
      'Verification Hash',
    ];

    const rows = batchResult.validPortfolios.map((p) => {
      const breakdown = p.scenarios
        .map((s) => `${s.scenarioTitle}: ${s.scorePercentage}% (${s.firstTryCorrectCount}/${s.totalQuestions})`)
        .join('; ');
      return [
        `"${p.studentName}"`,
        `"${p.period}"`,
        p.totalScenariosCompleted,
        p.overallScorePercentage,
        p.overallFirstTryCount,
        p.overallTotalQuestions,
        p.overallTotalAttempts,
        p.overallTimeSpentSeconds,
        `"${breakdown}"`,
        `"${new Date(p.updatedAt).toLocaleString()}"`,
        `"${p.verificationHash}"`,
      ];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `AudioQuest_Class_Roster_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetWork = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all saved student work? This will clear all completed scenarios on this browser.'
      )
    ) {
      clearStudentPortfolio();
      setPortfolio(null);
      onPortfolioChange?.(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-slate-900/80 border border-slate-800 rounded-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Grade Report & Verification
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Generate submission codes covering all completed scenarios/instruments and audit student progress.
          </p>
        </div>

        {/* Unified Subtab Switcher: Student vs Teacher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => setSubTab('student')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              subTab === 'student'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student Code Generation</span>
          </button>
          <button
            onClick={() => setSubTab('teacher')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              subTab === 'teacher'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Teacher Code Checker</span>
          </button>
        </div>
      </div>

      {/* 1. STUDENT CODE GENERATOR VIEW */}
      {subTab === 'student' && (
        <div className="space-y-6">
          {/* Student Identification & Class Period (Housed exclusively in Grade Report) */}
          <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800/80 gap-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-bold text-white tracking-wide uppercase">
                  Student Identification & Class Section
                </h2>
              </div>
              <p className="text-xs text-slate-400">
                Your name & period are embedded directly into your submission code and teacher gradebook.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Student Full Name
                </label>
                <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2.5 rounded-lg border border-slate-800 focus-within:border-amber-500 transition-colors">
                  <User className="w-4 h-4 text-slate-500 shrink-0" />
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => handleStudentNameChange(e.target.value)}
                    placeholder="Enter your first & last name..."
                    className="bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none w-full"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Class Period / Lab Section
                </label>
                <select
                  value={period}
                  onChange={(e) => handlePeriodChange(e.target.value)}
                  className="w-full bg-slate-950 text-xs sm:text-sm text-slate-200 border border-slate-800 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="Period 1">Period 1</option>
                  <option value="Period 2">Period 2</option>
                  <option value="Period 3">Period 3</option>
                  <option value="Period 4">Period 4</option>
                  <option value="Period 5">Period 5</option>
                  <option value="Period 6">Period 6</option>
                  <option value="Period 7">Period 7</option>
                  <option value="Period 8">Period 8</option>
                   <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {portfolio && portfolio.scenarios.length > 0 ? (
            <div className="space-y-6">
              {/* Comprehensive Portfolio Overview Card */}
              <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      <span>Full Studio Portfolio</span>
                    </span>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                      <span>{studentName || portfolio.studentName || 'Student'}</span>
                      <span className="text-xs font-normal text-slate-400">
                        ({period || portfolio.period})
                      </span>
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-md border bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
                      Overall Grade: {portfolio.overallScorePercentage}%
                    </span>
                    <span className="text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                      {portfolio.totalScenariosCompleted} of 13 Scenarios Completed
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                    <div className="text-slate-400">Scenarios Mastered</div>
                    <div className="text-sm font-semibold text-white font-mono mt-0.5">
                      {portfolio.totalScenariosCompleted} modules
                    </div>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                    <div className="text-slate-400">Cumulative 1st-Try</div>
                    <div className="text-sm font-semibold text-amber-400 font-mono mt-0.5">
                      {portfolio.overallFirstTryCount} / {portfolio.overallTotalQuestions} (
                      {portfolio.overallScorePercentage}%)
                    </div>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                    <div className="text-slate-400">Total Tool Attempts</div>
                    <div className="text-sm font-semibold text-emerald-400 font-mono mt-0.5">
                      {portfolio.overallTotalAttempts} choices
                    </div>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                    <div className="text-slate-400">Total Engineering Time</div>
                    <div className="text-sm font-semibold text-slate-300 font-mono mt-0.5">
                      {Math.floor(portfolio.overallTimeSpentSeconds / 60)}m{' '}
                      {portfolio.overallTimeSpentSeconds % 60}s
                    </div>
                  </div>
                </div>
              </div>

              {/* Submission Code Generation Card */}
              <div className="p-6 bg-slate-900/60 border border-amber-500/30 rounded-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      <h3 className="text-sm font-semibold text-white">
                        Official Submission Code (Base64)
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400">
                      Encodes your complete score history, answers, and verification hash for your teacher.
                    </p>
                  </div>

                  {/* Scope Selector: All Scenarios (Default) vs Individual */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Code Scope:</span>
                    <select
                      value={submissionScope}
                      onChange={(e) => setSubmissionScope(e.target.value)}
                      className="bg-slate-950 text-xs text-amber-300 border border-slate-800 px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-amber-500"
                    >
                      <option value="all">
                        ★ All Completed Work ({portfolio.scenarios.length} Scenarios)
                      </option>
                      {portfolio.scenarios.map((s) => (
                        <option key={s.scenarioId} value={s.scenarioId}>
                          Only {s.scenarioTitle} ({s.scorePercentage}%)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Covered Scenarios Pill Badges */}
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-950/80 rounded-lg border border-slate-800/80 text-[11px]">
                  <span className="text-slate-400 font-medium">Covered in this code:</span>
                  {submissionScope === 'all' ? (
                    portfolio.scenarios.map((s) => (
                      <span
                        key={s.scenarioId}
                        className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono"
                      >
                        {s.scenarioTitle} ({s.scorePercentage}%)
                      </span>
                    ))
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono">
                      {portfolio.scenarios.find((s) => s.scenarioId === submissionScope)?.scenarioTitle}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    readOnly
                    rows={3}
                    value={studentCode}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-amber-300/90 focus:outline-none select-all break-all"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <button
                    onClick={handleCopyStudentCode}
                    className="px-4 py-2 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                  >
                    {studentCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>
                      {studentCopied
                        ? `Copied Code (${submissionScope === 'all' ? 'All ' + portfolio.scenarios.length + ' Scenarios' : '1 Scenario'})!`
                        : 'Copy Code for Teacher'}
                    </span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSingleCodeInput(studentCode);
                        setSubTab('teacher');
                        setTeacherMode('single');
                      }}
                      className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <span>Inspect Code in Teacher Checker</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Scenarios / Instruments Matrix & Diagnostic Breakdown */}
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-semibold text-slate-200">
                      Completed Scenarios & Instrument Breakdown
                    </h3>
                    <p className="text-xs text-slate-400">
                      Click any scenario below to expand and review all question attempts and diagnostics.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {portfolio.scenarios.length} Scenarios Logged
                  </span>
                </div>

                <div className="space-y-3">
                  {portfolio.scenarios.map((scenario) => {
                    const isExpanded = expandedStudentScenarioId === scenario.scenarioId;
                    return (
                      <div
                        key={scenario.scenarioId}
                        className="bg-slate-950/70 border border-slate-800 rounded-lg overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() =>
                            setExpandedStudentScenarioId(isExpanded ? null : scenario.scenarioId)
                          }
                          className="w-full p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left hover:bg-slate-900/40 transition-colors"
                        >
                          <div className="space-y-0.5">
                            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                              {scenario.trackTitle}
                            </div>
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                              <span>{scenario.scenarioTitle}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              className={`text-xs font-bold px-2.5 py-0.5 rounded border font-mono ${
                                scenario.scorePercentage >= 90
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                  : scenario.scorePercentage >= 70
                                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                              }`}
                            >
                              {scenario.scorePercentage}%
                            </span>

                            <div className="text-xs text-slate-400 hidden md:block">
                              1st Try: {scenario.firstTryCorrectCount} / {scenario.totalQuestions} · {scenario.totalAttempts} attempts
                            </div>

                            <div className="text-slate-400 p-1">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          </div>
                        </button>

                        {/* Expanded Question-by-Question Audit Table for this Scenario */}
                        {isExpanded && (
                          <div className="p-4 border-t border-slate-800/80 bg-slate-900/40 space-y-3">
                            <div className="text-xs font-semibold text-slate-300">
                              Questions & Answers Logged:
                            </div>
                            <div className="divide-y divide-slate-800/60">
                              {scenario.logs.map((log, lIdx) => (
                                <div
                                  key={lIdx}
                                  className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                                >
                                  <div className="space-y-0.5">
                                    <div className="font-medium text-slate-200">
                                      {lIdx + 1}. {log.questionPrompt}
                                    </div>
                                    <div className="text-[11px] text-slate-400">
                                      Final Choice:{' '}
                                      {(() => {
                                        const effectKey = detectAudioEffectKey(log.finalAnswer);
                                        return (
                                          <span className="text-emerald-400 font-medium inline-flex items-center gap-1.5">
                                            {effectKey && (
                                              <span className="w-6 h-5 inline-flex items-center justify-center p-0.5 rounded bg-slate-950 border border-slate-700 text-amber-400">
                                                <AudioEffectIcon name={effectKey} className="w-full h-full" />
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

                                  <div className="shrink-0">
                                    {log.wasFirstTry ? (
                                      <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                                        1st Try Correct
                                      </span>
                                    ) : (
                                      <span className="text-[11px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                                        {log.attempts.length} Attempts
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Workstation Management: Clear work */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleResetWork}
                  className="px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 border border-transparent hover:border-rose-900/50 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset Saved Progress on This Browser</span>
                </button>

                {onNavigateToAdventure && (
                  <button
                    onClick={onNavigateToAdventure}
                    className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>Solve More Scenarios</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Empty state when no adventure has been completed yet */
            <div className="p-12 bg-slate-900/40 border border-slate-800 rounded-xl text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-white">
                  No Completed Studio Work Found Yet
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Complete any mixing or recording scenario in the Adventure tab. All scenarios and instruments you solve will automatically be collected into your portfolio code here!
                </p>
              </div>

              {onNavigateToAdventure && (
                <button
                  onClick={onNavigateToAdventure}
                  className="px-4 py-2 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Start an Adventure Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* 2. TEACHER CODE CHECKER VIEW */}
      {subTab === 'teacher' && (
        <div className="space-y-6">
          {/* Sub Navigation within Teacher Checker */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTeacherMode('single')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  teacherMode === 'single'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Single Student Audit
              </button>
              <button
                onClick={() => setTeacherMode('batch')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  teacherMode === 'batch'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Batch Roster Import
              </button>
            </div>

            <span className="text-xs text-slate-400">
              {teacherMode === 'single' ? 'Audit student portfolio' : 'Import whole class'}
            </span>
          </div>

          {/* TEACHER: SINGLE STUDENT AUDIT */}
          {teacherMode === 'single' && (
            <div className="space-y-6">
              {/* Input Box */}
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-amber-400" />
                  <span>Paste Student Submission Code</span>
                </label>

                <textarea
                  rows={2}
                  value={singleCodeInput}
                  onChange={(e) => setSingleCodeInput(e.target.value)}
                  placeholder="Paste student submission code here (e.g. AUDIOQUEST-...)"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500/50 rounded-lg p-3 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none select-all"
                />
              </div>

              {/* Validation Status / Error Message */}
              {singleCodeInput.trim() && singleDecodeResult && !singleDecodeResult.valid && (
                <div className="p-4 bg-rose-950/30 border border-rose-500/40 rounded-xl flex items-center gap-3 text-xs text-rose-300">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{singleDecodeResult.error || 'Invalid code format.'}</span>
                </div>
              )}

              {/* Decoded Student Portfolio Report */}
              {decodedPortfolio && (
                <div className="space-y-6">
                  {/* Summary Stats Dossier */}
                  <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
                      <div>
                        <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                          {decodedPortfolio.totalScenariosCompleted > 1
                            ? `Comprehensive Portfolio (${decodedPortfolio.totalScenariosCompleted} Scenarios)`
                            : 'Single Module Submission'}
                        </span>
                        <h2 className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                          <span>{decodedPortfolio.studentName}</span>
                          <span className="text-xs font-normal text-slate-400">
                            ({decodedPortfolio.period})
                          </span>
                        </h2>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-md border ${
                            decodedPortfolio.overallScorePercentage >= 90
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                              : decodedPortfolio.overallScorePercentage >= 70
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                          }`}
                        >
                          {decodedPortfolio.overallScorePercentage >= 90
                            ? 'Mastery Level'
                            : decodedPortfolio.overallScorePercentage >= 70
                            ? 'Proficient'
                            : 'Needs Review'}{' '}
                          · {decodedPortfolio.overallScorePercentage}%
                        </span>

                        <span className="text-[11px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                          Hash: {decodedPortfolio.verificationHash}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                        <div className="text-slate-400">Scenarios Completed</div>
                        <div className="text-sm font-semibold text-white mt-0.5">
                          {decodedPortfolio.totalScenariosCompleted} modules
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                        <div className="text-slate-400">1st-Try Accuracy</div>
                        <div className="text-sm font-semibold text-amber-400 mt-0.5 font-mono">
                          {decodedPortfolio.overallFirstTryCount} / {decodedPortfolio.overallTotalQuestions} (
                          {decodedPortfolio.overallScorePercentage}%)
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                        <div className="text-slate-400">Total Tool Attempts</div>
                        <div className="text-sm font-semibold text-white mt-0.5 font-mono">
                          {decodedPortfolio.overallTotalAttempts} total choices
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                        <div className="text-slate-400">Last Completed</div>
                        <div className="text-sm font-semibold text-slate-300 mt-0.5 font-mono">
                          {new Date(decodedPortfolio.updatedAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scenarios / Instruments Covered Selector */}
                  <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-200">
                          Scenarios & Instruments Audited ({decodedPortfolio.scenarios.length})
                        </h3>
                        <p className="text-xs text-slate-400">
                          Select an instrument to review that module's detailed question-by-question history.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          onClick={() => setSelectedAuditScenarioId('all')}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                            selectedAuditScenarioId === 'all'
                              ? 'bg-amber-400 text-slate-950'
                              : 'bg-slate-800 text-slate-300 hover:text-white'
                          }`}
                        >
                          All Instruments ({decodedPortfolio.scenarios.length})
                        </button>
                        {decodedPortfolio.scenarios.map((s) => (
                          <button
                            key={s.scenarioId}
                            onClick={() => setSelectedAuditScenarioId(s.scenarioId)}
                            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                              selectedAuditScenarioId === s.scenarioId
                                ? 'bg-amber-400 text-slate-950'
                                : 'bg-slate-800 text-slate-300 hover:text-white'
                            }`}
                          >
                            {s.scenarioTitle} ({s.scorePercentage}%)
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Scenarios Display: Filtered or All */}
                    <div className="space-y-6">
                      {decodedPortfolio.scenarios
                        .filter(
                          (s) =>
                            selectedAuditScenarioId === 'all' ||
                            s.scenarioId === selectedAuditScenarioId
                        )
                        .map((scenario) => (
                          <div
                            key={scenario.scenarioId}
                            className="bg-slate-950/70 border border-slate-800 rounded-lg p-4 space-y-4"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                              <div>
                                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                                  {scenario.trackTitle}
                                </span>
                                <h4 className="text-sm font-bold text-white">
                                  {scenario.scenarioTitle}
                                </h4>
                              </div>

                              <div className="flex items-center gap-3">
                                <span
                                  className={`text-xs font-bold px-2.5 py-0.5 rounded border ${
                                    scenario.scorePercentage >= 90
                                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                      : scenario.scorePercentage >= 70
                                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                                  }`}
                                >
                                  {scenario.scorePercentage}%
                                </span>
                                <span className="text-xs text-slate-400">
                                  1st-Try: {scenario.firstTryCorrectCount} / {scenario.totalQuestions}
                                </span>
                                <span className="text-xs text-slate-400">
                                  Attempts: {scenario.totalAttempts}
                                </span>
                                <span className="text-xs text-slate-400">
                                  Time: {scenario.timeSpentSeconds}s
                                </span>
                              </div>
                            </div>

                            {/* Question-by-Question Table */}
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                  <tr className="border-b border-slate-800 text-slate-400">
                                    <th className="py-2 px-3 font-semibold">#</th>
                                    <th className="py-2 px-3 font-semibold">Question Prompt</th>
                                    <th className="py-2 px-3 font-semibold">First Tool Tried</th>
                                    <th className="py-2 px-3 font-semibold">Guesses / Retries</th>
                                    <th className="py-2 px-3 font-semibold">Status</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                  {scenario.logs.map((log, idx) => (
                                    <tr key={idx} className="hover:bg-slate-950/40">
                                      <td className="py-2.5 px-3 font-mono text-slate-500">
                                        {idx + 1}
                                      </td>
                                      <td className="py-2.5 px-3 font-medium text-slate-200 max-w-xs">
                                        {log.questionPrompt}
                                      </td>
                                      <td className="py-2.5 px-3">
                                        {(() => {
                                          const attemptEff = detectAudioEffectKey(log.attempts[0]);
                                          return (
                                            <span
                                              className={`px-2 py-0.5 rounded text-[11px] font-medium inline-flex items-center gap-1.5 ${
                                                log.wasFirstTry
                                                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                                                  : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                                              }`}
                                            >
                                              {attemptEff && (
                                                <span className="w-5 h-4 inline-flex items-center justify-center p-0.5 rounded bg-slate-900 border border-slate-700/80">
                                                  <AudioEffectIcon name={attemptEff} className="w-full h-full text-current" />
                                                </span>
                                              )}
                                              <span>{log.attempts[0]}</span>
                                            </span>
                                          );
                                        })()}
                                      </td>
                                      <td className="py-2.5 px-3 text-slate-400">
                                        {log.attempts.length > 1 ? (
                                          <div className="flex flex-wrap gap-1">
                                            {log.attempts.slice(1).map((attempt, aIdx) => {
                                              const eff = detectAudioEffectKey(attempt);
                                              return (
                                                <span
                                                  key={aIdx}
                                                  className={`px-1.5 py-0.5 rounded text-[10px] inline-flex items-center gap-1 ${
                                                    attempt === log.finalAnswer
                                                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                                      : 'bg-slate-800 text-slate-300'
                                                  }`}
                                                >
                                                  <span>→</span>
                                                  {eff && <AudioEffectIcon name={eff} className="w-3 h-2.5 inline-block text-current" />}
                                                  <span>{attempt}</span>
                                                </span>
                                              );
                                            })}
                                          </div>
                                        ) : (
                                          <span className="text-slate-600">—</span>
                                        )}
                                      </td>
                                      <td className="py-2.5 px-3">
                                        {log.wasFirstTry ? (
                                          <span className="text-emerald-400 font-medium flex items-center gap-1">
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            <span>1st Try</span>
                                          </span>
                                        ) : (
                                          <span className="text-amber-400 font-medium">
                                            Solved ({log.attempts.length} attempts)
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Teacher Feedback & Quick Gradebook Export */}
                  <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4">
                    <h3 className="text-sm font-semibold text-slate-200">
                      Gradebook Export & Feedback
                    </h3>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={teacherNotes}
                        onChange={(e) => setTeacherNotes(e.target.value)}
                        placeholder="Optional teacher feedback note..."
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none"
                      />

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={handleCopyGradebookSummary}
                          className="px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                        >
                          {copiedRecord ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span>{copiedRecord ? 'Copied Summary Row!' : 'Copy Summary Row'}</span>
                        </button>

                        <button
                          onClick={handleCopyGradebookMultiRow}
                          className="px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                        >
                          {copiedMultiRow ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span>{copiedMultiRow ? 'Copied All Module Rows!' : 'Copy Detailed Rows (All Modules)'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TEACHER: BATCH ROSTER IMPORT */}
          {teacherMode === 'batch' && (
            <div className="space-y-6">
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
                  <span>Paste Multiple Student Submission Codes (One per line)</span>
                </label>

                <textarea
                  rows={4}
                  value={batchCodeInput}
                  onChange={(e) => setBatchCodeInput(e.target.value)}
                  placeholder="Paste student codes from Google Classroom or Google Forms here..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none"
                />
              </div>

              {/* Roster Table */}
              {batchResult.validPortfolios.length > 0 && (
                <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        Parsed Class Roster ({batchResult.validPortfolios.length} students)
                      </h3>
                      <p className="text-xs text-slate-400">
                        Class Average Score:{' '}
                        <span className="font-semibold text-amber-400 font-mono">
                          {Math.round(
                            batchResult.validPortfolios.reduce(
                              (acc, p) => acc + p.overallScorePercentage,
                              0
                            ) / batchResult.validPortfolios.length
                          )}
                          %
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={handleExportCSV}
                      className="px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Roster CSV</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="py-2.5 px-3">Student Name</th>
                          <th className="py-2.5 px-3">Period</th>
                          <th className="py-2.5 px-3">Scenarios Completed</th>
                          <th className="py-2.5 px-3">Overall Score %</th>
                          <th className="py-2.5 px-3">1st Try Correct</th>
                          <th className="py-2.5 px-3">Total Attempts</th>
                          <th className="py-2.5 px-3">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {batchResult.validPortfolios.map((p, idx) => (
                          <tr key={idx} className="hover:bg-slate-950/40">
                            <td className="py-3 px-3 font-semibold text-white">{p.studentName}</td>
                            <td className="py-3 px-3 text-slate-400">{p.period}</td>
                            <td className="py-3 px-3 text-slate-300">
                              <span className="font-medium text-amber-300">
                                {p.totalScenariosCompleted} scenarios
                              </span>{' '}
                              <span className="text-[11px] text-slate-500">
                                ({p.overallTotalQuestions} Qs)
                              </span>
                            </td>
                            <td className="py-3 px-3 font-mono font-bold text-amber-400">
                              {p.overallScorePercentage}%
                            </td>
                            <td className="py-3 px-3 font-mono text-slate-300">
                              {p.overallFirstTryCount} / {p.overallTotalQuestions}
                            </td>
                            <td className="py-3 px-3 font-mono text-slate-400">
                              {p.overallTotalAttempts}
                            </td>
                            <td className="py-3 px-3">
                              <button
                                onClick={() => {
                                  const code = encodeStudentPortfolio(p);
                                  setSingleCodeInput(code);
                                  setTeacherMode('single');
                                }}
                                className="text-amber-400 hover:text-amber-300 underline font-medium text-[11px]"
                              >
                                Inspect Portfolio
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
