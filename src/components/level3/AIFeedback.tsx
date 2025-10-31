import React from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import {
  Star,
  Sparkles,
  TrendingUp,
  MessageCircle,
  BookOpen,
} from "lucide-react";
import type { AIStoryEvaluation } from "../../types";

interface AIFeedbackProps {
  evaluation: AIStoryEvaluation;
}

export const AIFeedback: React.FC<AIFeedbackProps> = ({ evaluation }) => {
  const criteriaIcons = {
    structure: BookOpen,
    creativity: Sparkles,
    vocabulary: TrendingUp,
    dialogues: MessageCircle,
  };

  const criteriaLabels = {
    structure: "Estructura Narrativa",
    creativity: "Creatividad e Imaginación",
    vocabulary: "Uso de Vocabulario",
    dialogues: "Diálogos y Expresión",
  };

  const getScoreColor = (score: number) => {
    if (score >= 25) return "text-green-600";
    if (score >= 20) return "text-yellow-600";
    return "text-orange-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 25) return "bg-green-100";
    if (score >= 20) return "bg-yellow-100";
    return "bg-orange-100";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-4xl mx-auto"
    >
      {/* Header con puntaje total */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="text-yellow-500" size={32} fill="currentColor" />
            <h3 className="text-3xl font-bold text-purple-700">
              {evaluation.total} / 100
            </h3>
            <Star className="text-yellow-500" size={32} fill="currentColor" />
          </div>
          <p className="text-lg text-gray-700 font-medium">
            Evaluación con Inteligencia Artificial
          </p>
        </div>
      </Card>

      {/* Feedback general */}
      <Card className="p-6">
        <h4 className="text-xl font-bold text-purple-700 mb-3 flex items-center gap-2">
          <Sparkles size={24} />
          Comentario General
        </h4>
        <p className="text-base text-gray-700 leading-relaxed">
          {evaluation.overallFeedback}
        </p>
      </Card>

      {/* Criterios individuales */}
      <div className="grid gap-4 md:grid-cols-2">
        {(
          Object.keys(criteriaLabels) as Array<keyof typeof criteriaLabels>
        ).map((key) => {
          const Icon = criteriaIcons[key];
          const criterion = evaluation[key];
          const score = criterion.score;

          return (
            <Card key={key} className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${getScoreBg(
                    score
                  )} ${getScoreColor(score)}`}
                >
                  <Icon size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-lg font-bold text-gray-800">
                      {criteriaLabels[key]}
                    </h5>
                    <span
                      className={`text-xl font-bold ${getScoreColor(score)}`}
                    >
                      {score}★
                    </span>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {criterion.feedback}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Fortalezas */}
      <Card className="p-6 bg-green-50">
        <h4 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
          <TrendingUp size={24} />✨ Fortalezas de tu Historia
        </h4>
        <ul className="space-y-2">
          {evaluation.strengths.map((strength, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2 text-base text-gray-700"
            >
              <span className="text-green-600 font-bold">✓</span>
              <span>{strength}</span>
            </motion.li>
          ))}
        </ul>
      </Card>

      {/* Áreas de mejora */}
      <Card className="p-6 bg-blue-50">
        <h4 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
          <BookOpen size={24} />
          💡 Sugerencias para Mejorar
        </h4>
        <ul className="space-y-2">
          {evaluation.improvements.map((improvement, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="flex items-start gap-2 text-base text-gray-700"
            >
              <span className="text-blue-600 font-bold">→</span>
              <span>{improvement}</span>
            </motion.li>
          ))}
        </ul>
      </Card>

      {/* Detalles del vocabulario */}
      {evaluation.vocabulary.wordBankUsed.length > 0 && (
        <Card className="p-6 bg-purple-50">
          <h4 className="text-lg font-bold text-purple-700 mb-3">
            📚 Palabras del Banco Utilizadas
          </h4>
          <div className="flex flex-wrap gap-2">
            {evaluation.vocabulary.wordBankUsed.map((word, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-3 py-1.5 bg-purple-200 text-purple-800 rounded-full text-base font-medium"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </Card>
      )}
    </motion.div>
  );
};
