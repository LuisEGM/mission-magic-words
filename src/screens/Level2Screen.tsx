import React, { useState } from 'react';
import { ScreenContainer } from '../components/layout/ScreenContainer';
import { GameHeader } from '../components/layout/GameHeader';
import { ChallengeCard } from '../components/level2/ChallengeCard';
import { BridgeProgress } from '../components/level2/BridgeProgress';
import { Button } from '../components/ui/Button';
import { UnlockAnimation } from '../components/shared/UnlockAnimation';
import { Card } from '../components/ui/Card';
import { useGameStore } from '../store/gameStore';
import { LEVEL2_DATA } from '../data/level2Data';
import { MAGIC_WORDS } from '../data/gameData';
import { AlertCircle } from 'lucide-react';

export const Level2Screen: React.FC = () => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [showUnlock, setShowUnlock] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState(0);

  const {
    level2Stars,
    addStars,
    submitAnswer,
    unlockMagicWord,
    setCurrentScreen,
    canAdvanceLevel
  } = useGameStore();

  const currentChallenge = LEVEL2_DATA.challenges[currentChallengeIndex];
  const isLastChallenge = currentChallengeIndex === LEVEL2_DATA.challenges.length - 1;

  const handleAnswer = (optionId: string, isCorrect: boolean, stars: number) => {
    addStars(2, stars);
    submitAnswer(2, {
      questionId: currentChallenge.id,
      selectedOption: optionId,
      isCorrect,
      starsEarned: stars,
      attempts: 1
    });
    setCompletedChallenges(prev => prev + 1);
  };

  const handleNext = () => {
    if (isLastChallenge) {
      setLevelComplete(true);

      if (canAdvanceLevel(2)) {
        const magicWord = MAGIC_WORDS.find(w => w.level === 2);
        if (magicWord) {
          unlockMagicWord(magicWord);
          setTimeout(() => setShowUnlock(true), 500);
        }
      }
    } else {
      setCurrentChallengeIndex(prev => prev + 1);
    }
  };

  const handleUnlockComplete = () => {
    setShowUnlock(false);
    setCurrentScreen('level3');
  };

  const handleRetry = () => {
    setCurrentChallengeIndex(0);
    setLevelComplete(false);
    setCompletedChallenges(0);
  };

  if (levelComplete) {
    const passed = canAdvanceLevel(2);

    return (
      <ScreenContainer>
        <GameHeader
          levelName={LEVEL2_DATA.name}
          currentStars={level2Stars}
        />
        <div className="flex items-center justify-center min-h-[70vh]">
          <Card className="p-8 max-w-lg text-center">
            {passed ? (
              <>
                <div className="text-6xl mb-4">🌉</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  ¡Puente Cruzado!
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Has obtenido <span className="font-bold text-yellow-600">{level2Stars} estrellas</span>
                </p>
                <p className="text-gray-600">
                  El puente está completo. Preparándose para desbloquear la segunda palabra mágica...
                </p>
              </>
            ) : (
              <>
                <AlertCircle size={64} className="text-orange-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  El puente necesita refuerzo
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Obtuviste <span className="font-bold text-yellow-600">{level2Stars} estrellas</span>
                </p>
                <p className="text-gray-600 mb-6">
                  Necesitas al menos {LEVEL2_DATA.minStars} estrellas para continuar.
                </p>
                <Button onClick={handleRetry} size="lg">
                  Intentar de Nuevo
                </Button>
              </>
            )}
          </Card>
        </div>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <GameHeader
        levelName={LEVEL2_DATA.name}
        currentStars={level2Stars}
      />

      <div className="mt-8">
        <Card className="max-w-2xl mx-auto p-6 mb-6 bg-indigo-50 border-2 border-indigo-200">
          <p className="text-gray-700 leading-relaxed">
            {LEVEL2_DATA.intro}
          </p>
        </Card>

        <BridgeProgress
          current={completedChallenges}
          total={LEVEL2_DATA.challenges.length}
        />

        <ChallengeCard
          challenge={currentChallenge}
          onAnswer={handleAnswer}
          challengeNumber={currentChallengeIndex + 1}
          totalChallenges={LEVEL2_DATA.challenges.length}
        />

        <div className="text-center mt-6">
          <Button onClick={handleNext} size="lg">
            {isLastChallenge ? 'Finalizar Nivel' : 'Siguiente Desafío'}
          </Button>
        </div>
      </div>

      {showUnlock && (
        <UnlockAnimation
          magicWord={LEVEL2_DATA.magicWord}
          badge={LEVEL2_DATA.badge}
          onComplete={handleUnlockComplete}
        />
      )}
    </ScreenContainer>
  );
};
