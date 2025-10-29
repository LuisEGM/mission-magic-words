import type { Level2Data } from '../types';

export const LEVEL2_DATA: Level2Data = {
  id: 2,
  name: "El Puente de los Enigmas",
  magicWord: "CREATIVIDAD",
  badge: "Maestro de Palabras",
  duration: "8-10 minutos",
  maxStars: 96,
  minStars: 65,
  intro: "Has llegado al Puente de los Enigmas, un antiguo paso suspendido sobre el Río del Olvido. Para cruzar y recuperar la segunda Palabra Mágica, CREATIVIDAD, debes resolver acertijos y demostrar tu dominio del lenguaje. Cada desafío superado hace que el puente se fortalezca.",

  challenges: [
    {
      id: 1,
      type: 'acertijo',
      stars: 12,
      question: "Blanca por dentro, verde por fuera. Si quieres que te lo diga, espera.",
      options: [
        { id: "a", text: "La manzana", correct: false },
        { id: "b", text: "La pera", correct: true },
        { id: "c", text: "El limón", correct: false },
        { id: "d", text: "La naranja", correct: false }
      ],
      feedback: {
        correct: "¡Excelente! La pera es blanca por dentro y verde por fuera.",
        incorrect: "Piensa en una fruta que sea blanca en su interior y verde en su exterior."
      }
    },
    {
      id: 2,
      type: 'acertijo',
      stars: 12,
      question: "Tengo agujas pero no coso, tengo números pero no soy matemático. ¿Qué soy?",
      options: [
        { id: "a", text: "Un reloj", correct: true },
        { id: "b", text: "Una calculadora", correct: false },
        { id: "c", text: "Un termómetro", correct: false },
        { id: "d", text: "Una brújula", correct: false }
      ],
      feedback: {
        correct: "¡Correcto! Un reloj tiene agujas y números pero no cose ni hace matemáticas.",
        incorrect: "Piensa en algo que tenga agujas que se mueven y números alrededor."
      }
    },
    {
      id: 3,
      type: 'vocabulario',
      stars: 12,
      question: "¿Qué significa la palabra 'valiente'?",
      options: [
        { id: "a", text: "Alguien que tiene miedo de todo", correct: false },
        { id: "b", text: "Alguien que enfrenta sus miedos con coraje", correct: true },
        { id: "c", text: "Alguien que nunca siente miedo", correct: false },
        { id: "d", text: "Alguien que huye de los problemas", correct: false }
      ],
      feedback: {
        correct: "¡Perfecto! Ser valiente es enfrentar los miedos con coraje, no significa no tener miedo.",
        incorrect: "La valentía no es ausencia de miedo, sino tener el coraje para enfrentarlo."
      }
    },
    {
      id: 4,
      type: 'vocabulario',
      stars: 12,
      question: "Si algo es 'efímero', significa que...",
      options: [
        { id: "a", text: "Dura para siempre", correct: false },
        { id: "b", text: "Es muy grande", correct: false },
        { id: "c", text: "Dura muy poco tiempo", correct: true },
        { id: "d", text: "Es muy pequeño", correct: false }
      ],
      feedback: {
        correct: "¡Excelente! Efímero significa algo que dura muy poco tiempo, como una flor que se marchita rápido.",
        incorrect: "Piensa en algo que existe por un momento muy breve, como un destello o una mariposa que vive poco."
      }
    },
    {
      id: 5,
      type: 'emociones',
      stars: 12,
      question: "¿Qué emoción siente alguien cuando pierde algo muy importante para ellos?",
      options: [
        { id: "a", text: "Alegría", correct: false },
        { id: "b", text: "Tristeza", correct: true },
        { id: "c", text: "Emoción", correct: false },
        { id: "d", text: "Entusiasmo", correct: false }
      ],
      feedback: {
        correct: "¡Correcto! La tristeza es una emoción natural cuando perdemos algo valioso.",
        incorrect: "Piensa en cómo te sentirías si perdieras algo muy especial para ti."
      }
    },
    {
      id: 6,
      type: 'acertijo',
      stars: 12,
      question: "Oro parece, plata no es. Quien no lo adivine, bien tonto es.",
      options: [
        { id: "a", text: "El plátano", correct: true },
        { id: "b", text: "El oro", correct: false },
        { id: "c", text: "La plata", correct: false },
        { id: "d", text: "El limón", correct: false }
      ],
      feedback: {
        correct: "¡Muy bien! El plátano tiene color dorado pero no es oro ni plata.",
        incorrect: "Piensa en una fruta de color amarillo dorado cuyo nombre está en la pista."
      }
    },
    {
      id: 7,
      type: 'vocabulario',
      stars: 12,
      question: "¿Cuál es el sinónimo (palabra con significado similar) de 'feliz'?",
      options: [
        { id: "a", text: "Triste", correct: false },
        { id: "b", text: "Contento", correct: true },
        { id: "c", text: "Enojado", correct: false },
        { id: "d", text: "Cansado", correct: false }
      ],
      feedback: {
        correct: "¡Perfecto! Contento es un sinónimo de feliz, ambas palabras expresan alegría.",
        incorrect: "Busca una palabra que signifique lo mismo que feliz, que exprese alegría."
      }
    },
    {
      id: 8,
      type: 'emociones',
      stars: 12,
      question: "Si alguien está 'orgulloso', significa que se siente...",
      options: [
        { id: "a", text: "Avergonzado de sus logros", correct: false },
        { id: "b", text: "Satisfecho y contento con lo que ha logrado", correct: true },
        { id: "c", text: "Triste por algo que hizo", correct: false },
        { id: "d", text: "Asustado de algo", correct: false }
      ],
      feedback: {
        correct: "¡Excelente! Sentirse orgulloso es estar satisfecho y contento con nuestros logros.",
        incorrect: "Piensa en cómo te sientes cuando haces algo muy bien y todos te felicitan."
      }
    }
  ]
};
