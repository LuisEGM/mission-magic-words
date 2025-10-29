import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { QuestionOption } from "./QuestionOption";
import { Feedback } from "../shared/Feedback";
import type { Question as QuestionType } from "../../types";

interface QuestionProps {
  question: QuestionType;
  onAnswer: (optionId: string, isCorrect: boolean, stars: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleOptionClick = (optionId: string) => {
    if (answered) return;

    setSelectedOption(optionId);
    setShowFeedback(true);
    setAnswered(true);

    const selected = question.options.find((opt) => opt.id === optionId);
    const isCorrect = selected?.correct || false;
    const starsEarned = isCorrect ? question.stars : 0;

    onAnswer(optionId, isCorrect, starsEarned);
  };

  const selectedOptionData = question.options.find(
    (opt) => opt.id === selectedOption
  );
  const isCorrect = selectedOptionData?.correct || false;

  const getTypeLabel = (type: string) => {
    const labels = {
      literal: "Literal",
      inferencial: "Inferencial",
      critica: "Crítica",
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      literal: "bg-blue-500",
      inferencial: "bg-purple-500",
      critica: "bg-pink-500",
    };
    return colors[type as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 max-w-3xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            Pregunta {questionNumber} de {totalQuestions}
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(
                question.type
              )}`}
            >
              {getTypeLabel(question.type)}
            </span>
            <span className="text-yellow-600 font-bold">
              {question.stars} ⭐
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-6">
          {question.question}
        </h3>

        <div className="space-y-3 mb-6">
          {question.options.map((option) => (
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
                ? question.feedback.correct
                : question.feedback.incorrect
            }
            stars={isCorrect ? question.stars : undefined}
          />
        )}
      </Card>
    </motion.div>
  );
};
