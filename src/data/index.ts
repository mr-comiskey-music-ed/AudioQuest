import { Scenario, TrackType } from '../types/game';
import { mixingScenarios } from './mixingScenarios';
import { recordingScenarios } from './recordingScenarios';

export const allScenarios: Scenario[] = [...mixingScenarios, ...recordingScenarios];

export function getScenariosByTrack(track: TrackType): Scenario[] {
  return allScenarios.filter((s) => s.track === track);
}

export function getScenarioById(id: string): Scenario | undefined {
  return allScenarios.find((s) => s.id === id);
}

export { mixingScenarios, recordingScenarios };
