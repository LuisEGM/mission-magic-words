import React, { useState } from "react";
import { ScreenContainer } from "../components/layout/ScreenContainer";
import { GameHeader } from "../components/layout/GameHeader";
import { StoryDisplay } from "../components/level1/StoryDisplay";
import { Question } from "../components/level1/Question";
import { Button } from "../components/ui/Button";
import { UnlockAnimation } from "../components/shared/UnlockAnimation";
import { Card } from "../components/ui/Card";
import { useGameStore } from "../store/gameStore";
import { LEVEL1_DATA } from "../data/level1Data";
import { MAGIC_WORDS } from "../data/gameData";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export const Level1Screen: React.FC = () => {
  const [showStory, setShowStory] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showUnlock, setShowUnlock] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);

  const {
    level1Stars,
    addStars,
    submitAnswer,
    unlockMagicWord,
    setCurrentScreen,
    canAdvanceLevel,
  } = useGameStore();

  const currentQuestion = LEVEL1_DATA.questions[currentQuestionIndex];
  const isLastQuestion =
    currentQuestionIndex === LEVEL1_DATA.questions.length - 1;

  const handleStartQuestions = () => {
    setShowStory(false);
  };

  const handleAnswer = (
    optionId: string,
    isCorrect: boolean,
    stars: number
  ) => {
    addStars(1, stars);
    submitAnswer(1, {
      questionId: currentQuestion.id,
      selectedOption: optionId,
      isCorrect,
      starsEarned: stars,
      attempts: 1,
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setLevelComplete(true);

      if (canAdvanceLevel(1)) {
        const magicWord = MAGIC_WORDS.find((w) => w.level === 1);
        if (magicWord) {
          unlockMagicWord(magicWord);
          setTimeout(() => setShowUnlock(true), 500);
        }
      }
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleUnlockComplete = () => {
    setShowUnlock(false);
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setLevelComplete(false);
  };

  const handleNextLevel = () => {
    setCurrentScreen("level2");
  };

  return (
    <>
      {showStory && (
        <ScreenContainer>
          <GameHeader
            levelName={LEVEL1_DATA.name}
            currentStars={level1Stars}
            showProgress={false}
          />
          <div className="mt-8">
            <Card className="max-w-2xl mx-auto p-6 mb-6 bg-purple-50 border-2 border-purple-200">
              <p className="text-gray-700 leading-relaxed">
                {LEVEL1_DATA.intro}
              </p>
            </Card>
            <StoryDisplay
              story={LEVEL1_DATA.story}
              onStartQuestions={handleStartQuestions}
            />
          </div>
        </ScreenContainer>
      )}

      {levelComplete && (
        <ScreenContainer>
          <GameHeader levelName={LEVEL1_DATA.name} currentStars={level1Stars} />
          <div className="flex items-center justify-center min-h-[70vh]">
            <Card className="p-8 max-w-lg text-center min-w-4xl w-full">
              {canAdvanceLevel(1) ? (
                <>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="mb-6"
                  >
                    <div className="text-6xl mx-auto">🎉</div>
                  </motion.div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    ¡Nivel Completado!
                  </h2>
                  <p className="text-xl text-gray-600 mb-6">
                    Has obtenido{" "}
                    <span className="font-bold text-yellow-600">
                      {level1Stars} estrellas
                    </span>
                  </p>
                  {/* <p className="text-gray-600">
                    Preparándose para desbloquear la primera palabra mágica...
                  </p> */}
                  <Button onClick={handleNextLevel} size="lg">
                    Siguiente nivel
                  </Button>
                </>
              ) : (
                <>
                  <AlertCircle
                    size={64}
                    className="text-orange-500 mx-auto mb-4"
                  />
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Casi lo logras
                  </h2>
                  <p className="text-xl text-gray-600 mb-6">
                    Obtuviste{" "}
                    <span className="font-bold text-yellow-600">
                      {level1Stars} estrellas
                    </span>
                  </p>
                  <p className="text-gray-600 mb-6">
                    Necesitas al menos {LEVEL1_DATA.minStars} estrellas para
                    continuar.
                  </p>
                  <Button onClick={handleRetry} size="lg">
                    Intentar de Nuevo
                  </Button>
                </>
              )}
            </Card>
          </div>
        </ScreenContainer>
      )}

      {!showStory && !levelComplete && (
        <ScreenContainer>
          <GameHeader levelName={LEVEL1_DATA.name} currentStars={level1Stars} />
          <div className="mt-8">
            <Question
              question={currentQuestion}
              onAnswer={handleAnswer}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={LEVEL1_DATA.questions.length}
            />

            <div className="text-center mt-6">
              <Button onClick={handleNext} size="lg">
                {isLastQuestion ? "Finalizar Nivel" : "Siguiente Pregunta"}
              </Button>
            </div>
          </div>
        </ScreenContainer>
      )}

      {showUnlock && (
        <UnlockAnimation
          magicWord={LEVEL1_DATA.magicWord}
          badge={LEVEL1_DATA.badge}
          onComplete={handleUnlockComplete}
        />
      )}
    </>
  );
};
