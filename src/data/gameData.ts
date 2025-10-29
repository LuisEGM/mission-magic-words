import type { GameConfig, MagicWord, GuardianLevel } from "../types";

export const GAME_CONFIG: GameConfig = {
  minStarsLevel1: 60,
  minStarsLevel2: 65,
  minStarsLevel3: 65,
  totalPossibleStars: 286,
};

export const MAGIC_WORDS: MagicWord[] = [
  { id: 1, word: "IMAGINACIÓN", level: 1, unlocked: false },
  { id: 2, word: "CREATIVIDAD", level: 2, unlocked: false },
  { id: 3, word: "VALENTÍA", level: 3, unlocked: false },
];

export const GUARDIAN_LEVELS: GuardianLevel[] = [
  { name: "Guardián Aprendiz", min: 150, max: 200, icon: "✨" },
  { name: "Guardián Junior", min: 201, max: 250, icon: "⭐" },
  { name: "Guardián Experto", min: 251, max: 286, icon: "🌟" },
];

export const INTRO_TEXT = {
  title: "La Misión de las Palabras Mágicas",
  story: `En un mundo donde las historias mantienen viva la imaginación, existe el "Libro de los Cuentos Eternos", custodiado por el sabio Guardián de las Historias.

Pero algo terrible ha ocurrido: el malvado "Ladrón de Silencios" ha robado las tres Palabras Mágicas que dan poder al libro. Sin ellas, las historias se están borrando y el mundo se volverá gris y silencioso.

Tú eres un Aprendiz de Guardián. Tu misión es recuperar las tres Palabras Mágicas superando tres desafíos que pondrán a prueba tu comprensión, tu ingenio y tu creatividad.

¿Estás listo para salvar el mundo de las historias?`,
};
