import type { GameConfig, MagicWord, GuardianLevel } from "../types";

export const GAME_CONFIG: GameConfig = {
  minStarsLevel1: 65, // 65% de 100 puntos
  minStarsLevel2: 70, // 70% de 100 puntos
  minStarsLevel3: 70, // 70% de 100 puntos
  totalPossibleStars: 300, // 100 puntos por nivel
};

export const MAGIC_WORDS: MagicWord[] = [
  { id: 1, word: "IMAGINACIÓN", level: 1, unlocked: false },
  { id: 2, word: "CREATIVIDAD", level: 2, unlocked: false },
  { id: 3, word: "VALENTÍA", level: 3, unlocked: false },
];

export const GUARDIAN_LEVELS: GuardianLevel[] = [
  { name: "Guardián Aprendiz", min: 150, max: 200, icon: "🥉" }, // 50-67% del total✨
  { name: "Guardián Junior", min: 201, max: 250, icon: "🥈" }, // 67-83% del total⭐
  { name: "Guardián Experto", min: 251, max: 300, icon: "🥇" }, // 83-100% del total🌟
];

export const INTRO_TEXT = {
  title: "La Misión de las Palabras Mágicas",
  story: `En un mundo donde las historias mantienen viva la imaginación, existe el "Libro de los Cuentos Eternos", custodiado por el sabio Guardián de las Historias.

Pero algo terrible ha ocurrido: el malvado "Ladrón de Silencios" ha robado las tres Palabras Mágicas que dan poder al libro. Sin ellas, las historias se están borrando y el mundo se volverá gris y silencioso.

Tú eres un Aprendiz de Guardián. Tu misión es recuperar las tres Palabras Mágicas superando tres desafíos que pondrán a prueba tu comprensión, tu ingenio y tu creatividad.

¿Estás listo para salvar el mundo de las historias?`,
};
