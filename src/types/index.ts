// ============================================
// GAME STATE
// ============================================

export interface GameState {
  playerName: string;
  currentScreen: ScreenType;
  currentLevel: number;
  totalStars: number;
  level1Stars: number;
  level2Stars: number;
  level3Stars: number;
  unlockedWords: MagicWord[];
  currentQuestionIndex: number;
  level1Answers: Answer[];
  level2Answers: Answer[];
  level3Story: PlayerStory | null;
  completedAt: string | null;
}

export type ScreenType =
  | 'intro'
  | 'level1'
  | 'level2'
  | 'level3'
  | 'final';

export interface Answer {
  questionId: number;
  selectedOption: string;
  isCorrect: boolean;
  starsEarned: number;
  attempts: number;
}

export interface PlayerStory {
  title: string;
  text: string;
  wordCount: number;
  selectedImage: number;
  evaluationScore: StoryEvaluation;
  submittedAt: string;
}

export interface StoryEvaluation {
  structure: number; // 15, 20, or 25 stars
  creativity: number;
  vocabulary: number;
  dialogues: number;
  total: number;
}

// ============================================
// GAME CONTENT
// ============================================

export interface GameConfig {
  minStarsLevel1: number;
  minStarsLevel2: number;
  minStarsLevel3: number;
  totalPossibleStars: number;
}

export interface MagicWord {
  id: number;
  word: string;
  level: number;
  unlocked: boolean;
}

export interface GuardianLevel {
  name: string;
  min: number;
  max: number;
  icon: string;
}

// ============================================
// LEVEL 1: READING COMPREHENSION
// ============================================

export interface Level1Data {
  id: number;
  name: string;
  magicWord: string;
  badge: string;
  duration: string;
  maxStars: number;
  minStars: number;
  intro: string;
  story: Story;
  questions: Question[];
}

export interface Story {
  title: string;
  text: string;
}

export interface Question {
  id: number;
  type: 'literal' | 'inferencial' | 'critica';
  stars: number;
  question: string;
  options: QuestionOption[];
  feedback: Feedback;
}

export interface QuestionOption {
  id: string; // 'a', 'b', 'c', 'd'
  text: string;
  correct: boolean;
}

export interface Feedback {
  correct: string;
  incorrect: string;
}

// ============================================
// LEVEL 2: RIDDLES & VOCABULARY
// ============================================

export interface Level2Data {
  id: number;
  name: string;
  magicWord: string;
  badge: string;
  duration: string;
  maxStars: number;
  minStars: number;
  intro: string;
  challenges: Challenge[];
}

export interface Challenge {
  id: number;
  type: 'acertijo' | 'vocabulario' | 'emociones';
  stars: number;
  question: string;
  options: QuestionOption[];
  feedback: Feedback;
}

// ============================================
// LEVEL 3: CREATIVE WRITING
// ============================================

export interface Level3Data {
  id: number;
  name: string;
  magicWord: string;
  badge: string;
  duration: string;
  maxStars: number;
  minStars: number;
  intro: string;
  inspirationImages: InspirationImage[];
  wordBank: string[];
  requirements: WritingRequirements;
  checklist: string[];
  rubric: RubricCriterion[];
}

export interface InspirationImage {
  id: number;
  url: string;
  alt: string;
}

export interface WritingRequirements {
  minWords: number;
  maxWords: number;
  minDialogues: number;
  minWordBankUsage: number;
}

export interface RubricCriterion {
  criterion: string;
  excellent: { stars: number; description: string };
  good: { stars: number; description: string };
  basic: { stars: number; description: string };
}
