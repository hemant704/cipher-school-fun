
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CipherWheelProps {
  shift: number;
  onShiftChange: (shift: number) => void;
  className?: string;
}

const CipherWheel: React.FC<CipherWheelProps> = ({ 
  shift, 
  onShiftChange,
  className 
}) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const shiftedAlphabet = [...alphabet.slice(shift), ...alphabet.slice(0, shift)];
  
  // Convert rotation degrees for animation
  const rotation = -shift * (360 / 26);

  const handleWheelClick = (index: number) => {
    const newShift = (index % 26);
    onShiftChange(newShift);
  };

  return (
    <div className={cn("flex flex-col items-center p-4", className)}>
      <div className="text-lg font-semibold mb-2">
        Caesar Cipher Wheel (Shift: {shift})
      </div>
      
      <div className="relative w-64 h-64 md:w-72 md:h-72">
        {/* Outer wheel (stationary) */}
        <div className="absolute inset-0 rounded-full border-4 border-purple-600 bg-slate-100">
          {alphabet.map((letter, index) => {
            const angle = index * (360 / 26);
            return (
              <div 
                key={`outer-${letter}`}
                className="absolute w-8 h-8 flex items-center justify-center font-bold text-purple-800"
                style={{
                  transform: `rotate(${angle}deg) translate(0, -120px) rotate(-${angle}deg)`,
                  left: 'calc(50% - 16px)',
                  top: 'calc(50% - 16px)',
                }}
              >
                {letter}
              </div>
            );
          })}
        </div>
        
        {/* Inner wheel (rotating) */}
        <div 
          className="absolute inset-0 rounded-full border-4 border-indigo-400 bg-indigo-100 transition-transform duration-500"
          style={{
            width: '78%',
            height: '78%',
            top: '11%',
            left: '11%',
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {alphabet.map((letter, index) => {
            const angle = index * (360 / 26);
            return (
              <div 
                key={`inner-${letter}`}
                className="absolute w-8 h-8 flex items-center justify-center font-bold text-indigo-700 cursor-pointer hover:text-indigo-900"
                style={{
                  transform: `rotate(${angle}deg) translate(0, -90px) rotate(-${angle}deg)`,
                  left: 'calc(50% - 16px)',
                  top: 'calc(50% - 16px)',
                }}
                onClick={() => handleWheelClick(index)}
              >
                {letter}
              </div>
            );
          })}
        </div>
        
        {/* Center point */}
        <div className="absolute w-8 h-8 bg-purple-700 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      {/* Shift controls */}
      <div className="flex items-center gap-4 mt-4">
        <button 
          onClick={() => onShiftChange((shift - 1 + 26) % 26)}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          ←
        </button>
        <input
          type="number"
          value={shift}
          onChange={(e) => {
            const newShift = ((parseInt(e.target.value) || 0) % 26 + 26) % 26;
            onShiftChange(newShift);
          }}
          className="w-16 text-center border border-gray-300 rounded py-2"
          min="0"
          max="25"
        />
        <button 
          onClick={() => onShiftChange((shift + 1) % 26)}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          →
        </button>
      </div>
      
      {/* Mapping display */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md w-full max-w-md">
        <div className="grid grid-cols-26 gap-0 text-center">
          {alphabet.map((letter, index) => (
            <div key={`mapping-${letter}`} className="text-xs md:text-sm">
              {letter}
            </div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-26 gap-0 text-center">
          {shiftedAlphabet.map((letter, index) => (
            <div key={`shifted-${letter}`} className="text-xs md:text-sm font-semibold text-purple-700">
              {letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CipherWheel;
