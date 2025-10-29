import type { StoryEvaluation } from '../types';

export interface StoryAnalysis {
  wordCount: number;
  hasDialogue: boolean;
  wordBankUsed: string[];
  estimatedStructureScore: number;
}

export function analyzeStory(
  text: string,
  title: string,
  wordBank: string[]
): StoryAnalysis {
  // Word count
  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;

  // Detect dialogue (look for — or " patterns)
  const hasDialogue = /—|"|«|»|"/.test(text);

  // Count word bank usage (case insensitive)
  const textLower = text.toLowerCase();
  const titleLower = title.toLowerCase();
  const combinedText = textLower + ' ' + titleLower;

  const wordBankUsed = wordBank.filter(word =>
    combinedText.includes(word.toLowerCase())
  );

  // Estimate structure (simple heuristic)
  // Check if story has multiple paragraphs, good length
  const paragraphs = text.split('\n').filter(p => p.trim().length > 20);
  const hasGoodLength = wordCount >= 120 && wordCount <= 180;
  const estimatedStructureScore =
    paragraphs.length >= 3 && hasGoodLength ? 25 :
    paragraphs.length >= 2 && wordCount >= 100 ? 20 : 15;

  return {
    wordCount,
    hasDialogue,
    wordBankUsed,
    estimatedStructureScore
  };
}

export function evaluateStory(analysis: StoryAnalysis): StoryEvaluation {
  // Structure: 25, 20, or 15 stars
  const structure = analysis.estimatedStructureScore;

  // Creativity: Fixed at 20 stars (can't auto-evaluate creativity perfectly)
  const creativity = 20;

  // Vocabulary: Based on word bank usage
  const vocabulary =
    analysis.wordBankUsed.length >= 4 ? 25 :
    analysis.wordBankUsed.length >= 3 ? 20 : 15;

  // Dialogues: Based on detection
  const dialogues = analysis.hasDialogue ? 25 : 15;

  const total = structure + creativity + vocabulary + dialogues;

  return { structure, creativity, vocabulary, dialogues, total };
}
