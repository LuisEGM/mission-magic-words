import React, { useState } from "react";
import { ScreenContainer } from "../components/layout/ScreenContainer";
import { GameHeader } from "../components/layout/GameHeader";
import { InspirationSelector } from "../components/level3/InspirationSelector";
import { StoryEditor } from "../components/level3/StoryEditor";
import { SelfReviewChecklist } from "../components/level3/SelfReviewChecklist";
import { Button } from "../components/ui/Button";
import { UnlockAnimation } from "../components/shared/UnlockAnimation";
import { Card } from "../components/ui/Card";
import { useGameStore } from "../store/gameStore";
import { LEVEL3_DATA } from "../data/level3Data";
import { MAGIC_WORDS } from "../data/gameData";
import { analyzeStory, evaluateStory } from "../utils/textAnalyzer";
import { AlertCircle } from "lucide-react";

type Level3Stage = "intro" | "select-image" | "write" | "review" | "complete";

export const Level3Screen: React.FC = () => {
  const [stage, setStage] = useState<Level3Stage>("intro");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [showUnlock, setShowUnlock] = useState(false);

  const {
    level3Stars,
    addStars,
    submitStory,
    unlockMagicWord,
    setCurrentScreen,
    canAdvanceLevel,
  } = useGameStore();

  const handleStartWriting = () => {
    setStage("select-image");
  };

  const handleImageSelect = (imageId: number) => {
    setSelectedImage(imageId);
    setStage("write");
  };

  const handleReview = () => {
    const wordCount = text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
    if (wordCount < LEVEL3_DATA.requirements.minWords) {
      alert(
        `Tu historia necesita al menos ${LEVEL3_DATA.requirements.minWords} palabras. Actualmente tiene ${wordCount}.`
      );
      return;
    }
    if (wordCount > LEVEL3_DATA.requirements.maxWords) {
      alert(
        `Tu historia no debe exceder ${LEVEL3_DATA.requirements.maxWords} palabras. Actualmente tiene ${wordCount}.`
      );
      return;
    }
    setStage("review");
  };

  const handleSubmit = () => {
    const analysis = analyzeStory(text, title, LEVEL3_DATA.wordBank);
    const evaluation = evaluateStory(analysis);

    addStars(3, evaluation.total);

    submitStory({
      title,
      text,
      wordCount: analysis.wordCount,
      selectedImage: selectedImage!,
      evaluationScore: evaluation,
      submittedAt: new Date().toISOString(),
    });

    setStage("complete");

    if (canAdvanceLevel(3)) {
      const magicWord = MAGIC_WORDS.find((w) => w.level === 3);
      if (magicWord) {
        unlockMagicWord(magicWord);
        setTimeout(() => setShowUnlock(true), 1000);
      }
    }
  };

  const handleUnlockComplete = () => {
    setShowUnlock(false);
    setCurrentScreen("final");
  };

  const handleRetry = () => {
    setStage("write");
  };

  if (stage === "intro") {
    return (
      <ScreenContainer>
        <GameHeader
          levelName={LEVEL3_DATA.name}
          currentStars={level3Stars}
          showProgress={false}
        />
        <div className="flex items-center justify-center min-h-[70vh]">
          <Card className="p-8 max-w-4xl">
            <div className="text-6xl text-center mb-4">🏰</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              {LEVEL3_DATA.name}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {LEVEL3_DATA.intro}
            </p>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Tu misión:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>
                  Escribe una historia original de{" "}
                  {LEVEL3_DATA.requirements.minWords}-
                  {LEVEL3_DATA.requirements.maxWords} palabras
                </li>
                <li>
                  Usa al menos {LEVEL3_DATA.requirements.minWordBankUsage}{" "}
                  palabras del banco mágico
                </li>
                <li>
                  Incluye al menos {LEVEL3_DATA.requirements.minDialogues}{" "}
                  diálogo
                </li>
                <li>Asegúrate de que tenga inicio, desarrollo y final</li>
              </ul>
            </div>
            <Button onClick={handleStartWriting} size="lg" className="w-full">
              Comenzar a Escribir
            </Button>
          </Card>
        </div>
      </ScreenContainer>
    );
  }

  if (stage === "select-image") {
    return (
      <ScreenContainer>
        <GameHeader levelName={LEVEL3_DATA.name} currentStars={level3Stars} />
        <div className="mt-8">
          <InspirationSelector
            images={LEVEL3_DATA.inspirationImages}
            onSelect={handleImageSelect}
          />
        </div>
      </ScreenContainer>
    );
  }

  if (stage === "write") {
    return (
      <ScreenContainer>
        <GameHeader levelName={LEVEL3_DATA.name} currentStars={level3Stars} />
        <div className="mt-8">
          <StoryEditor
            wordBank={LEVEL3_DATA.wordBank}
            minWords={LEVEL3_DATA.requirements.minWords}
            maxWords={LEVEL3_DATA.requirements.maxWords}
            onTitleChange={setTitle}
            onTextChange={setText}
            title={title}
            text={text}
          />
          <div className="text-center mt-6">
            <Button
              onClick={handleReview}
              size="lg"
              disabled={!title.trim() || !text.trim()}
            >
              Revisar Historia
            </Button>
          </div>
        </div>
      </ScreenContainer>
    );
  }

  if (stage === "review") {
    return (
      <ScreenContainer>
        <GameHeader levelName={LEVEL3_DATA.name} currentStars={level3Stars} />
        <div className="mt-8">
          <SelfReviewChecklist
            checklist={LEVEL3_DATA.checklist}
            onSubmit={handleSubmit}
            onGoBack={() => setStage("write")}
          />
        </div>
      </ScreenContainer>
    );
  }

  // stage === 'complete'
  const passed = canAdvanceLevel(3);

  return (
    <ScreenContainer>
      <GameHeader levelName={LEVEL3_DATA.name} currentStars={level3Stars} />
      <div className="flex items-center justify-center min-h-[70vh]">
        <Card className="p-8 max-w-lg text-center">
          {passed ? (
            <>
              <div className="text-6xl mb-4">📖</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                ¡Historia Completada!
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Has obtenido{" "}
                <span className="font-bold text-yellow-600">
                  {level3Stars} estrellas
                </span>
              </p>
              <p className="text-gray-600">
                Tu creatividad ha sido excepcional. Preparándose para
                desbloquear la última palabra mágica...
              </p>
            </>
          ) : (
            <>
              <AlertCircle size={64} className="text-orange-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Buen intento
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Obtuviste{" "}
                <span className="font-bold text-yellow-600">
                  {level3Stars} estrellas
                </span>
              </p>
              <p className="text-gray-600 mb-6">
                Necesitas al menos {LEVEL3_DATA.minStars} estrellas para
                continuar. Intenta mejorar tu historia.
              </p>
              <Button onClick={handleRetry} size="lg">
                Mejorar Historia
              </Button>
            </>
          )}
        </Card>
      </div>

      {showUnlock && (
        <UnlockAnimation
          magicWord={LEVEL3_DATA.magicWord}
          badge={LEVEL3_DATA.badge}
          onComplete={handleUnlockComplete}
        />
      )}
    </ScreenContainer>
  );
};
