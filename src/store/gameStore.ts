import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, ScreenType, Answer, PlayerStory, MagicWord, GuardianLevel } from '../types';
import { GAME_CONFIG, GUARDIAN_LEVELS } from '../data/gameData';

interface GameStore extends GameState {
  // Actions
  setPlayerName: (name: string) => void;
  setCurrentScreen: (screen: ScreenType) => void;
  setCurrentLevel: (level: number) => void;
  addStars: (level: number, stars: number) => void;
  unlockMagicWord: (word: MagicWord) => void;
  submitAnswer: (level: number, answer: Answer) => void;
  submitStory: (story: PlayerStory) => void;
  resetGame: () => void;
  nextQuestion: () => void;

  // Computed
  canAdvanceLevel: (level: number) => boolean;
  getGuardianLevel: () => GuardianLevel;
}

const initialState: GameState = {
  playerName: '',
  currentScreen: 'intro',
  currentLevel: 0,
  totalStars: 0,
  level1Stars: 0,
  level2Stars: 0,
  level3Stars: 0,
  unlockedWords: [],
  currentQuestionIndex: 0,
  level1Answers: [],
  level2Answers: [],
  level3Story: null,
  completedAt: null,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Actions
      setPlayerName: (name) => set({ playerName: name }),

      setCurrentScreen: (screen) => set({ currentScreen: screen }),

      setCurrentLevel: (level) => set({ currentLevel: level }),

      addStars: (level, stars) => set((state) => {
        const updates: Partial<GameState> = {
          totalStars: state.totalStars + stars
        };

        if (level === 1) updates.level1Stars = state.level1Stars + stars;
        if (level === 2) updates.level2Stars = state.level2Stars + stars;
        if (level === 3) updates.level3Stars = state.level3Stars + stars;

        return updates as Partial<GameStore>;
      }),

      unlockMagicWord: (word) => set((state) => ({
        unlockedWords: [...state.unlockedWords, { ...word, unlocked: true }]
      })),

      submitAnswer: (level, answer) => set((state) => {
        if (level === 1) {
          return { level1Answers: [...state.level1Answers, answer] };
        }
        if (level === 2) {
          return { level2Answers: [...state.level2Answers, answer] };
        }
        return state;
      }),

      submitStory: (story) => set({
        level3Story: story,
        completedAt: new Date().toISOString()
      }),

      nextQuestion: () => set((state) => ({
        currentQuestionIndex: state.currentQuestionIndex + 1
      })),

      resetGame: () => set({
        ...initialState,
        currentQuestionIndex: 0
      }),

      // Computed
      canAdvanceLevel: (level) => {
        const state = get();
        if (level === 1) return state.level1Stars >= GAME_CONFIG.minStarsLevel1;
        if (level === 2) return state.level2Stars >= GAME_CONFIG.minStarsLevel2;
        if (level === 3) return state.level3Stars >= GAME_CONFIG.minStarsLevel3;
        return false;
      },

      getGuardianLevel: () => {
        const totalStars = get().totalStars;
        const level = GUARDIAN_LEVELS.find(
          level => totalStars >= level.min && totalStars <= level.max
        );
        return level || GUARDIAN_LEVELS[0];
      }
    }),
    {
      name: 'game-storage',
    }
  )
);
