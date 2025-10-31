import React, { useState } from "react";
import { motion } from "framer-motion";
import { ScreenContainer } from "../components/layout/ScreenContainer";
import { GameHeader } from "../components/layout/GameHeader";
import { InspirationSelector } from "../components/level3/InspirationSelector";
import { StoryEditor } from "../components/level3/StoryEditor";
import { SelfReviewChecklist } from "../components/level3/SelfReviewChecklist";
import { Button } from "../components/ui/Button";
import { UnlockAnimation } from "../components/shared/UnlockAnimation";
import { CharacterDialogue } from "../components/shared/CharacterDialogue";
import { Card } from "../components/ui/Card";
import { useGameStore } from "../store/gameStore";
import { LEVEL3_DATA } from "../data/level3Data";
import { MAGIC_WORDS } from "../data/gameData";
import { analyzeStory, evaluateStory } from "../utils/textAnalyzer";
import { audioService } from "../services/audioService";

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
    audioService.play("click");
    setSelectedImage(imageId);
    setStage("write");
  };

  const handleReview = () => {
    const wordCount = text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
    if (wordCount < LEVEL3_DATA.requirements.minWords) {
      audioService.play("wrong");
      alert(
        `Tu historia necesita al menos ${LEVEL3_DATA.requirements.minWords} palabras. Actualmente tiene ${wordCount}.`
      );
      return;
    }
    if (wordCount > LEVEL3_DATA.requirements.maxWords) {
      audioService.play("wrong");
      alert(
        `Tu historia no debe exceder ${LEVEL3_DATA.requirements.maxWords} palabras. Actualmente tiene ${wordCount}.`
      );
      return;
    }
    audioService.play("click");
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
      audioService.play("levelComplete");
      const magicWord = MAGIC_WORDS.find((w) => w.level === 3);
      if (magicWord) {
        unlockMagicWord(magicWord);
        setTimeout(() => {
          setShowUnlock(true);
          audioService.play("unlock");
        }, 1200);
      }
    } else {
      // Level completed but insufficient stars
      audioService.play("levelFailed");
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
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-y-8 px-4">
          <div className="text-6xl">🏰</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg">
            {LEVEL3_DATA.name}
          </h2>

          <div className="w-full max-w-3xl">
            <CharacterDialogue
              text={LEVEL3_DATA.intro}
              characterName="Guardián de las Historias"
              position="left"
            />
          </div>

          <Card className="p-6 max-w-2xl w-full">
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
                <span className="text-2xl">📝</span>
                Tu misión:
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold mt-1">✦</span>
                  <span>
                    Escribe una historia original de{" "}
                    <strong>
                      {LEVEL3_DATA.requirements.minWords}-
                      {LEVEL3_DATA.requirements.maxWords} palabras
                    </strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold mt-1">✦</span>
                  <span>
                    Usa al menos{" "}
                    <strong>
                      {LEVEL3_DATA.requirements.minWordBankUsage} palabras
                    </strong>{" "}
                    del banco mágico
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold mt-1">✦</span>
                  <span>
                    Incluye al menos{" "}
                    <strong>
                      {LEVEL3_DATA.requirements.minDialogues} diálogo
                    </strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold mt-1">✦</span>
                  <span>
                    Asegúrate de que tenga{" "}
                    <strong>inicio, desarrollo y final</strong>
                  </span>
                </li>
              </ul>
            </div>
            <Button
              onClick={handleStartWriting}
              size="lg"
              className="w-full mt-6"
            >
              Comenzar a Escribir ✍️
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
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.6,
          }}
          className="w-full flex items-center justify-center"
        >
          <Card className="p-8 text-center">
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
                {/* <AlertCircle size={64} className="text-orange-500 mx-auto mb-4" /> */}
                <div className="text-6xl">🚫</div>
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
        </motion.div>
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
