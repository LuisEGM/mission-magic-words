import React, { useState } from "react";
import { motion } from "framer-motion";
import { ScreenContainer } from "../components/layout/ScreenContainer";
import { GameHeader } from "../components/layout/GameHeader";
import { InspirationSelector } from "../components/level3/InspirationSelector";
import { StoryEditor } from "../components/level3/StoryEditor";
import { SelfReviewChecklist } from "../components/level3/SelfReviewChecklist";
import { AIFeedback } from "../components/level3/AIFeedback";
import { ProgrammaticFeedback } from "../components/level3/ProgrammaticFeedback";
import { Button } from "../components/ui/Button";
import { UnlockAnimation } from "../components/shared/UnlockAnimation";
import { CharacterDialogue } from "../components/shared/CharacterDialogue";
import { Card } from "../components/ui/Card";
import { useGameStore } from "../store/gameStore";
import { LEVEL3_DATA } from "../data/level3Data";
import { MAGIC_WORDS } from "../data/gameData";
import {
  analyzeStory,
  evaluateStory,
  type StoryAnalysis,
} from "../utils/textAnalyzer";
import { claudeService } from "../services/claudeService";
import { audioService } from "../services/audioService";
import { AlertCircle } from "lucide-react";
import type { AIStoryEvaluation } from "../types";

type Level3Stage =
  | "intro"
  | "select-image"
  | "write"
  | "review"
  | "ai-evaluation"
  | "programmatic-evaluation"
  | "complete";

export const Level3Screen: React.FC = () => {
  const [stage, setStage] = useState<Level3Stage>("intro");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [showUnlock, setShowUnlock] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [aiEvaluation, setAiEvaluation] = useState<AIStoryEvaluation | null>(
    null
  );
  const [evaluationError, setEvaluationError] = useState<string | null>(null);
  const [programmaticAnalysis, setProgrammaticAnalysis] =
    useState<StoryAnalysis | null>(null);

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

  const handleEvaluateWithAI = async () => {
    setIsEvaluating(true);
    setEvaluationError(null);
    audioService.play("click");

    try {
      const response = await claudeService.validateStory({
        title,
        text,
        wordBank: LEVEL3_DATA.wordBank,
        requirements: LEVEL3_DATA.requirements,
      });

      if (response.success && response.evaluation) {
        setAiEvaluation(response.evaluation);
        setStage("ai-evaluation");
        audioService.play("correct");
      } else {
        setEvaluationError(
          response.error || "Error al evaluar la historia con IA"
        );
        audioService.play("wrong");
      }
    } catch (error) {
      console.error("Error al evaluar con IA:", error);
      setEvaluationError(
        "Error inesperado al conectar con el servicio de evaluación"
      );
      audioService.play("wrong");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSubmitWithoutAI = () => {
    // Evaluación programática
    const analysis = analyzeStory(text, title, LEVEL3_DATA.wordBank);
    setProgrammaticAnalysis(analysis);
    setStage("programmatic-evaluation");
    audioService.play("correct");
  };

  const handleSubmit = () => {
    // Si hay evaluación de IA, usar esa
    if (aiEvaluation) {
      const evaluation = {
        structure: aiEvaluation.structure.score,
        creativity: aiEvaluation.creativity.score,
        vocabulary: aiEvaluation.vocabulary.score,
        dialogues: aiEvaluation.dialogues.score,
        total: aiEvaluation.total,
      };

      addStars(3, evaluation.total);

      submitStory({
        title,
        text,
        wordCount: text
          .trim()
          .split(/\s+/)
          .filter((w) => w.length > 0).length,
        selectedImage: selectedImage!,
        evaluationScore: evaluation,
        submittedAt: new Date().toISOString(),
      });
    } else if (programmaticAnalysis) {
      // Usar evaluación programática
      const evaluation = evaluateStory(programmaticAnalysis);

      addStars(3, evaluation.total);

      submitStory({
        title,
        text,
        wordCount: programmaticAnalysis.wordCount,
        selectedImage: selectedImage!,
        evaluationScore: evaluation,
        submittedAt: new Date().toISOString(),
      });
    } else {
      // Fallback: evaluar ahora
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
    }

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
    const isAIAvailable = claudeService.isAvailable();

    return (
      <ScreenContainer>
        <GameHeader levelName={LEVEL3_DATA.name} currentStars={level3Stars} />
        <div className="mt-8 space-y-6">
          <SelfReviewChecklist
            checklist={LEVEL3_DATA.checklist}
            onSubmit={handleSubmitWithoutAI}
            onGoBack={() => setStage("write")}
          />

          {/* Opción de evaluación con IA */}
          <Card className="p-6 bg-linear-to-r from-purple-50 to-blue-50 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="text-3xl">✨</div>
                <h3 className="text-2xl font-bold text-purple-700">
                  Evaluación con Inteligencia Artificial
                </h3>
              </div>

              {isAIAvailable ? (
                <div className="flex flex-col justify-center">
                  <p className="text-gray-700 mb-4">
                    ¿Quieres que un profesor virtual revise tu historia y te dé
                    feedback detallado?
                  </p>
                  {evaluationError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-start gap-2">
                      <AlertCircle
                        className="text-red-600 shrink-0 mt-0.5"
                        size={20}
                      />
                      <p className="text-sm text-red-700">{evaluationError}</p>
                    </div>
                  )}
                  <Button
                    onClick={handleEvaluateWithAI}
                    disabled={isEvaluating}
                    size="lg"
                    className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex gap-2 items-center justify-center"
                  >
                    {isEvaluating ? (
                      <>
                        {/* <Loader2 className="animate-spin mr-2" size={20} /> */}
                        <div className="text-4xl">🧙‍♂️</div>
                        Evaluando tu historia...
                      </>
                    ) : (
                      <>
                        {/* <Sparkles className="mr-2" size={20} /> */}
                        <div className="text-4xl">🧙‍♂️</div>
                        Evaluar con IA
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Esto puede tomar 10-20 segundos
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    La evaluación con IA no está disponible. Por favor, contacta
                    al desarrollador. Error: API Key missing
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </ScreenContainer>
    );
  }

  if (stage === "ai-evaluation") {
    return (
      <ScreenContainer>
        <GameHeader levelName={LEVEL3_DATA.name} currentStars={level3Stars} />
        <div className="mt-8 space-y-6">
          {aiEvaluation && <AIFeedback evaluation={aiEvaluation} />}

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setStage("write")}
              variant="outline"
              size="lg"
            >
              Mejorar Historia
            </Button>
            <Button onClick={handleSubmit} size="lg">
              Continuar con {aiEvaluation?.total || 0} Estrellas
            </Button>
          </div>
        </div>
      </ScreenContainer>
    );
  }

  if (stage === "programmatic-evaluation") {
    const evaluation = programmaticAnalysis
      ? evaluateStory(programmaticAnalysis)
      : null;

    return (
      <ScreenContainer>
        <GameHeader levelName={LEVEL3_DATA.name} currentStars={level3Stars} />
        <div className="mt-8 space-y-6">
          {programmaticAnalysis && evaluation && (
            <ProgrammaticFeedback
              evaluation={evaluation}
              analysis={programmaticAnalysis}
            />
          )}

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setStage("write")}
              variant="outline"
              size="lg"
            >
              Mejorar Historia
            </Button>
            <Button onClick={handleSubmit} size="lg">
              Continuar con {evaluation?.total || 0} Estrellas
            </Button>
          </div>
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
