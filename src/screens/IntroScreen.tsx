import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";
import { ScreenContainer } from "../components/layout/ScreenContainer";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useGameStore } from "../store/gameStore";
import { INTRO_TEXT } from "../data/gameData";

export const IntroScreen: React.FC = () => {
  const [name, setName] = useState("");
  const { setPlayerName, setCurrentScreen } = useGameStore();

  const handleStart = () => {
    if (name.trim()) {
      setPlayerName(name.trim());
      setCurrentScreen("level1");
    }
  };

  return (
    <ScreenContainer>
      <div className="flex flex-col items-center justify-center min-h-[90vh] gap-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <BookOpen size={80} className="text-yellow-300 drop-shadow-lg" />
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-black text-white text-center mb-4 drop-shadow-lg"
        >
          {INTRO_TEXT.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 mb-8"
        >
          <Sparkles className="text-yellow-300" size={20} />
          <p className="text-xl text-yellow-200 font-medium">
            Una Aventura de Lectura y Creatividad
          </p>
          <Sparkles className="text-yellow-300" size={20} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-2xl flex flex-col gap-y-6"
        >
          <Card className="p-8 mb-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {INTRO_TEXT.story}
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <label
              htmlFor="playerName"
              className="block text-lg font-semibold text-gray-700 mb-3"
            >
              ¿Cuál es tu nombre, Aprendiz de Guardián?
            </label>
            <input
              id="playerName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleStart()}
              placeholder="Escribe tu nombre aquí..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg mb-4"
              autoFocus
            />
            <Button
              onClick={handleStart}
              disabled={!name.trim()}
              size="lg"
              className="w-full"
            >
              Comenzar Aventura
            </Button>
          </Card>
        </motion.div>
      </div>
    </ScreenContainer>
  );
};
