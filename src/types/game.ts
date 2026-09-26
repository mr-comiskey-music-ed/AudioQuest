/**
 * AudioQuest: Studio Mixing & Recording Adventure Types
 */

export type TrackType = 'mixing' | 'recording';

export interface QuestionOption {
  id: string;
  label: string;
  explanation: string;
  isCorrect: boolean;
  soundDemoType?: 'de-esser' | 'compressor' | 'filter' | 'saturation' | 'chorus' | 'reverb' | 'gated' | 'bitcrush' | 'tremolo';
}

export interface Question {
  id: string;
  prompt: string;
  subtitle?: string;
  contextKicker?: string;
  options: QuestionOption[];
  educationalTip?: string;
  diagramType?: 'polar-pattern' | 'eq-curve' | 'compressor-curve' | 'mic-placement' | 'signal-flow';
  diagramData?: Record<string, any>;
}

export interface Scenario {
  id: string;
  track: TrackType;
  title: string;
  category: 'instrument' | 'mix-element';
  subtitle: string;
  description: string;
  iconName: string;
  accentColor: string;
  completionTitle: string;
  completionSubtitle: string;
  questions: Question[];
}

export interface QuestionAttemptLog {
  questionId: string;
  questionPrompt: string;
  attempts: string[];
  finalAnswer: string;
  isCorrect: boolean;
  wasFirstTry: boolean;
}

export interface CompletedScenarioRecord {
  scenarioId: string;
  scenarioTitle: string;
  trackId: TrackType;
  trackTitle: string;
  category?: 'instrument' | 'mix-element';
  completedAt: string;
  timeSpentSeconds: number;
  totalQuestions: number;
  firstTryCorrectCount: number;
  scorePercentage: number;
  totalAttempts: number;
  logs: QuestionAttemptLog[];
}

export interface StudentPortfolio {
  studentName: string;
  period: string;
  portfolioId: string;
  updatedAt: string;
  totalScenariosCompleted: number;
  overallScorePercentage: number;
  overallFirstTryCount: number;
  overallTotalQuestions: number;
  overallTotalAttempts: number;
  overallTimeSpentSeconds: number;
  scenarios: CompletedScenarioRecord[];
  verificationHash: string;
}

export interface StudentSession {
  studentName: string;
  period: string;
  sessionId: string;
  completedAt: string;
  trackId: TrackType;
  trackTitle: string;
  scenarioId: string;
  scenarioTitle: string;
  totalQuestions: number;
  firstTryCorrectCount: number;
  scorePercentage: number;
  totalAttempts: number;
  timeSpentSeconds: number;
  logs: QuestionAttemptLog[];
  verificationHash: string;
}

export interface DecodedSubmissionResult {
  valid: boolean;
  data?: StudentPortfolio;
  error?: string;
  isLegacySingleSession?: boolean;
}
