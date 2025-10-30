import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { QuestionOption } from "../level1/QuestionOption";
import { Feedback } from "../shared/Feedback";
import type { Challenge } from "../../types";
import { Brain, BookOpen, Heart } from "lucide-react";

interface ChallengeCardProps {
  challenge: Challenge;
  onAnswer: (optionId: string, isCorrect: boolean, stars: number) => void;
  challengeNumber: number;
  totalChallenges: number;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  onAnswer,
  challengeNumber,
  totalChallenges,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answered, setAnswered] = useState(false);

  // Reset state when challenge changes
  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
    setAnswered(false);
  }, [challenge.id]);

  const handleOptionClick = (optionId: string) => {
    if (answered) return;

    setSelectedOption(optionId);
    setShowFeedback(true);
    setAnswered(true);

    const selected = challenge.options.find((opt) => opt.id === optionId);
    const isCorrect = selected?.correct || false;
    const starsEarned = isCorrect ? challenge.stars : 0;

    onAnswer(optionId, isCorrect, starsEarned);
  };

  const selectedOptionData = challenge.options.find(
    (opt) => opt.id === selectedOption
  );
  const isCorrect = selectedOptionData?.correct || false;

  const getTypeIcon = (type: string) => {
    const icons = {
      acertijo: <Brain className="text-purple-600" size={24} />,
      vocabulario: <BookOpen className="text-blue-600" size={24} />,
      emociones: <Heart className="text-pink-600" size={24} />,
    };
    return icons[type as keyof typeof icons] || null;
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      acertijo: "Acertijo",
      vocabulario: "Vocabulario",
      emociones: "Emociones",
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      acertijo: "bg-purple-500",
      vocabulario: "bg-blue-500",
      emociones: "bg-pink-500",
    };
    return colors[type as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 max-w-4xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getTypeIcon(challenge.type)}
            <span className="text-sm font-medium text-gray-600">
              Desafío {challengeNumber} de {totalChallenges}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(
                challenge.type
              )}`}
            >
              {getTypeLabel(challenge.type)}
            </span>
            <span className="text-yellow-600 font-bold">
              {challenge.stars} ⭐
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-6">
          {challenge.question}
        </h3>

        <div className="space-y-3 mb-6">
          {challenge.options.map((option) => (
            <QuestionOption
              key={option.id}
              id={option.id}
              text={option.text}
              isSelected={selectedOption === option.id}
              isCorrect={option.correct}
              showResult={showFeedback}
              onClick={() => handleOptionClick(option.id)}
              disabled={answered}
            />
          ))}
        </div>

        {showFeedback && (
          <Feedback
            isCorrect={isCorrect}
            message={
              isCorrect
                ? challenge.feedback.correct
                : challenge.feedback.incorrect
            }
            stars={isCorrect ? challenge.stars : undefined}
          />
        )}
      </Card>
    </motion.div>
  );
};
