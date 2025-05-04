
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const LearningSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "Introduction", icon: "📚" },
    { title: "How It Works", icon: "⚙️" },
    { title: "History", icon: "🏛️" },
    { title: "Modern Usage", icon: "💻" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div>
            <h3 className="text-xl font-bold mb-3">What is a Caesar Cipher?</h3>
            <p className="mb-4">
              The Caesar cipher is one of the simplest and most widely known encryption techniques. 
              It is a type of substitution cipher where each letter in the plaintext is 'shifted' 
              a certain number of places down the alphabet.
            </p>
            <p className="mb-4">
              For example, with a shift of 1, A would be replaced by B, B would become C, and so on.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="font-medium">Example:</p>
              <p className="mb-1">Plaintext: <span className="font-mono">HELLO</span></p>
              <p>Encrypted (shift 3): <span className="font-mono">KHOOR</span></p>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h3 className="text-xl font-bold mb-3">How the Caesar Cipher Works</h3>
            <p className="mb-4">
              The transformation can be represented by aligning two alphabets; the cipher alphabet
              is the plain alphabet rotated left or right by some number of positions.
            </p>
            <h4 className="text-lg font-semibold mb-2">The Encryption Process:</h4>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>Choose a shift value (traditionally, Caesar used a shift of 3).</li>
              <li>For each letter in your message, find it in the alphabet.</li>
              <li>Replace it with the letter that is the chosen number of positions later in the alphabet.</li>
              <li>If you reach the end of the alphabet, wrap around to the beginning.</li>
            </ol>
            <p className="mb-4">
              To decrypt, simply shift in the opposite direction by the same amount.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="font-medium">Mathematical Formula:</p>
              <p className="font-mono">
                E(x) = (x + n) % 26<br/>
                D(x) = (x - n + 26) % 26
              </p>
              <p className="text-sm mt-2">
                Where x is the position of the character in the alphabet (0-25),<br/>
                n is the shift value, and % is the modulo operation
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-bold mb-3">History of the Caesar Cipher</h3>
            <p className="mb-4">
              The Caesar cipher is named after Julius Caesar, who used it to protect messages 
              of military significance. According to historical records, Caesar used a shift of 
              three for his communications.
            </p>
            <p className="mb-4">
              The Roman historian Suetonius mentions this encryption method in his work 
              "The Lives of the Caesars" (121 CE), where he states that Caesar "wrote in cipher, 
              that is, by so changing the order of the letters that not a word could be made out."
            </p>
            <p className="mb-4">
              Although simple by today's standards, the Caesar cipher was reasonably secure 
              in its time. Most of Caesar's enemies were illiterate and those who could read didn't 
              know about frequency analysis, which would easily break this cipher.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="font-medium">Historical Timeline:</p>
              <ul className="space-y-1">
                <li>~100 BCE: Used by Julius Caesar</li>
                <li>9th century: Arab mathematician Al-Kindi developed frequency analysis to break it</li>
                <li>15th century: Leon Battista Alberti created the polyalphabetic cipher as an improvement</li>
                <li>Modern day: Used for education and as a basic introduction to cryptography</li>
              </ul>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-xl font-bold mb-3">Modern Usage of Substitution Ciphers</h3>
            <p className="mb-4">
              While the Caesar cipher is far too weak for modern security applications, the principles 
              behind it have formed the foundation for more complex encryption systems.
            </p>
            <p className="mb-4">
              Today, the Caesar cipher is primarily used for:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Educational purposes - teaching basic concepts of cryptography</li>
              <li>Puzzles and games</li>
              <li>Very basic, non-sensitive information hiding</li>
              <li>As a component in more complex encryption schemes</li>
            </ul>
            <p className="mb-4">
              Modern encryption algorithms like AES, RSA, and others use mathematical principles that are
              much more sophisticated, but the fundamental concept of substituting one value for another still applies.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="font-medium mb-2">Did You Know?</p>
              <p>
                ROT13 is a special case of the Caesar cipher, using a shift of 13. Since the English alphabet has 26 letters,
                ROT13 is its own inverse - applying it twice returns the original text. It's sometimes used in online forums to
                hide spoilers or punchlines.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-purple-800 text-center">
        Learn About Caesar Cipher
      </h2>
      
      <div className="mb-6">
        <div className="flex border-b">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={cn(
                "px-4 py-3 transition-colors text-sm md:text-base flex items-center gap-2",
                activeTab === index
                  ? "border-b-2 border-purple-600 text-purple-800 font-medium"
                  : "text-gray-600 hover:text-purple-800"
              )}
            >
              <span>{tab.icon}</span>
              {tab.title}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default LearningSection;
