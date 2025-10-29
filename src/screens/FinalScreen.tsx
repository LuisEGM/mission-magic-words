import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Star, Download, RotateCcw, Award } from 'lucide-react';
import { ScreenContainer } from '../components/layout/ScreenContainer';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useGameStore } from '../store/gameStore';
import { generateDiploma } from '../utils/diplomaGenerator';
import { GAME_CONFIG } from '../data/gameData';

export const FinalScreen: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    playerName,
    totalStars,
    level1Stars,
    level2Stars,
    level3Stars,
    unlockedWords,
    getGuardianLevel,
    resetGame,
    setCurrentScreen
  } = useGameStore();

  const guardianLevel = getGuardianLevel();
  const percentage = Math.round((totalStars / GAME_CONFIG.totalPossibleStars) * 100);

  React.useEffect(() => {
    // Trigger confetti on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#667eea', '#764ba2', '#f093fb', '#ffd200']
      });

      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#667eea', '#764ba2', '#f093fb', '#ffd200']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const handleDownloadDiploma = async () => {
    setIsGenerating(true);
    try {
      await generateDiploma(playerName, totalStars, guardianLevel.name);
    } catch (error) {
      console.error('Error generating diploma:', error);
      alert('Hubo un error al generar el diploma. Por favor intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRestart = () => {
    if (confirm('¿Estás seguro de que quieres reiniciar el juego? Se perderá todo tu progreso.')) {
      resetGame();
      setCurrentScreen('intro');
    }
  };

  return (
    <ScreenContainer>
      <div className="max-w-5xl mx-auto py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="text-center mb-8"
        >
          <Trophy size={100} className="text-yellow-300 mx-auto mb-4 drop-shadow-lg" />
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
            ¡Misión Completada!
          </h1>
          <p className="text-2xl text-yellow-200 font-semibold">
            Has salvado el mundo de las historias, {playerName}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Star className="text-yellow-500" size={32} fill="currentColor" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Resumen de Estrellas
                </h2>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-gray-700">Nivel 1 - Bosque</span>
                  <span className="font-bold text-purple-600">{level1Stars} ⭐</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                  <span className="font-medium text-gray-700">Nivel 2 - Puente</span>
                  <span className="font-bold text-indigo-600">{level2Stars} ⭐</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                  <span className="font-medium text-gray-700">Nivel 3 - Castillo</span>
                  <span className="font-bold text-pink-600">{level3Stars} ⭐</span>
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">Total</span>
                  <span className="text-3xl font-black text-yellow-600">
                    {totalStars} ⭐
                  </span>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-sm text-gray-600">
                    {percentage}% de {GAME_CONFIG.totalPossibleStars} estrellas posibles
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-purple-600" size={32} />
                <h2 className="text-2xl font-bold text-gray-800">
                  Tus Logros
                </h2>
              </div>

              <div className="mb-6">
                <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg">
                  <p className="text-lg text-gray-700 mb-2">Nivel de Guardián</p>
                  <p className="text-4xl font-black text-purple-700 mb-1">
                    {guardianLevel.icon} {guardianLevel.name}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Palabras Mágicas Recuperadas:
                </h3>
                <div className="space-y-2">
                  {unlockedWords.map((word, index) => (
                    <motion.div
                      key={word.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-yellow-50 border-2 border-yellow-300 rounded-lg"
                    >
                      <span className="text-2xl">✨</span>
                      <span className="text-lg font-bold text-yellow-800">
                        {word.word}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              ¡Descarga tu Diploma!
            </h3>
            <p className="text-gray-600 mb-6">
              Has demostrado tus habilidades de comprensión, creatividad y valentía.
              Descarga tu diploma oficial como Guardián de las Historias.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleDownloadDiploma}
                disabled={isGenerating}
                size="lg"
                className="flex items-center gap-2"
              >
                <Download size={20} />
                {isGenerating ? 'Generando...' : 'Descargar Diploma'}
              </Button>

              <Button
                onClick={handleRestart}
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <RotateCcw size={20} />
                Jugar de Nuevo
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-8"
        >
          <p className="text-white/80 text-lg">
            "Las palabras y las historias nos guían cuando sabemos escucharlas y comprenderlas."
          </p>
        </motion.div>
      </div>
    </ScreenContainer>
  );
};
