
import React, { useState } from 'react';
import GameHeader from '@/components/GameHeader';
import LearningSection from '@/components/LearningSection';
import EncodeDecodeSection from '@/components/EncodeDecodeSection';
import ChallengeMode from '@/components/ChallengeMode';

const Index = () => {
  const [activeTab, setActiveTab] = useState('learn');

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'learn':
        return <LearningSection />;
      case 'encode':
        return <EncodeDecodeSection />;
      case 'challenge':
        return <ChallengeMode />;
      default:
        return <LearningSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-4 md:p-6 max-w-6xl mx-auto w-full">
        <div className="mb-8">
          {renderActiveSection()}
        </div>
        
        <footer className="text-center text-sm text-gray-500 mt-12 pb-4">
          <p>Caesar Cipher Educational Game - A fun way to learn cryptography</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
