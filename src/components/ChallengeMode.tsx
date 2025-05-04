
import React, { useState, useEffect } from 'react';
import { challenges, checkSolution, generateHint } from '@/utils/caesarCipher';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const ChallengeMode: React.FC = () => {
  const [currentChallenge, setCurrentChallenge] = useState(challenges[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [hintLevel, setHintLevel] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const { toast } = useToast();

  // Filter challenges by difficulty
  const filteredChallenges = challenges.filter(c => c.difficulty === difficulty);

  useEffect(() => {
    if (gameActive) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameActive]);

  const startChallenge = () => {
    // Select random challenge from filtered list
    const randomIndex = Math.floor(Math.random() * filteredChallenges.length);
    const challenge = filteredChallenges[randomIndex] || challenges[0];
    
    setCurrentChallenge(challenge);
    setUserAnswer('');
    setHintLevel(0);
    setTimeLeft(difficulty === 'Easy' ? 90 : difficulty === 'Medium' ? 60 : 45);
    setGameActive(true);
  };

  const handleTimeout = () => {
    setGameActive(false);
    toast({
      title: "Time's up!",
      description: `The solution was: ${currentChallenge.solution}`,
      variant: "destructive"
    });
  };

  const checkAnswer = () => {
    if (checkSolution(userAnswer, currentChallenge.solution)) {
      const timeBonus = Math.floor(timeLeft / 5);
      const difficultyMultiplier = 
        difficulty === 'Easy' ? 1 : 
        difficulty === 'Medium' ? 2 : 3;
      const hintPenalty = hintLevel * 5;
      const points = (10 * difficultyMultiplier) + timeBonus - hintPenalty;
      
      setScore(prev => prev + points);
      setGameActive(false);
      
      toast({
        title: "Correct!",
        description: `You earned ${points} points!`,
        variant: "default",
        className: "bg-green-500 text-white"
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Try again or use a hint!",
        variant: "destructive"
      });
    }
  };

  const useHint = () => {
    if (hintLevel < currentChallenge.solution.length / 2) {
      setHintLevel(prev => prev + 1);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-purple-800 text-center">
        Cipher Challenge Mode
      </h2>
      
      {/* Game stats */}
      <div className="flex justify-between mb-6">
        <div className="text-lg">
          Score: <span className="font-bold">{score}</span>
        </div>
        {gameActive && (
          <div className="text-lg">
            Time left: <span className={cn(
              "font-bold",
              timeLeft < 10 ? "text-red-600" : "text-green-600"
            )}>
              {timeLeft}s
            </span>
          </div>
        )}
      </div>

      {/* Difficulty selector */}
      {!gameActive && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Select Difficulty:</h3>
          <div className="flex gap-3">
            {(['Easy', 'Medium', 'Hard'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={cn(
                  "px-4 py-2 rounded-md transition-colors",
                  difficulty === level
                    ? "bg-purple-600 text-white"
                    : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Challenge display */}
      {gameActive ? (
        <div className="bg-purple-50 p-6 rounded-lg mb-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Decode this message:</h3>
            <div className="bg-white p-4 border border-purple-300 rounded-md text-lg font-mono">
              {currentChallenge.encoded}
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 italic mb-2">
              The text was encrypted with a Caesar cipher (shift: ?).
              <br/>
              Topic hint: {currentChallenge.hint}
            </p>
            {hintLevel > 0 && (
              <div className="bg-yellow-50 p-3 rounded-md border border-yellow-300">
                <p className="font-medium">Hint: {generateHint(currentChallenge.encoded, currentChallenge.solution, hintLevel)}</p>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="userAnswer" className="block text-sm font-medium text-gray-700 mb-1">
              Your solution:
            </label>
            <input
              type="text"
              id="userAnswer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Type the decoded message here..."
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={checkAnswer}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Submit Answer
            </button>
            <button
              onClick={useHint}
              className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              disabled={hintLevel >= currentChallenge.solution.length / 2}
            >
              Use Hint
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg mb-4">
            Ready to test your cipher-breaking skills?
          </p>
          <button
            onClick={startChallenge}
            className="px-8 py-3 bg-purple-600 text-white rounded-md text-lg hover:bg-purple-700"
          >
            Start Challenge
          </button>
        </div>
      )}
    </div>
  );
};

export default ChallengeMode;
