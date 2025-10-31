import React, { useState } from "react";
import { motion } from "framer-motion";
import { ScreenContainer } from "../components/layout/ScreenContainer";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { CharacterDialogue } from "../components/shared/CharacterDialogue";
import { useGameStore } from "../store/gameStore";
import { INTRO_TEXT } from "../data/gameData";
import { audioService } from "../services/audioService";

export const IntroScreen: React.FC = () => {
  const [name, setName] = useState("");
  const { setPlayerName, setCurrentScreen } = useGameStore();

  const handleStart = () => {
    if (name.trim()) {
      audioService.play("click");
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
          className=""
        >
          <div className="text-8xl">📖</div>
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
          <div className="text-3xl">✨</div>
          <p className="text-xl text-yellow-200 font-medium">
            Una Aventura de Lectura y Creatividad
          </p>
          <div className="text-3xl">✨</div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-3xl flex flex-col gap-y-6"
        >
          <CharacterDialogue
            text={INTRO_TEXT.story}
            characterName="Guardián de las Historias"
            position="left"
            className="mb-6"
          />

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
