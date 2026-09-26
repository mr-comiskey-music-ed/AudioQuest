import { CompletedScenarioRecord, StudentPortfolio } from '../types/game';
import { computePortfolioHash } from './codec';

const STORAGE_KEY = 'aq_student_portfolio_data';

export function getStoredPortfolio(): StudentPortfolio | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StudentPortfolio;
    if (parsed && Array.isArray(parsed.scenarios)) {
      return parsed;
    }
  } catch (e) {
    console.error('Failed to read student portfolio from localStorage', e);
  }
  return null;
}

export function saveCompletedScenario(
  record: CompletedScenarioRecord,
  studentName: string,
  period: string
): StudentPortfolio {
  const existing = getStoredPortfolio();
  const scenarios: CompletedScenarioRecord[] = existing ? [...existing.scenarios] : [];

  // Check if this scenario was previously completed
  const existingIndex = scenarios.findIndex((s) => s.scenarioId === record.scenarioId);
  if (existingIndex >= 0) {
    // Replace with latest attempt
    scenarios[existingIndex] = record;
  } else {
    scenarios.push(record);
  }

  // Recalculate portfolio aggregations
  const totalScenariosCompleted = scenarios.length;
  const overallFirstTryCount = scenarios.reduce((acc, s) => acc + s.firstTryCorrectCount, 0);
  const overallTotalQuestions = scenarios.reduce((acc, s) => acc + s.totalQuestions, 0);
  const overallTotalAttempts = scenarios.reduce((acc, s) => acc + s.totalAttempts, 0);
  const overallTimeSpentSeconds = scenarios.reduce((acc, s) => acc + s.timeSpentSeconds, 0);
  const overallScorePercentage =
    overallTotalQuestions > 0 ? Math.round((overallFirstTryCount / overallTotalQuestions) * 100) : 0;

  const basePortfolio: Omit<StudentPortfolio, 'verificationHash'> = {
    studentName: studentName.trim() || existing?.studentName || 'Anonymous Student',
    period: period || existing?.period || 'Period 1',
    portfolioId: existing?.portfolioId || `AQ-PORT-${Date.now()}`,
    updatedAt: new Date().toISOString(),
    totalScenariosCompleted,
    overallScorePercentage,
    overallFirstTryCount,
    overallTotalQuestions,
    overallTotalAttempts,
    overallTimeSpentSeconds,
    scenarios,
  };

  const hash = computePortfolioHash(basePortfolio);
  const fullPortfolio: StudentPortfolio = {
    ...basePortfolio,
    verificationHash: hash,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fullPortfolio));
  } catch (e) {
    console.error('Failed to save student portfolio to localStorage', e);
  }

  return fullPortfolio;
}

export function updateStudentProfileInPortfolio(
  studentName: string,
  period: string
): StudentPortfolio | null {
  const existing = getStoredPortfolio();
  if (!existing) return null;

  const basePortfolio: Omit<StudentPortfolio, 'verificationHash'> = {
    ...existing,
    studentName: studentName.trim() || 'Anonymous Student',
    period: period || 'Period 1',
    updatedAt: new Date().toISOString(),
  };

  const hash = computePortfolioHash(basePortfolio);
  const fullPortfolio: StudentPortfolio = {
    ...basePortfolio,
    verificationHash: hash,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fullPortfolio));
  } catch (e) {
    console.error('Failed to update student profile in localStorage', e);
  }

  return fullPortfolio;
}

export function clearStudentPortfolio(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear student portfolio', e);
  }
}
