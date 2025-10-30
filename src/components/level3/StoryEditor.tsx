import React, { useState, useEffect } from "react";
import { Card } from "../ui/Card";
import { WordBank } from "./WordBank";
import { AlertCircle, FileText } from "lucide-react";

interface StoryEditorProps {
  wordBank: string[];
  minWords: number;
  maxWords: number;
  onTitleChange: (title: string) => void;
  onTextChange: (text: string) => void;
  title: string;
  text: string;
}

export const StoryEditor: React.FC<StoryEditorProps> = ({
  wordBank,
  minWords,
  maxWords,
  onTitleChange,
  onTextChange,
  title,
  text,
}) => {
  const [wordCount, setWordCount] = useState(0);
  const [usedWords, setUsedWords] = useState<string[]>([]);

  useEffect(() => {
    const words = text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    setWordCount(words.length);

    // Check which words from the bank are used
    const textLower = (text + " " + title).toLowerCase();
    const used = wordBank.filter((word) =>
      textLower.includes(word.toLowerCase())
    );
    setUsedWords(used);
  }, [text, title, wordBank]);

  const wordCountColor =
    wordCount < minWords
      ? "text-orange-600"
      : wordCount > maxWords
      ? "text-red-600"
      : "text-green-600";

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-purple-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">
          Escribe tu Historia
        </h2>
      </div>

      <WordBank words={wordBank} usedWords={usedWords} />

      <div className="mb-4">
        <label
          htmlFor="story-title"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Título de tu historia
        </label>
        <input
          id="story-title"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Escribe un título creativo..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
          maxLength={100}
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="story-text"
            className="block text-sm font-semibold text-gray-700"
          >
            Tu historia
          </label>
          <span className={`text-sm font-bold ${wordCountColor}`}>
            {wordCount} palabras
          </span>
        </div>
        <textarea
          id="story-text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Escribe tu historia aquí... Recuerda incluir un inicio, un problema y un final. Usa diálogos entre los personajes."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-base min-h-[300px] resize-y"
          maxLength={2000}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <AlertCircle
            className="text-blue-600 flex-shrink-0 mt-0.5"
            size={20}
          />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">Requisitos:</p>
            <ul className="list-disc list-inside space-y-1">
              <li className={wordCount >= minWords ? "text-green-700" : ""}>
                Entre {minWords} y {maxWords} palabras (tienes {wordCount})
              </li>
              <li className={usedWords.length >= 3 ? "text-green-700" : ""}>
                Usar al menos 3 palabras del banco (tienes {usedWords.length})
              </li>
              <li>Incluir al menos un diálogo</li>
              <li>Tener inicio, desarrollo y final</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
