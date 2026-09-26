/**
 * Codec for encoding student work across all scenarios/instruments into portable Base64 submission codes
 * and verifying/decoding them in the Teacher Code Checker.
 */

import { StudentSession, StudentPortfolio, DecodedSubmissionResult } from '../types/game';

const PREFIX = 'AUDIOQUEST-';

// Checksum for single session (legacy & single-module exports)
export function computeVerificationHash(data: Omit<StudentSession, 'verificationHash'>): string {
  const str = `${data.studentName}|${data.period}|${data.scenarioId}|${data.scorePercentage}|${data.firstTryCorrectCount}/${data.totalQuestions}|${data.completedAt}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36).toUpperCase().padStart(6, '0');
}

// Checksum for student comprehensive portfolio (capturing all scenarios/instruments)
export function computePortfolioHash(data: Omit<StudentPortfolio, 'verificationHash'>): string {
  const scenarioTokens = data.scenarios
    .map(
      (s) => `${s.scenarioId}:${s.scorePercentage}:${s.firstTryCorrectCount}/${s.totalQuestions}`
    )
    .sort()
    .join(';');
  const str = `${data.studentName}|${data.period}|${data.overallScorePercentage}|${data.overallFirstTryCount}/${data.overallTotalQuestions}|${data.totalScenariosCompleted}|${scenarioTokens}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36).toUpperCase().padStart(8, '0');
}

/**
 * Encodes a comprehensive student portfolio covering all scenarios/instruments.
 */
export function encodeStudentPortfolio(portfolio: Omit<StudentPortfolio, 'verificationHash'>): string {
  const hash = computePortfolioHash(portfolio);
  const fullPortfolio: StudentPortfolio = {
    ...portfolio,
    verificationHash: hash,
  };

  const payload = {
    _type: 'audioquest-portfolio',
    version: 2,
    data: fullPortfolio,
  };

  const jsonStr = JSON.stringify(payload);
  const utf8Bytes = new TextEncoder().encode(jsonStr);
  let binaryStr = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    binaryStr += String.fromCharCode(utf8Bytes[i]);
  }
  const base64 = btoa(binaryStr);
  return `${PREFIX}${base64}`;
}

/**
 * Encodes a single student session (legacy fallback).
 */
export function encodeStudentSession(session: Omit<StudentSession, 'verificationHash'>): string {
  const hash = computeVerificationHash(session);
  const fullSession: StudentSession = {
    ...session,
    verificationHash: hash,
  };

  const jsonStr = JSON.stringify(fullSession);
  const utf8Bytes = new TextEncoder().encode(jsonStr);
  let binaryStr = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    binaryStr += String.fromCharCode(utf8Bytes[i]);
  }
  const base64 = btoa(binaryStr);
  return `${PREFIX}${base64}`;
}

/**
 * Decodes any submission code (full portfolio or single scenario) back into structured StudentPortfolio data.
 */
export function decodeSubmissionCode(rawCode: string): DecodedSubmissionResult {
  const trimmed = rawCode.trim();
  if (!trimmed) {
    return { valid: false, error: 'Empty code provided.' };
  }

  const base64Part = trimmed.startsWith(PREFIX) ? trimmed.slice(PREFIX.length) : trimmed;

  try {
    const binaryStr = atob(base64Part);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }
    const decodedJson = new TextDecoder().decode(bytes);
    const rawParsed = JSON.parse(decodedJson);

    // Case 1: Version 2 Portfolio wrapper format
    if (rawParsed && rawParsed._type === 'audioquest-portfolio' && rawParsed.data) {
      const portfolio = rawParsed.data as StudentPortfolio;
      if (!portfolio.studentName || !Array.isArray(portfolio.scenarios)) {
        return { valid: false, error: 'Malformed portfolio code: missing student or scenario data.' };
      }

      const expectedHash = computePortfolioHash(portfolio);
      const isVerified = portfolio.verificationHash === expectedHash;
      if (!isVerified) {
        return {
          valid: true,
          data: portfolio,
          error: 'Integrity Warning: Portfolio hash mismatch (data may have been altered).',
        };
      }
      return { valid: true, data: portfolio };
    }

    // Case 2: Direct StudentPortfolio object
    if (rawParsed && Array.isArray(rawParsed.scenarios) && rawParsed.studentName) {
      const portfolio = rawParsed as StudentPortfolio;
      const expectedHash = computePortfolioHash(portfolio);
      const isVerified = portfolio.verificationHash === expectedHash;
      if (!isVerified) {
        return {
          valid: true,
          data: portfolio,
          error: 'Integrity Warning: Portfolio hash mismatch.',
        };
      }
      return { valid: true, data: portfolio };
    }

    // Case 3: Legacy Single-Scenario StudentSession object (normalize to StudentPortfolio)
    if (rawParsed && rawParsed.studentName && rawParsed.scenarioId && Array.isArray(rawParsed.logs)) {
      const single = rawParsed as StudentSession;
      const expectedHash = computeVerificationHash(single);
      const isVerified = single.verificationHash === expectedHash;

      const normalizedPortfolio: StudentPortfolio = {
        studentName: single.studentName,
        period: single.period || 'Period 1',
        portfolioId: single.sessionId || `AQ-LEGACY-${Date.now()}`,
        updatedAt: single.completedAt || new Date().toISOString(),
        totalScenariosCompleted: 1,
        overallScorePercentage: single.scorePercentage,
        overallFirstTryCount: single.firstTryCorrectCount,
        overallTotalQuestions: single.totalQuestions,
        overallTotalAttempts: single.totalAttempts,
        overallTimeSpentSeconds: single.timeSpentSeconds,
        scenarios: [
          {
            scenarioId: single.scenarioId,
            scenarioTitle: single.scenarioTitle,
            trackId: single.trackId,
            trackTitle: single.trackTitle,
            category: 'instrument',
            completedAt: single.completedAt,
            timeSpentSeconds: single.timeSpentSeconds,
            totalQuestions: single.totalQuestions,
            firstTryCorrectCount: single.firstTryCorrectCount,
            scorePercentage: single.scorePercentage,
            totalAttempts: single.totalAttempts,
            logs: single.logs,
          },
        ],
        verificationHash: single.verificationHash,
      };

      if (!isVerified) {
        return {
          valid: true,
          data: normalizedPortfolio,
          error: 'Integrity Warning: Code hash mismatch.',
          isLegacySingleSession: true,
        };
      }

      return {
        valid: true,
        data: normalizedPortfolio,
        isLegacySingleSession: true,
      };
    }

    return { valid: false, error: 'Unrecognized submission code format.' };
  } catch (err) {
    return {
      valid: false,
      error: 'Invalid Base64 string format. Please verify the copied code.',
    };
  }
}

/**
 * Parses multiple student codes at once (batch mode).
 */
export function parseBatchCodes(text: string): {
  validPortfolios: StudentPortfolio[];
  invalidLines: { line: number; raw: string; error: string }[];
} {
  const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
  const validPortfolios: StudentPortfolio[] = [];
  const invalidLines: { line: number; raw: string; error: string }[] = [];

  lines.forEach((line, index) => {
    let token = line;
    if (line.includes(PREFIX)) {
      const match = line.match(new RegExp(`${PREFIX}[A-Za-z0-9+/=]+`));
      if (match) token = match[0];
    }

    const res = decodeSubmissionCode(token);
    if (res.valid && res.data) {
      validPortfolios.push(res.data);
    } else {
      invalidLines.push({
        line: index + 1,
        raw: line.length > 60 ? line.slice(0, 57) + '...' : line,
        error: res.error || 'Failed to decode',
      });
    }
  });

  return { validPortfolios, invalidLines };
}
