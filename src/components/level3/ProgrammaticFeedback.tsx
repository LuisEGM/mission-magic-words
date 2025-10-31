import React from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Star, BookOpen, Sparkles, FileText } from "lucide-react";
import type { StoryEvaluation } from "../../types";
import type { StoryAnalysis } from "../../utils/textAnalyzer";

interface ProgrammaticFeedbackProps {
  evaluation: StoryEvaluation;
  analysis: StoryAnalysis;
}

export const ProgrammaticFeedback: React.FC<ProgrammaticFeedbackProps> = ({
  evaluation,
  analysis,
}) => {
  const criteriaData = [
    {
      name: "Estructura",
      score: evaluation.structure,
      maxScore: 35,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      feedback: getStructureFeedback(analysis),
    },
    {
      name: "Vocabulario",
      score: evaluation.vocabulary,
      maxScore: 35,
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50",
      feedback: getVocabularyFeedback(analysis),
    },
    {
      name: "Creatividad",
      score: evaluation.creativity,
      maxScore: 30,
      icon: Sparkles,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      feedback: getCreativityFeedback(analysis),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Puntuación Total */}
      <Card className="p-8 text-center bg-gradient-to-br from-yellow-50 to-orange-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-4"
        >
          <Star className="text-white" size={48} fill="white" />
        </motion.div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          {evaluation.total} Estrellas
        </h2>
        <p className="text-lg text-gray-600">
          {getOverallMessage(evaluation.total)}
        </p>
      </Card>

      {/* Detalles por Criterio */}
      <div className="grid md:grid-cols-2 gap-4">
        {criteriaData.map((criteria, index) => (
          <motion.div
            key={criteria.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card className={`p-6 ${criteria.bgColor}`}>
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg bg-white ${criteria.color} flex-shrink-0`}
                >
                  <criteria.icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-800">{criteria.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star
                        className="text-yellow-500"
                        size={16}
                        fill="currentColor"
                      />
                      <span className="font-bold text-gray-800">
                        {criteria.score}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{criteria.feedback}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Resumen de Análisis */}
      <Card className="p-6 bg-blue-50">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <FileText size={20} className="text-blue-600" />
          Análisis de tu Historia
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {analysis.wordCount}
            </div>
            <div className="text-sm text-gray-600">Palabras</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {analysis.wordBankUsed.length}
            </div>
            <div className="text-sm text-gray-600">Palabras del Banco</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {analysis.sentences}
            </div>
            <div className="text-sm text-gray-600">Oraciones</div>
          </div>
        </div>
        {analysis.wordBankUsed.length > 0 && (
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Palabras del banco usadas:</strong>
            </p>
            <div className="flex flex-wrap gap-2">
              {analysis.wordBankUsed.map((word) => (
                <span
                  key={word}
                  className="px-3 py-1 bg-white text-green-700 rounded-full text-sm font-medium"
                >
                  ✓ {word}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Nota para el Profesor */}
      <Card className="p-6 bg-purple-50 border-2 border-purple-200">
        <p className="text-sm text-gray-700 text-center">
          <strong>📝 Nota:</strong> Esta es una evaluación automática basada en
          criterios medibles. Tu profesor revisará tu historia y podrá darte
          feedback más personalizado.
        </p>
      </Card>
    </motion.div>
  );
};

// Funciones auxiliares para generar feedback

function getOverallMessage(total: number): string {
  if (total >= 85) {
    return "¡Excelente trabajo! Tu historia cumple muy bien con todos los criterios.";
  } else if (total >= 75) {
    return "¡Muy bien! Tu historia está bien desarrollada.";
  } else if (total >= 65) {
    return "¡Buen trabajo! Hay algunas áreas que puedes mejorar.";
  } else {
    return "Buen intento. Sigue practicando para mejorar tu historia.";
  }
}

function getStructureFeedback(analysis: StoryAnalysis): string {
  if (analysis.wordCount < 120) {
    return `Tu historia tiene ${analysis.wordCount} palabras. Intenta desarrollarla más para alcanzar al menos 150 palabras.`;
  } else if (analysis.wordCount > 300) {
    return `Tu historia tiene ${analysis.wordCount} palabras. Es muy completa, pero intenta ser más conciso.`;
  } else if (analysis.sentences >= 8 && analysis.paragraphs >= 3) {
    return `Excelente estructura con ${analysis.sentences} oraciones bien organizadas en ${analysis.paragraphs} párrafos.`;
  } else {
    return `Tu historia tiene ${analysis.sentences} oraciones. Intenta organizarla mejor con párrafos claros.`;
  }
}

function getCreativityFeedback(analysis: StoryAnalysis): string {
  if (analysis.wordBankUsed.length >= 8 && analysis.wordCount >= 250) {
    return "¡Muy creativo! Usaste muchas palabras del banco y desarrollaste una historia extensa.";
  } else if (analysis.wordBankUsed.length >= 6 && analysis.wordCount >= 200) {
    return "¡Buen trabajo creativo! Tu historia tiene buen desarrollo y variedad de palabras.";
  } else if (analysis.wordBankUsed.length >= 4 && analysis.wordCount >= 150) {
    return "Buen uso de las palabras del banco. Intenta desarrollar más tu historia.";
  } else {
    return "Intenta usar más palabras del banco y desarrollar más tu historia.";
  }
}

function getVocabularyFeedback(analysis: StoryAnalysis): string {
  const count = analysis.wordBankUsed.length;
  if (count >= 8) {
    return `¡Excelente! Usaste ${count} palabras del banco de forma natural.`;
  } else if (count >= 7) {
    return `¡Muy bien! Usaste ${count} palabras del banco.`;
  } else if (count >= 5) {
    return `Bien, usaste ${count} palabras del banco. Intenta usar algunas más.`;
  } else if (count >= 3) {
    return `Usaste ${count} palabras del banco. Intenta incorporar más para enriquecer tu vocabulario.`;
  } else {
    return `Solo usaste ${count} palabras del banco. Intenta usar al menos 3 palabras.`;
  }
}
