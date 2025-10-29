import type { Level1Data } from '../types';

export const LEVEL1_DATA: Level1Data = {
  id: 1,
  name: "El Bosque de las Letras Perdidas",
  magicWord: "IMAGINACIÓN",
  badge: "Descifrador de Historias",
  duration: "10-12 minutos",
  maxStars: 90,
  minStars: 60,
  intro: "Los Aprendices llegan al Bosque de las Letras Perdidas, un lugar místico donde las palabras flotan entre los árboles como hojas brillantes. Aquí se encuentra escondida la primera Palabra Mágica: IMAGINACIÓN. Para recuperarla, deben demostrar que pueden comprender completamente una historia antigua guardada en el bosque.",

  story: {
    title: "El árbol que contaba historias",
    text: `En lo más profundo del bosque de Esmeralda, donde los rayos del sol apenas logran tocar el suelo, vivía un árbol muy especial. No era el más alto ni el más frondoso, pero tenía un don extraordinario: podía recordar todas las historias que alguna vez se habían contado bajo su sombra.

Una tarde, una niña llamada Luna llegó al bosque buscando a su abuela, quien había desaparecido días atrás. Luna estaba asustada y cansada. Al ver el viejo árbol, decidió descansar apoyada en su tronco. En ese momento, escuchó una voz suave como el viento: "No llores, niña. Tu abuela me contó su historia antes de partir. Si quieres encontrarla, debes seguir el camino de las palabras."

Luna, sorprendida, preguntó: "¿Qué camino de las palabras?" El árbol respondió: "Tu abuela dejó pistas en forma de poemas tallados en tres árboles del bosque. Si los encuentras y comprendes su significado, sabrás dónde buscarla."

Durante tres días, Luna buscó los árboles con los poemas. El primero decía: "Donde el agua canta y las piedras danzan, busca la casa de quien te ama." Luna comprendió que debía ir al río. El segundo poema rezaba: "En el lugar donde nacen las flores que curan el alma, encontrarás las respuestas." Luna recordó que su abuela siempre hablaba del jardín medicinal en la colina. El tercer poema era más difícil: "Cuando el sol se despide y el cielo se viste de oro, mira hacia donde señala la gran roca."

Al atardecer del tercer día, Luna llegó a la colina donde estaba el jardín y la gran roca. Siguiendo la dirección que señalaba la roca bajo la luz dorada del atardecer, descubrió una pequeña cabaña oculta entre árboles. Allí estaba su abuela, cuidando a un bebé venado herido.

"Abuela, ¡te encontré!" gritó Luna. La abuela sonrió: "Sabía que lo harías. El árbol de las historias nunca falla. Las palabras y las historias nos guían cuando sabemos escucharlas y comprenderlas."`
  },

  questions: [
    {
      id: 1,
      type: 'literal',
      stars: 10,
      question: "¿Cómo se llamaba la niña protagonista?",
      options: [
        { id: "a", text: "María", correct: false },
        { id: "b", text: "Luna", correct: true },
        { id: "c", text: "Rosa", correct: false },
        { id: "d", text: "Ana", correct: false }
      ],
      feedback: {
        correct: "¡Correcto! La niña se llamaba Luna.",
        incorrect: "No es correcto. Lee de nuevo el segundo párrafo del cuento."
      }
    },
    {
      id: 2,
      type: 'literal',
      stars: 10,
      question: "¿Cuántos poemas encontró Luna en el bosque?",
      options: [
        { id: "a", text: "Dos", correct: false },
        { id: "b", text: "Tres", correct: true },
        { id: "c", text: "Cuatro", correct: false },
        { id: "d", text: "Cinco", correct: false }
      ],
      feedback: {
        correct: "¡Excelente! Fueron tres poemas.",
        incorrect: "Intenta de nuevo. Busca donde dice 'tres árboles del bosque'."
      }
    },
    {
      id: 3,
      type: 'inferencial',
      stars: 15,
      question: "¿Por qué la abuela dejó pistas en lugar de decir directamente dónde estaba?",
      options: [
        { id: "a", text: "Para que Luna aprendiera a resolver problemas", correct: true },
        { id: "b", text: "Porque no quería que Luna la encontrara", correct: false },
        { id: "c", text: "Porque se le olvidó avisar", correct: false },
        { id: "d", text: "Para complicarle la vida a Luna", correct: false }
      ],
      feedback: {
        correct: "¡Muy bien! La abuela quería que Luna desarrollara su capacidad de comprensión.",
        incorrect: "Piensa en lo que dice la abuela al final sobre 'saber el valor de las palabras'."
      }
    },
    {
      id: 4,
      type: 'inferencial',
      stars: 15,
      question: "¿Qué cualidad de Luna fue más importante para encontrar a su abuela?",
      options: [
        { id: "a", text: "Su fuerza física", correct: false },
        { id: "b", text: "Su capacidad de comprender y pensar", correct: true },
        { id: "c", text: "Su velocidad corriendo", correct: false },
        { id: "d", text: "Su buena suerte", correct: false }
      ],
      feedback: {
        correct: "¡Perfecto! Luna usó su inteligencia y comprensión para resolver los acertijos.",
        incorrect: "La historia no trata sobre fuerza o velocidad, sino sobre comprender."
      }
    },
    {
      id: 5,
      type: 'critica',
      stars: 20,
      question: "¿Qué significa la frase 'las palabras nos guían cuando sabemos escucharlas'?",
      options: [
        { id: "a", text: "Las palabras hacen ruido", correct: false },
        { id: "b", text: "Si prestamos atención y comprendemos, las palabras nos ayudan", correct: true },
        { id: "c", text: "Las palabras siempre dicen la verdad", correct: false },
        { id: "d", text: "Las palabras son como mapas físicos", correct: false }
      ],
      feedback: {
        correct: "¡Excelente análisis! Comprender el significado de las palabras nos ayuda a encontrar soluciones.",
        incorrect: "Piensa en cómo Luna usó la comprensión de los poemas para encontrar a su abuela."
      }
    },
    {
      id: 6,
      type: 'critica',
      stars: 20,
      question: "¿Cuál es la enseñanza más importante de esta historia?",
      options: [
        { id: "a", text: "Siempre hay que obedecer", correct: false },
        { id: "b", text: "El bosque es peligroso", correct: false },
        { id: "c", text: "Comprender bien las palabras puede resolver problemas", correct: true },
        { id: "d", text: "Las abuelas son despistadas", correct: false }
      ],
      feedback: {
        correct: "¡Fantástico! La historia nos enseña el poder de la comprensión lectora.",
        incorrect: "La historia habla sobre el poder de comprender las palabras, no sobre peligros u obediencia."
      }
    }
  ]
};
