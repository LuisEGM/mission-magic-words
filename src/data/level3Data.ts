import type { Level3Data } from "../types";
import inspiration1 from "../assets/images/inspiration-1.jpg";
import inspiration2 from "../assets/images/inspiration-2.jpg";
import inspiration3 from "../assets/images/inspiration-3.jpg";

export const LEVEL3_DATA: Level3Data = {
  id: 3,
  name: "3. El Castillo de las Historias Infinitas",
  magicWord: "VALENTÍA",
  badge: "Creador de Mundos",
  duration: "15-18 minutos",
  maxStars: 100,
  minStars: 70,
  intro:
    "Has llegado al Castillo de las Historias Infinitas, donde las mejores historias del mundo cobran vida. Para recuperar la última Palabra Mágica, VALENTÍA, debes crear tu propia historia. Deja volar tu imaginación y demuestra tu creatividad como escritor.",

  inspirationImages: [
    {
      id: 1,
      url: inspiration1,
      alt: "Un niño mirando las estrellas en una noche mágica",
    },
    {
      id: 2,
      url: inspiration2,
      alt: "Un bosque encantado con luz misteriosa",
    },
    {
      id: 3,
      url: inspiration3,
      alt: "Un dragón amigable volando sobre montañas",
    },
  ],

  wordBank: [
    "mágico",
    "aventura",
    "misterioso",
    "valiente",
    "descubrir",
    "brillante",
    "secreto",
    "asombroso",
    "tesoro",
    "increíble",
  ],

  requirements: {
    minWords: 120,
    maxWords: 180,
    minDialogues: 1,
    minWordBankUsage: 3,
  },

  checklist: [
    "Leí mi historia completa",
    "Revisé la ortografía y puntuación",
    "Mi historia tiene sentido de inicio a fin",
    "Estoy satisfecho con mi historia",
  ],

  rubric: [
    {
      criterion: "Estructura narrativa",
      excellent: {
        stars: 25,
        description:
          "Historia completa con inicio, desarrollo y final claramente definidos",
      },
      good: {
        stars: 20,
        description:
          "Historia con estructura básica pero le falta desarrollo en alguna parte",
      },
      basic: {
        stars: 15,
        description: "Historia incompleta o con estructura poco clara",
      },
    },
    {
      criterion: "Creatividad e imaginación",
      excellent: {
        stars: 25,
        description:
          "Historia muy original con ideas creativas y sorprendentes",
      },
      good: {
        stars: 20,
        description: "Historia con elementos creativos pero algo predecible",
      },
      basic: {
        stars: 15,
        description: "Historia simple con poca originalidad",
      },
    },
    {
      criterion: "Uso de vocabulario",
      excellent: {
        stars: 25,
        description: "Usa 4 o más palabras del banco de forma apropiada",
      },
      good: {
        stars: 20,
        description: "Usa 3 palabras del banco de forma apropiada",
      },
      basic: {
        stars: 15,
        description: "Usa menos de 3 palabras del banco",
      },
    },
    {
      criterion: "Diálogos y expresión",
      excellent: {
        stars: 25,
        description:
          "Incluye diálogos bien escritos que enriquecen la historia",
      },
      good: {
        stars: 20,
        description: "Incluye al menos un diálogo básico",
      },
      basic: {
        stars: 15,
        description: "No incluye diálogos o están mal estructurados",
      },
    },
  ],
};
