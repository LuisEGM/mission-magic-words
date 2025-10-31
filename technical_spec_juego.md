# Technical Specification: La Misión de las Palabras Mágicas

**Educational Gamification Experience - React Web App**

Version: 1.0  
Last Updated: 2025-10-29  
Target: Claude Code AI Development

---

## 📋 TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Data Models](#data-models)
5. [Component Specifications](#component-specifications)
6. [State Management](#state-management)
7. [User Flows](#user-flows)
8. [Detailed Features](#detailed-features)
9. [UI/UX Requirements](#uiux-requirements)
10. [Implementation Phases](#implementation-phases)
11. [Testing Criteria](#testing-criteria)

---

## 1. PROJECT OVERVIEW

### 1.1 Purpose

Build a single-page web application (SPA) that delivers a 30-40 minute gamified educational experience focused on reading comprehension and creative writing for 6th grade students in rural Colombia.

### 1.2 Core Concept

Students assume the role of "Guardian Apprentices" who must complete 3 progressive levels to recover 3 "Magic Words" stolen by the "Silence Thief", saving the world of stories.

### 1.3 Key Metrics

- **Duration**: 30-40 minutes total gameplay
- **Levels**: 3 progressive levels
- **Total possible score**: 300 points (100 per level)
- **Target users**: 12 students per session
- **Device support**: Desktop primary, mobile responsive

---

## 2. TECH STACK

### 2.1 Required Stack

```json
{
  "framework": "React 18+",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "state": "Zustand or React Context API",
  "routing": "React Router v6",
  "build": "Vite",
  "animations": "Framer Motion",
  "icons": "Lucide React",
  "deployment": "Netlify/Vercel (static export)"
}
```

### 2.2 No Backend Required

- All game data embedded in frontend
- State persisted in localStorage only
- No authentication needed
- Completely offline-capable after first load

### 2.3 Optional Libraries

```json
{
  "diploma-generation": "html2canvas + jsPDF",
  "sound": "Howler.js (optional)",
  "confetti": "canvas-confetti (for celebrations)"
}
```

---

## 3. PROJECT STRUCTURE

```
mision-palabras-magicas/
├── public/
│   ├── images/
│   │   ├── intro-bg.jpg
│   │   ├── level1-forest.jpg
│   │   ├── level2-bridge.jpg
│   │   ├── level3-castle.jpg
│   │   ├── inspiration-1.jpg
│   │   ├── inspiration-2.jpg
│   │   └── inspiration-3.jpg
│   └── sounds/ (optional)
│       ├── correct.mp3
│       ├── wrong.mp3
│       └── unlock.mp3
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── StarCounter.tsx
│   │   ├── layout/
│   │   │   ├── GameHeader.tsx
│   │   │   └── ScreenContainer.tsx
│   │   ├── level1/
│   │   │   ├── StoryDisplay.tsx
│   │   │   ├── Question.tsx
│   │   │   └── QuestionOption.tsx
│   │   ├── level2/
│   │   │   ├── ChallengeCard.tsx
│   │   │   └── BridgeProgress.tsx
│   │   ├── level3/
│   │   │   ├── InspirationSelector.tsx
│   │   │   ├── StoryEditor.tsx
│   │   │   ├── WordBank.tsx
│   │   │   └── SelfReviewChecklist.tsx
│   │   └── shared/
│   │       ├── UnlockAnimation.tsx
│   │       ├── Feedback.tsx
│   │       └── DiplomaGenerator.tsx
│   │
│   ├── data/
│   │   ├── gameData.ts        # Main game content
│   │   ├── level1Data.ts      # Level 1 specific
│   │   ├── level2Data.ts      # Level 2 specific
│   │   └── level3Data.ts      # Level 3 specific
│   │
│   ├── store/
│   │   └── gameStore.ts       # Zustand store
│   │
│   ├── hooks/
│   │   ├── useGameProgress.ts
│   │   ├── useLocalStorage.ts
│   │   └── useSound.ts
│   │
│   ├── screens/
│   │   ├── IntroScreen.tsx
│   │   ├── Level1Screen.tsx
│   │   ├── Level2Screen.tsx
│   │   ├── Level3Screen.tsx
│   │   └── FinalScreen.tsx
│   │
│   ├── utils/
│   │   ├── scoreCalculator.ts
│   │   ├── textAnalyzer.ts   # For Level 3 validation
│   │   └── diplomaGenerator.ts
│   │
│   ├── types/
│   │   └── index.ts           # All TypeScript types
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 4. DATA MODELS

### 4.1 TypeScript Types

```typescript
// types/index.ts

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

export type ScreenType = "intro" | "level1" | "level2" | "level3" | "final";

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
  type: "literal" | "inferencial" | "critica";
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
  type: "acertijo" | "vocabulario" | "emociones";
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
```

### 4.2 Game Data Structure

```typescript
// data/gameData.ts

export const GAME_CONFIG: GameConfig = {
  minStarsLevel1: 65, // 65% de 100 puntos
  minStarsLevel2: 70, // 70% de 100 puntos
  minStarsLevel3: 70, // 70% de 100 puntos
  totalPossibleStars: 300, // 100 puntos por nivel
};

export const MAGIC_WORDS: MagicWord[] = [
  { id: 1, word: "IMAGINACIÓN", level: 1, unlocked: false },
  { id: 2, word: "CREATIVIDAD", level: 2, unlocked: false },
  { id: 3, word: "VALENTÍA", level: 3, unlocked: false },
];

export const GUARDIAN_LEVELS: GuardianLevel[] = [
  { name: "Guardián Aprendiz", min: 150, max: 200, icon: "✨" }, // 50-67% del total
  { name: "Guardián Junior", min: 201, max: 250, icon: "⭐" }, // 67-83% del total
  { name: "Guardián Experto", min: 251, max: 300, icon: "🌟" }, // 83-100% del total
];

export const INTRO_TEXT = {
  title: "La Misión de las Palabras Mágicas",
  story: `En un mundo donde las historias mantienen viva la imaginación, existe el "Libro de los Cuentos Eternos", custodiado por el sabio Guardián de las Historias.

Pero algo terrible ha ocurrido: el malvado "Ladrón de Silencios" ha robado las tres Palabras Mágicas que dan poder al libro. Sin ellas, las historias se están borrando y el mundo se volverá gris y silencioso.

Tú eres un Aprendiz de Guardián. Tu misión es recuperar las tres Palabras Mágicas superando tres desafíos que pondrán a prueba tu comprensión, tu ingenio y tu creatividad.

¿Estás listo para salvar el mundo de las historias?`,
};
```

### 4.3 Level 1 Complete Data

```typescript
// data/level1Data.ts

export const LEVEL1_DATA: Level1Data = {
  id: 1,
  name: "El Bosque de las Letras Perdidas",
  magicWord: "IMAGINACIÓN",
  badge: "Descifrador de Historias",
  duration: "10-12 minutos",
  maxStars: 90,
  minStars: 60,
  intro:
    "Los Aprendices llegan al Bosque de las Letras Perdidas, un lugar místico donde las palabras flotan entre los árboles como hojas brillantes. Aquí se encuentra escondida la primera Palabra Mágica: IMAGINACIÓN. Para recuperarla, deben demostrar que pueden comprender completamente una historia antigua guardada en el bosque.",

  story: {
    title: "El árbol que contaba historias",
    text: `En lo más profundo del bosque de Esmeralda, donde los rayos del sol apenas logran tocar el suelo, vivía un árbol muy especial. No era el más alto ni el más frondoso, pero tenía un don extraordinario: podía recordar todas las historias que alguna vez se habían contado bajo su sombra.

Una tarde, una niña llamada Luna llegó al bosque buscando a su abuela, quien había desaparecido días atrás. Luna estaba asustada y cansada. Al ver el viejo árbol, decidió descansar apoyada en su tronco. En ese momento, escuchó una voz suave como el viento: "No llores, niña. Tu abuela me contó su historia antes de partir. Si quieres encontrarla, debes seguir el camino de las palabras."

Luna, sorprendida, preguntó: "¿Qué camino de las palabras?" El árbol respondió: "Tu abuela dejó pistas en forma de poemas tallados en tres árboles del bosque. Si los encuentras y comprendes su significado, sabrás dónde buscarla."

Durante tres días, Luna buscó los árboles con los poemas. El primero decía: "Donde el agua canta y las piedras danzan, busca la casa de quien te ama." Luna comprendió que debía ir al río. El segundo poema rezaba: "En el lugar donde nacen las flores que curan el alma, encontrarás las respuestas." Luna recordó que su abuela siempre hablaba del jardín medicinal en la colina. El tercer poema era más difícil: "Cuando el sol se despide y el cielo se viste de oro, mira hacia donde señala la gran roca."

Al atardecer del tercer día, Luna llegó a la colina donde estaba el jardín y la gran roca. Siguiendo la dirección que señalaba la roca bajo la luz dorada del atardecer, descubrió una pequeña cabaña oculta entre árboles. Allí estaba su abuela, cuidando a un bebé venado herido.

"Abuela, ¡te encontré!" gritó Luna. La abuela sonrió: "Sabía que lo harías. El árbol de las historias nunca falla. Las palabras y las historias nos guían cuando sabemos escucharlas y comprenderlas."`,
  },

  questions: [
    {
      id: 1,
      type: "literal",
      stars: 10,
      question: "¿Cómo se llamaba la niña protagonista?",
      options: [
        { id: "a", text: "María", correct: false },
        { id: "b", text: "Luna", correct: true },
        { id: "c", text: "Rosa", correct: false },
        { id: "d", text: "Ana", correct: false },
      ],
      feedback: {
        correct: "¡Correcto! La niña se llamaba Luna.",
        incorrect:
          "No es correcto. Lee de nuevo el segundo párrafo del cuento.",
      },
    },
    {
      id: 2,
      type: "literal",
      stars: 10,
      question: "¿Cuántos poemas encontró Luna en el bosque?",
      options: [
        { id: "a", text: "Dos", correct: false },
        { id: "b", text: "Tres", correct: true },
        { id: "c", text: "Cuatro", correct: false },
        { id: "d", text: "Cinco", correct: false },
      ],
      feedback: {
        correct: "¡Excelente! Fueron tres poemas.",
        incorrect:
          "Intenta de nuevo. Busca donde dice 'tres árboles del bosque'.",
      },
    },
    {
      id: 3,
      type: "inferencial",
      stars: 15,
      question:
        "¿Por qué la abuela dejó pistas en lugar de decir directamente dónde estaba?",
      options: [
        {
          id: "a",
          text: "Para que Luna aprendiera a resolver problemas",
          correct: true,
        },
        {
          id: "b",
          text: "Porque no quería que Luna la encontrara",
          correct: false,
        },
        { id: "c", text: "Porque se le olvidó avisar", correct: false },
        { id: "d", text: "Para complicarle la vida a Luna", correct: false },
      ],
      feedback: {
        correct:
          "¡Muy bien! La abuela quería que Luna desarrollara su capacidad de comprensión.",
        incorrect:
          "Piensa en lo que dice la abuela al final sobre 'saber el valor de las palabras'.",
      },
    },
    {
      id: 4,
      type: "inferencial",
      stars: 15,
      question:
        "¿Qué cualidad de Luna fue más importante para encontrar a su abuela?",
      options: [
        { id: "a", text: "Su fuerza física", correct: false },
        { id: "b", text: "Su capacidad de comprender y pensar", correct: true },
        { id: "c", text: "Su velocidad corriendo", correct: false },
        { id: "d", text: "Su buena suerte", correct: false },
      ],
      feedback: {
        correct:
          "¡Perfecto! Luna usó su inteligencia y comprensión para resolver los acertijos.",
        incorrect:
          "La historia no trata sobre fuerza o velocidad, sino sobre comprender.",
      },
    },
    {
      id: 5,
      type: "critica",
      stars: 20,
      question:
        "¿Qué significa la frase 'las palabras nos guían cuando sabemos escucharlas'?",
      options: [
        { id: "a", text: "Las palabras hacen ruido", correct: false },
        {
          id: "b",
          text: "Si prestamos atención y comprendemos, las palabras nos ayudan",
          correct: true,
        },
        {
          id: "c",
          text: "Las palabras siempre dicen la verdad",
          correct: false,
        },
        {
          id: "d",
          text: "Las palabras son como mapas físicos",
          correct: false,
        },
      ],
      feedback: {
        correct:
          "¡Excelente análisis! Comprender el significado de las palabras nos ayuda a encontrar soluciones.",
        incorrect:
          "Piensa en cómo Luna usó la comprensión de los poemas para encontrar a su abuela.",
      },
    },
    {
      id: 6,
      type: "critica",
      stars: 20,
      question: "¿Cuál es la enseñanza más importante de esta historia?",
      options: [
        { id: "a", text: "Siempre hay que obedecer", correct: false },
        { id: "b", text: "El bosque es peligroso", correct: false },
        {
          id: "c",
          text: "Comprender bien las palabras puede resolver problemas",
          correct: true,
        },
        { id: "d", text: "Las abuelas son despistadas", correct: false },
      ],
      feedback: {
        correct:
          "¡Fantástico! La historia nos enseña el poder de la comprensión lectora.",
        incorrect:
          "La historia habla sobre el poder de comprender las palabras, no sobre peligros u obediencia.",
      },
    },
  ],
};
```

_(Similar structures for level2Data.ts and level3Data.ts - follow same pattern)_

---

## 5. COMPONENT SPECIFICATIONS

### 5.1 Core Components

#### 5.1.1 App.tsx

```typescript
/**
 * Main App Component
 *
 * Responsibilities:
 * - Route management between screens
 * - Global state provider
 * - Layout wrapper
 *
 * Props: None
 *
 * State: Uses gameStore (Zustand)
 */

import { useGameStore } from "./store/gameStore";
import IntroScreen from "./screens/IntroScreen";
import Level1Screen from "./screens/Level1Screen";
import Level2Screen from "./screens/Level2Screen";
import Level3Screen from "./screens/Level3Screen";
import FinalScreen from "./screens/FinalScreen";

function App() {
  const currentScreen = useGameStore((state) => state.currentScreen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800">
      {currentScreen === "intro" && <IntroScreen />}
      {currentScreen === "level1" && <Level1Screen />}
      {currentScreen === "level2" && <Level2Screen />}
      {currentScreen === "level3" && <Level3Screen />}
      {currentScreen === "final" && <FinalScreen />}
    </div>
  );
}

export default App;
```

#### 5.1.2 GameHeader Component

```typescript
/**
 * GameHeader Component
 *
 * Displays:
 * - Level name
 * - Current stars counter
 * - Progress indicator
 *
 * Props:
 * - levelName: string
 * - currentStars: number
 * - showProgress?: boolean
 *
 * Example:
 * <GameHeader
 *   levelName="El Bosque de las Letras Perdidas"
 *   currentStars={45}
 *   showProgress={true}
 * />
 */
```

#### 5.1.3 Question Component (Level 1)

```typescript
/**
 * Question Component
 *
 * Displays a single question with multiple choice options
 *
 * Props:
 * - question: Question (from types)
 * - onAnswer: (optionId: string, isCorrect: boolean) => void
 * - disabled: boolean
 *
 * State:
 * - selectedOption: string | null
 * - showFeedback: boolean
 *
 * Behavior:
 * 1. Render question text and type badge
 * 2. Render 4 option buttons
 * 3. On click, disable all buttons
 * 4. Show feedback (correct/incorrect)
 * 5. Call onAnswer callback
 * 6. Show "Next" button
 */
```

#### 5.1.4 StoryEditor Component (Level 3)

```typescript
/**
 * StoryEditor Component
 *
 * Text area for creative writing with:
 * - Title input
 * - Story textarea
 * - Real-time word counter
 * - Word bank display
 * - Auto-save to localStorage
 *
 * Props:
 * - wordBank: string[]
 * - minWords: number
 * - maxWords: number
 * - onSubmit: (story: PlayerStory) => void
 *
 * Features:
 * - Highlight used words from bank
 * - Show validation errors
 * - Character limit
 * - Word count display
 */
```

#### 5.1.5 UnlockAnimation Component

```typescript
/**
 * UnlockAnimation Component
 *
 * Full-screen overlay showing magic word unlock
 *
 * Props:
 * - magicWord: string
 * - badge: string
 * - onComplete: () => void
 *
 * Behavior:
 * - Fade in with overlay
 * - Animate magic word (scale + glow)
 * - Show badge
 * - Confetti effect
 * - Auto-close after 3 seconds
 * - Call onComplete callback
 */
```

### 5.2 UI Components (Reusable)

```typescript
// components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

// components/ui/Card.tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: "sm" | "md" | "lg";
}

// components/ui/ProgressBar.tsx
interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  color?: string;
}

// components/ui/StarCounter.tsx
interface StarCounterProps {
  count: number;
  animated?: boolean;
  size?: "sm" | "md" | "lg";
}
```

---

## 6. STATE MANAGEMENT

### 6.1 Zustand Store

```typescript
// store/gameStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameStore extends GameState {
  // Actions
  setPlayerName: (name: string) => void;
  setCurrentScreen: (screen: ScreenType) => void;
  addStars: (level: number, stars: number) => void;
  unlockMagicWord: (word: MagicWord) => void;
  submitAnswer: (level: number, answer: Answer) => void;
  submitStory: (story: PlayerStory) => void;
  resetGame: () => void;

  // Computed
  canAdvanceLevel: (level: number) => boolean;
  getGuardianLevel: () => GuardianLevel;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial State
      playerName: "",
      currentScreen: "intro",
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

      // Actions
      setPlayerName: (name) => set({ playerName: name }),

      setCurrentScreen: (screen) => set({ currentScreen: screen }),

      addStars: (level, stars) =>
        set((state) => {
          const updates: Partial<GameState> = {
            totalStars: state.totalStars + stars,
          };

          if (level === 1) updates.level1Stars = state.level1Stars + stars;
          if (level === 2) updates.level2Stars = state.level2Stars + stars;
          if (level === 3) updates.level3Stars = state.level3Stars + stars;

          return updates;
        }),

      unlockMagicWord: (word) =>
        set((state) => ({
          unlockedWords: [...state.unlockedWords, word],
        })),

      submitAnswer: (level, answer) =>
        set((state) => {
          if (level === 1) {
            return { level1Answers: [...state.level1Answers, answer] };
          }
          if (level === 2) {
            return { level2Answers: [...state.level2Answers, answer] };
          }
          return state;
        }),

      submitStory: (story) => set({ level3Story: story }),

      resetGame: () =>
        set({
          playerName: "",
          currentScreen: "intro",
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
        return (
          GUARDIAN_LEVELS.find(
            (level) => totalStars >= level.min && totalStars <= level.max
          ) || GUARDIAN_LEVELS[0]
        );
      },
    }),
    {
      name: "game-storage", // localStorage key
      partialize: (state) => ({
        // Only persist essential data
        playerName: state.playerName,
        totalStars: state.totalStars,
        level1Stars: state.level1Stars,
        level2Stars: state.level2Stars,
        level3Stars: state.level3Stars,
        completedAt: state.completedAt,
      }),
    }
  )
);
```

---

## 7. USER FLOWS

### 7.1 Main Flow

```
START
  ↓
[Intro Screen]
  - Enter name
  - Read narrative
  - Click "Comenzar Aventura"
  ↓
[Level 1: El Bosque]
  - Read story (400 words)
  - Answer 6 questions
  - Earn 0-90 stars
  ↓
[Check if passed] (min 60 stars)
  YES → Unlock "IMAGINACIÓN" + show animation
  NO → Show retry message
  ↓
[Level 2: El Puente]
  - Solve 8 challenges
  - Earn 0-96 stars
  ↓
[Check if passed] (min 65 stars)
  YES → Unlock "CREATIVIDAD" + show animation
  NO → Show retry message
  ↓
[Level 3: El Castillo]
  - Choose inspiration image
  - Write story (120-180 words)
  - Self-review checklist
  - Submit
  ↓
[Evaluate story] (simple auto-eval)
  - Earn 0-100 stars based on rubric
  ↓
[Check if passed] (min 65 stars)
  YES → Unlock "VALENTÍA" + show animation
  ↓
[Final Screen]
  - Show total stars
  - Show guardian level
  - Show 3 magic words
  - Generate diploma
  - Option to restart
  ↓
END
```

### 7.2 Level 1 Detailed Flow

```
[Level 1 Start]
  ↓
Display story container
  - Story text scrollable
  - "Comenzar Preguntas" button
  ↓
Click button
  ↓
Hide story, show Question 1
  ↓
User selects option
  ↓
Disable all buttons
Show feedback (correct/incorrect)
Update stars if correct
  ↓
Show "Siguiente" button
  ↓
Click "Siguiente"
  ↓
Show Question 2
  ↓
... (repeat for all 6 questions)
  ↓
After Question 6
  ↓
Calculate total level1Stars
  ↓
IF level1Stars >= 60:
  - Show unlock animation
  - Navigate to Level 2
ELSE:
  - Show "retry" message
  - Option to retry or quit
```

### 7.3 Level 3 Detailed Flow

```
[Level 3 Start]
  ↓
Show 3 inspiration images
  ↓
User selects 1 image
  ↓
Hide images, show writing interface:
  - Word bank (10 words)
  - Title input
  - Story textarea (with word counter)
  - Requirements reminder
  ↓
User writes story
  - Real-time word count
  - Validation on blur
  ↓
Click "Revisar"
  ↓
Show self-review checklist:
  □ ¿Tiene inicio, problema y final?
  □ ¿Usaste al menos 1 diálogo?
  □ ¿Revisaste ortografía?
  □ ¿Usaste 3+ palabras del banco?
  ↓
User confirms checklist
  ↓
Click "Enviar Historia"
  ↓
Run auto-evaluation:
  - Count words from bank used
  - Detect dialogue presence (regex for —)
  - Check word count range
  - Assign scores per criterion
  ↓
Calculate level3Stars
  ↓
IF level3Stars >= 65:
  - Show unlock animation
  - Navigate to Final screen
ELSE:
  - Show improvement suggestions
  - Option to edit and resubmit
```

---

## 8. DETAILED FEATURES

### 8.1 Auto-Evaluation System (Level 3)

```typescript
// utils/textAnalyzer.ts

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
  const wordCount = text.trim().split(/\s+/).length;

  // Detect dialogue (look for — or " patterns)
  const hasDialogue = /—|"|«|»/.test(text);

  // Count word bank usage
  const textLower = text.toLowerCase();
  const wordBankUsed = wordBank.filter((word) =>
    textLower.includes(word.toLowerCase())
  );

  // Estimate structure (simple heuristic)
  // Check if story has multiple paragraphs, good length
  const paragraphs = text.split("\n\n").filter((p) => p.trim().length > 0);
  const estimatedStructureScore =
    paragraphs.length >= 3 && wordCount >= 120 ? 25 : 20;

  return {
    wordCount,
    hasDialogue,
    wordBankUsed,
    estimatedStructureScore,
  };
}

export function evaluateStory(analysis: StoryAnalysis): StoryEvaluation {
  // Structure: 25, 20, or 15 stars
  const structure = analysis.estimatedStructureScore;

  // Creativity: Fixed at 20 stars (can't auto-evaluate creativity well)
  const creativity = 20;

  // Vocabulary: Based on word bank usage
  const vocabulary =
    analysis.wordBankUsed.length >= 3
      ? 25
      : analysis.wordBankUsed.length >= 2
      ? 20
      : 15;

  // Dialogues: Based on detection
  const dialogues = analysis.hasDialogue ? 25 : 15;

  const total = structure + creativity + vocabulary + dialogues;

  return { structure, creativity, vocabulary, dialogues, total };
}
```

### 8.2 Diploma Generator

```typescript
// utils/diplomaGenerator.ts

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generateDiploma(
  playerName: string,
  totalStars: number,
  guardianLevel: string
): Promise<void> {
  // Create diploma HTML element
  const diplomaEl = document.createElement("div");
  diplomaEl.innerHTML = `
    <div style="width: 800px; height: 600px; padding: 40px; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white; font-family: Arial; text-align: center;">
      <h1 style="font-size: 48px; margin-bottom: 20px;">
        Guardián de las Historias
      </h1>
      <p style="font-size: 24px; margin-bottom: 40px;">
        Este diploma certifica que
      </p>
      <h2 style="font-size: 36px; margin-bottom: 40px; 
                 text-decoration: underline;">
        ${playerName}
      </h2>
      <p style="font-size: 20px; margin-bottom: 30px;">
        ha completado exitosamente la Misión de las Palabras Mágicas,
        recuperando las tres palabras: IMAGINACIÓN, CREATIVIDAD y VALENTÍA
      </p>
      <p style="font-size: 24px; font-weight: bold;">
        Puntaje Total: ${totalStars} ⭐
      </p>
      <p style="font-size: 20px;">
        Nivel Alcanzado: ${guardianLevel}
      </p>
      <p style="font-size: 14px; margin-top: 50px; opacity: 0.8;">
        ${new Date().toLocaleDateString("es-ES")}
      </p>
    </div>
  `;

  document.body.appendChild(diplomaEl);

  // Convert to canvas
  const canvas = await html2canvas(diplomaEl);

  // Convert to PDF
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [800, 600],
  });

  pdf.addImage(imgData, "PNG", 0, 0, 800, 600);
  pdf.save(`diploma-${playerName}.pdf`);

  // Cleanup
  document.body.removeChild(diplomaEl);
}
```

### 8.3 Sound System (Optional)

```typescript
// hooks/useSound.ts

import { Howl } from "howler";
import { useEffect, useState } from "react";

const sounds = {
  correct: new Howl({ src: ["/sounds/correct.mp3"], volume: 0.5 }),
  wrong: new Howl({ src: ["/sounds/wrong.mp3"], volume: 0.5 }),
  unlock: new Howl({ src: ["/sounds/unlock.mp3"], volume: 0.7 }),
  victory: new Howl({ src: ["/sounds/victory.mp3"], volume: 0.6 }),
};

export function useSound() {
  const [enabled, setEnabled] = useState(true);

  const play = (soundName: keyof typeof sounds) => {
    if (enabled && sounds[soundName]) {
      sounds[soundName].play();
    }
  };

  const toggle = () => setEnabled((prev) => !prev);

  return { play, enabled, toggle };
}
```

---

## 9. UI/UX REQUIREMENTS

### 9.1 Design System (Tailwind)

```javascript
// tailwind.config.js

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f3ff",
          500: "#6C5CE7",
          600: "#5F4FD9",
          700: "#5243C3",
        },
        gold: {
          500: "#FDCB6E",
          600: "#F1B84E",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
```

### 9.2 Responsive Breakpoints

```
Mobile: < 640px
  - Single column layout
  - Larger touch targets (min 44px)
  - Simplified navigation

Tablet: 640px - 1024px
  - Two column where appropriate
  - Optimized spacing

Desktop: > 1024px
  - Max width container (900px)
  - Centered content
  - Enhanced animations
```

### 9.3 Accessibility Requirements

```
- Semantic HTML5
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible indicators
- Alt text on all images
- Color contrast ratio ≥ 4.5:1
- Text resizable to 200% without loss of functionality
```

### 9.4 Animation Guidelines

```
- Page transitions: 300-500ms ease
- Button hover: 200ms
- Feedback animations: 300ms
- Unlock animation: 3000ms (full sequence)
- Micro-interactions: 150ms

Use Framer Motion for:
- Screen transitions
- Magic word unlock
- Star count increments
- Card reveals
```

---

## 10. IMPLEMENTATION PHASES

### Phase 1: Setup & Foundation (2-3 hours)

```
✓ Initialize Vite + React + TypeScript project
✓ Install dependencies (Zustand, Tailwind, Framer Motion, Lucide)
✓ Setup folder structure
✓ Create type definitions (types/index.ts)
✓ Create game data files (data/*.ts)
✓ Setup Tailwind config
✓ Create base UI components (Button, Card, etc.)
✓ Test build and dev server
```

### Phase 2: State Management & Routing (1-2 hours)

```
✓ Implement Zustand store with persist
✓ Create screen routing logic in App.tsx
✓ Test state persistence in localStorage
✓ Create useGameProgress hook
```

### Phase 3: Intro Screen (1 hour)

```
✓ Create IntroScreen component
✓ Display narrative text
✓ Player name input with validation
✓ Start button → navigate to Level 1
✓ Style with Tailwind
```

### Phase 4: Level 1 - Reading Comprehension (3-4 hours)

```
✓ Create Level1Screen component
✓ Create StoryDisplay component
✓ Create Question component
✓ Create QuestionOption component
✓ Create Feedback component
✓ Implement question navigation
✓ Implement answer validation
✓ Update stars in store
✓ Show unlock animation at end
✓ Navigate to Level 2
```

### Phase 5: Level 2 - Challenges (2-3 hours)

```
✓ Create Level2Screen component
✓ Create ChallengeCard component
✓ Create BridgeProgress visual
✓ Implement challenge navigation
✓ Reuse feedback logic from Level 1
✓ Update stars in store
✓ Show unlock animation
✓ Navigate to Level 3
```

### Phase 6: Level 3 - Writing (4-5 hours)

```
✓ Create Level3Screen component
✓ Create InspirationSelector component
✓ Create StoryEditor component
✓ Create WordBank component
✓ Create SelfReviewChecklist component
✓ Implement real-time word counter
✓ Implement text analysis (utils/textAnalyzer.ts)
✓ Implement auto-evaluation
✓ Update stars in store
✓ Show unlock animation
✓ Navigate to Final screen
```

### Phase 7: Final Screen (2 hours)

```
✓ Create FinalScreen component
✓ Display total stars
✓ Display guardian level
✓ Display unlocked magic words
✓ Create DiplomaGenerator component
✓ Implement diploma download (html2canvas + jsPDF)
✓ Add restart button
```

### Phase 8: Shared Components (2-3 hours)

```
✓ Create GameHeader component
✓ Create UnlockAnimation component
✓ Create StarCounter with animation
✓ Create ProgressBar component
✓ Implement confetti effect (canvas-confetti)
✓ Add Framer Motion transitions between screens
```

### Phase 9: Polish & Optimization (2-3 hours)

```
✓ Add loading states
✓ Add error boundaries
✓ Optimize images (compress, lazy load)
✓ Add sound effects (optional)
✓ Test responsive design
✓ Test keyboard navigation
✓ Fix accessibility issues
✓ Add meta tags for SEO
```

### Phase 10: Testing & Deployment (1-2 hours)

```
✓ Test full user flow
✓ Test on mobile devices
✓ Test localStorage persistence
✓ Test diploma generation
✓ Build for production
✓ Deploy to Netlify/Vercel
✓ Test deployed version
```

**TOTAL ESTIMATED TIME: 20-28 hours**

---

## 11. TESTING CRITERIA

### 11.1 Functional Testing

```
Level 1:
□ Story displays correctly
□ Can read entire story
□ Can start questions after reading
□ All 6 questions display correctly
□ Can select an option
□ Correct answer gives correct stars
□ Wrong answer gives 0 stars
□ Can navigate between questions
□ Final score calculates correctly
□ Unlock animation shows if score ≥ 60
□ Navigates to Level 2 after unlock
□ Retry option shows if score < 60

Level 2:
□ All 8 challenges display correctly
□ Bridge visual updates with each correct answer
□ Scoring works correctly
□ Unlock animation shows if score ≥ 65
□ Navigates to Level 3 after unlock

Level 3:
□ 3 inspiration images display
□ Can select an image
□ Writing interface appears
□ Word bank displays
□ Word counter updates in real-time
□ Cannot submit if < 120 words
□ Checklist displays before submit
□ Auto-evaluation works
□ Scores calculate correctly
□ Unlock animation shows
□ Navigates to Final screen

Final Screen:
□ Displays correct total stars
□ Displays correct guardian level
□ Shows all 3 magic words
□ Diploma generates correctly
□ Diploma downloads as PDF
□ Restart button resets game
```

### 11.2 State Persistence Testing

```
□ Enter name and refresh → name persists
□ Complete Level 1 and refresh → stars persist
□ Write story and refresh → story persists
□ Complete game and refresh → final score persists
□ Restart game → localStorage clears correctly
```

### 11.3 Responsive Testing

```
□ Test on iPhone SE (375px)
□ Test on iPad (768px)
□ Test on desktop (1920px)
□ All text readable at all sizes
□ Buttons tappable on touch devices
□ No horizontal scroll on mobile
□ Images scale appropriately
```

### 11.4 Performance Testing

```
□ First Contentful Paint < 1.5s
□ Time to Interactive < 3s
□ Total bundle size < 500KB (gzipped)
□ Images optimized (WebP format)
□ Lighthouse score > 90
```

---

## 12. DEVELOPMENT COMMANDS

```bash
# Setup
npm create vite@latest mision-palabras-magicas -- --template react-ts
cd mision-palabras-magicas
npm install

# Dependencies
npm install zustand
npm install framer-motion
npm install lucide-react
npm install html2canvas jspdf
npm install canvas-confetti
npm install howler # optional

# Dev
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Deploy (Netlify)
netlify deploy --prod

# Deploy (Vercel)
vercel --prod
```

---

## 13. FILE CHECKLIST

```
Required Files to Create:

📁 Core:
□ src/App.tsx
□ src/main.tsx
□ src/index.css

📁 Types:
□ src/types/index.ts

📁 Data:
□ src/data/gameData.ts
□ src/data/level1Data.ts
□ src/data/level2Data.ts
□ src/data/level3Data.ts

📁 Store:
□ src/store/gameStore.ts

📁 Hooks:
□ src/hooks/useGameProgress.ts
□ src/hooks/useSound.ts

📁 Screens:
□ src/screens/IntroScreen.tsx
□ src/screens/Level1Screen.tsx
□ src/screens/Level2Screen.tsx
□ src/screens/Level3Screen.tsx
□ src/screens/FinalScreen.tsx

📁 Components - UI:
□ src/components/ui/Button.tsx
□ src/components/ui/Card.tsx
□ src/components/ui/ProgressBar.tsx
□ src/components/ui/StarCounter.tsx

📁 Components - Layout:
□ src/components/layout/GameHeader.tsx
□ src/components/layout/ScreenContainer.tsx

📁 Components - Level 1:
□ src/components/level1/StoryDisplay.tsx
□ src/components/level1/Question.tsx
□ src/components/level1/QuestionOption.tsx

📁 Components - Level 2:
□ src/components/level2/ChallengeCard.tsx
□ src/components/level2/BridgeProgress.tsx

📁 Components - Level 3:
□ src/components/level3/InspirationSelector.tsx
□ src/components/level3/StoryEditor.tsx
□ src/components/level3/WordBank.tsx
□ src/components/level3/SelfReviewChecklist.tsx

📁 Components - Shared:
□ src/components/shared/UnlockAnimation.tsx
□ src/components/shared/Feedback.tsx
□ src/components/shared/DiplomaGenerator.tsx

📁 Utils:
□ src/utils/scoreCalculator.ts
□ src/utils/textAnalyzer.ts
□ src/utils/diplomaGenerator.ts

📁 Config:
□ tailwind.config.js
□ tsconfig.json
□ vite.config.ts
```

---

## 14. CLAUDE CODE INSTRUCTIONS

**To Claude Code AI:**

When implementing this project, follow these steps:

1. **Read this entire specification** before starting

2. **Setup Phase:**

   - Create Vite React TypeScript project
   - Install all dependencies listed in section 2
   - Setup folder structure from section 3

3. **Foundation Phase:**

   - Implement all TypeScript types from section 4.1
   - Create all data files from sections 4.2 and 4.3
   - Implement Zustand store from section 6.1

4. **Component Development:**

   - Start with smallest components (UI)
   - Then build screen components
   - Follow component specifications from section 5
   - Reference user flows from section 7

5. **Feature Implementation:**

   - Implement features from section 8
   - Follow UI requirements from section 9
   - Test against criteria from section 11

6. **Best Practices:**

   - Write clean, typed TypeScript
   - Use functional components with hooks
   - Follow React best practices
   - Keep components small and focused
   - Extract reusable logic into hooks
   - Use Tailwind for all styling
   - Add comments for complex logic

7. **Testing:**

   - Test each component as you build it
   - Test state persistence
   - Test responsive design
   - Run through all test criteria from section 11

8. **Deployment:**
   - Build for production
   - Optimize bundle size
   - Deploy to Netlify or Vercel

**Questions to ask developer during implementation:**

- Preference on sound effects (include or skip?)
- Image assets source (provide or use placeholders?)
- Diploma design preferences
- Any additional features desired?

---

## END OF SPECIFICATION

This document should contain everything needed to build the complete application. If any clarifications are needed, ask the developer before proceeding.
