
import React from 'react';
import { cn } from '@/lib/utils';

interface GameHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "learn", label: "Learn", emoji: "📚" },
    { id: "encode", label: "Encode/Decode", emoji: "🔄" },
    { id: "challenge", label: "Challenges", emoji: "🎮" },
  ];

  return (
    <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-4 md:p-6 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-4 text-3xl">🔐</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Caesar Cipher Game</h1>
              <p className="text-purple-200 text-sm md:text-base">
                Learn and practice ancient cryptography
              </p>
            </div>
          </div>
          
          <nav className="space-x-1 md:space-x-2 flex flex-wrap">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "px-3 py-2 md:px-5 md:py-2 rounded-md transition-colors text-sm md:text-base",
                  activeTab === item.id
                    ? "bg-white text-purple-800"
                    : "text-white hover:bg-purple-600"
                )}
              >
                <span className="mr-2">{item.emoji}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
