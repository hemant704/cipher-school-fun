/**
 * Utility functions for Caesar cipher operations
 */

/**
 * Encodes a string using Caesar cipher with the specified shift
 */
export const encodeText = (text: string, shift: number): string => {
  // Normalize shift to be within 0-25
  const normalizedShift = ((shift % 26) + 26) % 26;
  
  return text
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);
      
      // Handle uppercase letters (ASCII 65-90)
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + normalizedShift) % 26) + 65);
      }
      
      // Handle lowercase letters (ASCII 97-122)
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + normalizedShift) % 26) + 97);
      }
      
      // Return non-alphabetic characters unchanged
      return char;
    })
    .join('');
};

/**
 * Decodes a Caesar cipher encoded string with the specified shift
 */
export const decodeText = (text: string, shift: number): string => {
  // Decoding is just encoding with a negative shift
  return encodeText(text, -shift);
};

/**
 * Checks if the decoded text matches the expected solution
 */
export const checkSolution = (decoded: string, solution: string): boolean => {
  return decoded.toLowerCase().trim() === solution.toLowerCase().trim();
};

/**
 * Generates a hint by revealing one more character of the solution
 */
export const generateHint = (encoded: string, solution: string, hintLevel: number): string => {
  const hintLength = Math.min(hintLevel, solution.length);
  return solution.substring(0, hintLength) + '...';
};

/**
 * Predefined challenges for the game
 */
export const challenges = [
  {
    id: 1,
    encoded: "DWWDFN DW GDZQ",
    solution: "ATTACK AT DAWN",
    shift: 3,
    difficulty: "Easy",
    hint: "Military command"
  },
  {
    id: 2,
    encoded: "IUZM UE OWFZS FA FTQ BMDFK",
    solution: "LISA IS GOING TO THE PARTY",
    shift: 12,
    difficulty: "Medium",
    hint: "Social event"
  },
  {
    id: 3,
    encoded: "VKXLTMX BL MAX DXR MH LNVVXLL",
    solution: "PRACTICE IS THE KEY TO SUCCESS",
    shift: 19,
    difficulty: "Hard",
    hint: "Motivational phrase"
  },
  {
    id: 4,
    encoded: "HFTYJWX PJJUNSL XJHWJYX",
    solution: "CODERS KEEPING SECRETS",
    shift: 5,
    difficulty: "Medium",
    hint: "About cryptography"
  },
  {
    id: 5,
    encoded: "NVCTFDCTKVE KU HWP",
    solution: "CRYPTOGRAPHY IS FUN",
    shift: 8,
    difficulty: "Easy",
    hint: "About this game"
  }
];
