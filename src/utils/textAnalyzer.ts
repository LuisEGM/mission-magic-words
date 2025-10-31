import type { StoryEvaluation } from "../types";

export interface StoryAnalysis {
  wordCount: number;
  wordBankUsed: string[];
  sentences: number;
  paragraphs: number;
}

/**
 * Analiza una historia y extrae métricas medibles
 */
export function analyzeStory(
  text: string,
  title: string,
  wordBank: string[]
): StoryAnalysis {
  // Conteo de palabras
  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  // Encontrar palabras del banco usadas (case insensitive, palabra completa)
  const textLower = text.toLowerCase();
  const titleLower = title.toLowerCase();
  const combinedText = textLower + " " + titleLower;

  const wordBankUsed = wordBank.filter((word) => {
    const lowerWord = word.toLowerCase();
    // Buscar palabra completa con límites de palabra
    const regex = new RegExp(`\\b${lowerWord}`, "i");
    return regex.test(combinedText);
  });

  // Contar oraciones (puntos, signos de exclamación, interrogación)
  const sentences = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;

  // Contar párrafos (separados por saltos de línea dobles o simples con contenido)
  const paragraphs = text
    .split(/\n+/)
    .filter((p) => p.trim().length > 20).length;

  return {
    wordCount,
    wordBankUsed,
    sentences,
    paragraphs,
  };
}

/**
 * Evalúa una historia basándose en métricas programáticas
 * Criterios: Estructura, Vocabulario, Creatividad (20-35 estrellas cada uno)
 * Total: 60-100 estrellas
 */
export function evaluateStory(analysis: StoryAnalysis): StoryEvaluation {
  // 1. ESTRUCTURA (20-35★): Basado en longitud, oraciones y párrafos
  let structure = 20;

  // Longitud adecuada (150-300 palabras es ideal)
  if (analysis.wordCount >= 150 && analysis.wordCount <= 300) {
    structure += 8;
  } else if (analysis.wordCount >= 120 && analysis.wordCount <= 350) {
    structure += 5;
  } else if (analysis.wordCount >= 100) {
    structure += 2;
  }

  // Múltiples oraciones (indica desarrollo)
  if (analysis.sentences >= 10) {
    structure += 5;
  } else if (analysis.sentences >= 7) {
    structure += 3;
  } else if (analysis.sentences >= 5) {
    structure += 1;
  }

  // Párrafos (indica organización)
  if (analysis.paragraphs >= 3) {
    structure += 2;
  } else if (analysis.paragraphs >= 2) {
    structure += 1;
  }

  structure = Math.min(structure, 35);

  // 2. VOCABULARIO (20-35★): Basado en palabras del banco usadas
  let vocabulary = 20;

  const usedPercentage = (analysis.wordBankUsed.length / 10) * 100; // Hay 10 palabras en el banco

  if (usedPercentage >= 80) {
    // 8+ palabras
    vocabulary = 35;
  } else if (usedPercentage >= 70) {
    // 7 palabras
    vocabulary = 32;
  } else if (usedPercentage >= 50) {
    // 5-6 palabras
    vocabulary = 28;
  } else if (usedPercentage >= 30) {
    // 3-4 palabras
    vocabulary = 24;
  }

  // 3. CREATIVIDAD (20-30★): Basado en longitud y variedad
  let creativity = 20;

  // Historias más largas suelen tener más desarrollo creativo
  if (analysis.wordCount >= 250) {
    creativity += 5;
  } else if (analysis.wordCount >= 200) {
    creativity += 4;
  } else if (analysis.wordCount >= 150) {
    creativity += 3;
  } else if (analysis.wordCount >= 120) {
    creativity += 1;
  }

  // Usar muchas palabras del banco muestra esfuerzo creativo
  if (analysis.wordBankUsed.length >= 8) {
    creativity += 5;
  } else if (analysis.wordBankUsed.length >= 6) {
    creativity += 3;
  } else if (analysis.wordBankUsed.length >= 4) {
    creativity += 2;
  }

  creativity = Math.min(creativity, 30);

  // Diálogos: Puntuación fija (no se puede medir confiablemente)
  const dialogues = 0; // No se evalúa

  const total = structure + vocabulary + creativity;

  return { structure, creativity, vocabulary, dialogues, total };
}
