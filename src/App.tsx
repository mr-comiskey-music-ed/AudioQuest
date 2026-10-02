/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { StudentAdventure } from './components/StudentAdventure';
import { GradeReport } from './components/GradeReport';
import { AudioEffectsModal } from './components/AudioEffectsModal';
import { AudioEffectType } from './components/AudioEngineeringIcons';
import { StudentSession, StudentPortfolio } from './types/game';
import { getStoredPortfolio } from './utils/portfolioStorage';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('adventure');
  const [isMuted, setIsMuted] = useState(false);
  const [currentInspectorCode, setCurrentInspectorCode] = useState('');
  const [latestSession, setLatestSession] = useState<StudentSession | null>(null);
  const [studentPortfolio, setStudentPortfolio] = useState<StudentPortfolio | null>(() =>
    getStoredPortfolio()
  );
  const [isSchematicsModalOpen, setIsSchematicsModalOpen] = useState(false);
  const [inspectedEffect, setInspectedEffect] = useState<AudioEffectType | null>(null);
  const [adventureResetKey, setAdventureResetKey] = useState(0);

  const handleOpenSchematics = (effect?: AudioEffectType) => {
    setInspectedEffect(effect || null);
    setIsSchematicsModalOpen(true);
  };

  const handleCloseSchematics = () => {
    setIsSchematicsModalOpen(false);
  };

  const handleReturnToChallengeMenu = () => {
    localStorage.removeItem('aq_active_adventure');
    setIsSchematicsModalOpen(false);
    setActiveTab('adventure');
    setAdventureResetKey((prev) => prev + 1);
  };

  const handleSessionCompleted = (session: StudentSession) => {
    setLatestSession(session);
  };

  const handlePortfolioUpdated = (portfolio: StudentPortfolio) => {
    setStudentPortfolio(portfolio);
  };

  const handleViewGradeReport = () => {
    setActiveTab('grade-report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-200">
      {/* 3-Zone Top Navigation Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setIsSchematicsModalOpen(false);
          setActiveTab(tab);
        }}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onOpenSchematics={() => handleOpenSchematics()}
        isSchematicsOpen={isSchematicsModalOpen}
        onReturnToChallengeMenu={handleReturnToChallengeMenu}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'adventure' && (
          <StudentAdventure
            key={adventureResetKey}
            resetTrigger={adventureResetKey}
            onSessionCompleted={handleSessionCompleted}
            onPortfolioUpdated={handlePortfolioUpdated}
            onViewGradeReport={handleViewGradeReport}
            onOpenSchematics={handleOpenSchematics}
          />
        )}

        {activeTab === 'grade-report' && (
          <GradeReport
            portfolio={studentPortfolio}
            latestSession={latestSession}
            initialCode={currentInspectorCode}
            onNavigateToAdventure={() => setActiveTab('adventure')}
            onPortfolioChange={setStudentPortfolio}
            onOpenSchematics={handleOpenSchematics}
          />
        )}
      </main>

      {/* Audio Effects & Studio Gear Library Modal */}
      <AudioEffectsModal
        isOpen={isSchematicsModalOpen}
        onClose={handleCloseSchematics}
        selectedEffectInitial={inspectedEffect}
      />
    </div>
  );
}
