
import React, { useState, useEffect } from 'react';
import { encodeText, decodeText } from '@/utils/caesarCipher';
import CipherWheel from './CipherWheel';

const EncodeDecodeSection: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [shift, setShift] = useState(3); // Default shift value of 3 (traditional Caesar)
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Process text when any dependencies change
    processText();
  }, [inputText, shift, mode]);

  const processText = () => {
    if (inputText.trim() === '') {
      setOutputText('');
      return;
    }

    if (mode === 'encode') {
      setOutputText(encodeText(inputText, shift));
    } else {
      setOutputText(decodeText(inputText, shift));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShiftChange = (newShift: number) => {
    setShift(newShift);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold mb-4 text-purple-800 text-center">
        Caesar Cipher Encoder/Decoder
      </h2>
      
      {/* Mode toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-purple-100 p-1 rounded-lg flex">
          <button
            className={`px-6 py-2 rounded-md transition-colors ${
              mode === 'encode'
                ? 'bg-purple-600 text-white'
                : 'text-purple-800 hover:bg-purple-200'
            }`}
            onClick={() => setMode('encode')}
          >
            Encode
          </button>
          <button
            className={`px-6 py-2 rounded-md transition-colors ${
              mode === 'decode'
                ? 'bg-purple-600 text-white'
                : 'text-purple-800 hover:bg-purple-200'
            }`}
            onClick={() => setMode('decode')}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left side: Text input and output */}
        <div>
          <div className="mb-4">
            <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-1">
              {mode === 'encode' ? 'Text to Encode' : 'Text to Decode'}
            </label>
            <textarea
              id="inputText"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[150px]"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter text to decode...'}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="outputText" className="block text-sm font-medium text-gray-700 mb-1">
              {mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}
            </label>
            <div className="relative">
              <textarea
                id="outputText"
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 min-h-[150px]"
                value={outputText}
                readOnly
              />
              {outputText && (
                <button
                  onClick={handleCopy}
                  className="absolute bottom-3 right-3 bg-purple-600 text-white px-2 py-1 rounded text-sm hover:bg-purple-700"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right side: Cipher wheel */}
        <div className="flex justify-center">
          <CipherWheel shift={shift} onShiftChange={handleShiftChange} />
        </div>
      </div>
    </div>
  );
};

export default EncodeDecodeSection;
