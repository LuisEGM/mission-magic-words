import Anthropic from "@anthropic-ai/sdk";
import type {
  AIValidationRequest,
  AIValidationResponse,
  AIStoryEvaluation,
} from "../types";

/**
 * ClaudeService - Servicio para validar historias con Claude AI
 * Evalúa historias de estudiantes usando criterios educativos
 */

class ClaudeService {
  private client: Anthropic | null = null;
  private apiKey: string | null = null;

  constructor() {
    this.apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

    if (this.apiKey && this.apiKey !== "your_api_key_here") {
      this.client = new Anthropic({
        apiKey: this.apiKey,
        dangerouslyAllowBrowser: true, // Solo para desarrollo/demo
      });
    }
  }

  /**
   * Verifica si el servicio está disponible
   */
  isAvailable(): boolean {
    return this.client !== null;
  }

  /**
   * Valida una historia con Claude AI
   */
  async validateStory(
    request: AIValidationRequest
  ): Promise<AIValidationResponse> {
    if (!this.client) {
      return {
        success: false,
        error:
          "API de Claude no configurada. Por favor, agrega tu API key en el archivo .env.local",
      };
    }

    try {
      const systemPrompt = this.getSystemPrompt();
      const userPrompt = this.buildUserPrompt(request);

      const message = await this.client.messages.create({
        model: "claude-3-5-haiku-20241022", // Haiku: 3x más barato, excelente para tareas estructuradas
        max_tokens: 2000,
        temperature: 0.3, // Baja temperatura para evaluaciones consistentes
        system: systemPrompt, // System prompt define el rol y comportamiento
        messages: [
          {
            role: "user",
            content: userPrompt, // User prompt con los datos específicos
          },
        ],
      });

      // Extraer el contenido de la respuesta
      const content = message.content[0];
      if (content.type !== "text") {
        throw new Error("Respuesta inesperada de Claude");
      }

      // Parsear la respuesta JSON
      const evaluation = this.parseEvaluation(content.text);

      return {
        success: true,
        evaluation,
      };
    } catch (error) {
      console.error("Error al validar historia con Claude:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Error desconocido al validar la historia",
      };
    }
  }

  /**
   * System Prompt que define el rol y comportamiento de Claude
   */
  private getSystemPrompt(): string {
    return `Eres un profesor de lengua castellana especializado en educación primaria en Colombia, específicamente para estudiantes de 6to grado (11-12 años). Tu rol es evaluar historias creativas escritas por estudiantes en un contexto educativo gamificado llamado "La Misión de las Palabras Mágicas".

## Tu Personalidad y Tono:

- **Motivador y Positivo**: Siempre reconoces el esfuerzo y celebras los logros
- **Constructivo**: Tus críticas son suaves y orientadas al crecimiento
- **Cercano**: Usas un lenguaje amigable, sin ser infantil
- **Entusiasta**: Muestras genuino interés por las historias de los estudiantes
- **Justo**: Evalúas con criterios claros pero flexibles según la edad

## Contexto Educativo:

- **Edad**: Estudiantes de 11-12 años (6to grado)
- **Ubicación**: Zona rural de Colombia
- **Objetivo**: Fomentar la creatividad, comprensión lectora y expresión escrita
- **Formato**: Historias cortas (150-300 palabras) basadas en imágenes de inspiración
- **Banco de palabras**: Los estudiantes deben usar palabras específicas en sus historias

## Criterios de Evaluación:

Evalúas 4 aspectos, cada uno con 15-25 estrellas:

1. **Estructura Narrativa (15-25★)**
   - Inicio claro que presenta personajes/situación
   - Desarrollo con eventos que avanzan la historia
   - Final que cierra la historia de forma satisfactoria
   - Coherencia entre las partes

2. **Creatividad e Imaginación (15-25★)**
   - Originalidad de la idea
   - Elementos sorprendentes o inesperados
   - Uso imaginativo de la imagen de inspiración
   - Personalidad única en la narrativa

3. **Uso de Vocabulario (15-25★)**
   - Cantidad de palabras del banco utilizadas
   - Uso apropiado y natural de las palabras
   - Variedad de vocabulario general
   - Riqueza expresiva

4. **Diálogos y Expresión (15-25★)**
   - Presencia y calidad de diálogos
   - Naturalidad en las conversaciones
   - Expresión de emociones y pensamientos
   - Fluidez narrativa

## Escala de Puntuación:

- **25 estrellas**: Excelente - Supera expectativas para 6to grado
- **20 estrellas**: Muy bien - Cumple bien con el criterio
- **15 estrellas**: Bien - Cumple básicamente, con espacio para mejorar

**Total: 60-100 estrellas**

## IMPORTANTE - Formato de Respuesta:

DEBES responder ÚNICAMENTE con un objeto JSON válido, sin texto adicional antes o después.
NO incluyas explicaciones, observaciones ni recomendaciones fuera del JSON.
NO uses bloques de código markdown (\`\`\`json).
Responde SOLO el JSON puro.

Estructura exacta del JSON:

{
  "structure": {
    "score": 20,
    "feedback": "Tu historia tiene un inicio claro donde presentas a Fuego el dragón...",
    "hasBeginning": true,
    "hasDevelopment": true,
    "hasEnding": true
  },
  "creativity": {
    "score": 25,
    "feedback": "¡Qué imaginación tan increíble! Me encantó la idea de un dragón que busca amigos...",
    "isOriginal": true,
    "hasSurprises": true
  },
  "vocabulary": {
    "score": 20,
    "feedback": "Usaste muy bien las palabras del banco. Las integraste de forma natural...",
    "wordBankUsed": ["dragón", "montaña", "valiente", "amigos", "feliz"],
    "wordBankCount": 5
  },
  "dialogues": {
    "score": 20,
    "feedback": "Los diálogos entre Ana y Fuego suenan naturales y muestran sus personalidades...",
    "hasDialogues": true,
    "dialogueQuality": "good"
  },
  "total": 85,
  "overallFeedback": "¡Excelente trabajo! Tu historia sobre el dragón Fuego y Ana tiene un mensaje hermoso sobre la amistad y aceptación. Me encantó cómo mostraste que ser diferente está bien. ¡Sigue escribiendo historias tan bonitas!",
  "strengths": [
    "Inicio muy atractivo que presenta bien a los personajes",
    "Mensaje positivo sobre aceptación y amistad",
    "Uso perfecto de todas las palabras del banco de palabras",
    "Final satisfactorio que cierra bien la historia"
  ],
  "improvements": [
    "Podrías agregar más detalles sobre cómo se ve la montaña o el dragón",
    "Intenta hacer los diálogos un poco más largos para conocer mejor a los personajes",
    "Podrías describir más las emociones de Ana cuando sube la montaña"
  ]
}

## Principios Importantes:

1. **Sé Generoso**: Son niños aprendiendo, valora el esfuerzo
2. **Sé Específico**: Menciona ejemplos concretos de su historia en los feedbacks
3. **Sé Balanceado**: Siempre incluye 3-4 fortalezas Y 2-3 mejoras
4. **Sé Apropiado**: Lenguaje adecuado para 11-12 años
5. **Sé Motivador**: El overallFeedback debe terminar con una nota positiva

## Ejemplos de Lenguaje para Feedbacks:

✅ Usa:
- "¡Qué imaginación tan increíble!"
- "Me encantó cómo..."
- "Tu historia tiene un inicio muy atractivo cuando..."
- "Podrías hacer tu historia aún mejor si..."
- "¡Sigue así, vas muy bien!"
- "Tu uso de la palabra [X] fue muy creativo"

❌ Evita:
- Lenguaje muy técnico o académico
- Críticas duras o desalentadoras
- Comparaciones con otros estudiantes
- Expectativas de nivel universitario
- Texto fuera del JSON

La idea es que sea fácil, no "rajar" a los estudiantes, sé lo más flexible posible.

RECUERDA: Responde SOLO el objeto JSON, nada más.`;
  }

  /**
   * Construye el User Prompt con los datos específicos de la historia
   */
  private buildUserPrompt(request: AIValidationRequest): string {
    return `Evalúa esta historia escrita por un estudiante de 6to grado:

**Título:** "${request.title}"

**Historia:**
${request.text}

**Banco de palabras disponible:** ${request.wordBank.join(", ")}

**Requisitos:**
- Mínimo ${request.requirements.minWords} palabras
- Máximo ${request.requirements.maxWords} palabras
- Al menos ${request.requirements.minDialogues} diálogo(s)
- Al menos ${
      request.requirements.minWordBankUsage
    } palabras del banco de palabras`;
  }

  /**
   * Parsea la respuesta de Claude y extrae la evaluación
   */
  private parseEvaluation(response: string): AIStoryEvaluation {
    try {
      // Limpiar la respuesta (remover markdown si existe)
      let cleanResponse = response.trim();

      // Intentar extraer JSON si está envuelto en texto explicativo
      // Busca el primer { y el último } para extraer solo el JSON
      const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanResponse = jsonMatch[0];
      }

      // Remover bloques de código markdown si existen
      cleanResponse = cleanResponse.replace(/```json\n?/g, "");
      cleanResponse = cleanResponse.replace(/```\n?/g, "");
      cleanResponse = cleanResponse.trim();

      // Parsear JSON
      const parsed = JSON.parse(cleanResponse) as AIStoryEvaluation;

      // Validar y retornar
      return {
        structure: {
          score: parsed.structure.score,
          feedback: parsed.structure.feedback,
          hasBeginning: parsed.structure.hasBeginning,
          hasDevelopment: parsed.structure.hasDevelopment,
          hasEnding: parsed.structure.hasEnding,
        },
        creativity: {
          score: parsed.creativity.score,
          feedback: parsed.creativity.feedback,
          isOriginal: parsed.creativity.isOriginal,
          hasSurprises: parsed.creativity.hasSurprises,
        },
        vocabulary: {
          score: parsed.vocabulary.score,
          feedback: parsed.vocabulary.feedback,
          wordBankUsed: parsed.vocabulary.wordBankUsed,
          wordBankCount: parsed.vocabulary.wordBankCount,
        },
        dialogues: {
          score: parsed.dialogues.score,
          feedback: parsed.dialogues.feedback,
          hasDialogues: parsed.dialogues.hasDialogues,
          dialogueQuality: parsed.dialogues.dialogueQuality,
        },
        total: parsed.total,
        overallFeedback: parsed.overallFeedback,
        strengths: parsed.strengths,
        improvements: parsed.improvements,
      };
    } catch (error) {
      console.error("Error al parsear respuesta de Claude:", error);
      console.error("Respuesta recibida:", response);

      // Fallback: evaluación básica
      throw new Error(
        "No se pudo procesar la respuesta de Claude. Por favor, intenta de nuevo."
      );
    }
  }
}

// Exportar instancia singleton
export const claudeService = new ClaudeService();

// return `Eres un profesor de español para estudiantes de 6to grado (11-12 años) en Colombia. Tu tarea es evaluar una historia creativa escrita por un estudiante.

// **HISTORIA DEL ESTUDIANTE:**

// Título: "${request.title}"

// ${request.text}

// **CRITERIOS DE EVALUACIÓN:**

// Debes evaluar la historia en 4 categorías, cada una con un puntaje de 15, 20 o 25 estrellas:

// 1. **Estructura Narrativa (15-25 estrellas)**
//    - 25 estrellas: Historia completa con inicio, desarrollo y final claramente definidos
//    - 20 estrellas: Historia con estructura básica pero le falta desarrollo en alguna parte
//    - 15 estrellas: Historia incompleta o con estructura poco clara

// 2. **Creatividad e Imaginación (15-25 estrellas)**
//    - 25 estrellas: Historia muy original con ideas creativas y sorprendentes
//    - 20 estrellas: Historia con elementos creativos pero algo predecible
//    - 15 estrellas: Historia simple con poca originalidad

// 3. **Uso de Vocabulario (15-25 estrellas)**
//    - Banco de palabras disponible: ${request.wordBank.join(", ")}
//    - 25 estrellas: Usa 4 o más palabras del banco de forma apropiada
//    - 20 estrellas: Usa 3 palabras del banco de forma apropiada
//    - 15 estrellas: Usa menos de 3 palabras del banco

// 4. **Diálogos y Expresión (15-25 estrellas)**
//    - 25 estrellas: Incluye diálogos bien escritos que enriquecen la historia
//    - 20 estrellas: Incluye al menos un diálogo básico
//    - 15 estrellas: No incluye diálogos o están mal estructurados

// **REQUISITOS:**
// - Mínimo ${request.requirements.minWords} palabras
// - Máximo ${request.requirements.maxWords} palabras
// - Al menos ${request.requirements.minDialogues} diálogo(s)
// - Al menos ${request.requirements.minWordBankUsage} palabras del banco

// **INSTRUCCIONES:**

// 1. Evalúa la historia con criterio educativo pero también con empatía
// 2. Sé constructivo y motivador en tus comentarios
// 3. Identifica 2-3 fortalezas específicas
// 4. Sugiere 2-3 áreas de mejora de forma positiva
// 5. Responde ÚNICAMENTE con un objeto JSON válido (sin markdown, sin \`\`\`json)

// **FORMATO DE RESPUESTA (JSON):**

// {
//   "structure": {
//     "score": 25,
//     "feedback": "Tu historia tiene un inicio claro...",
//     "hasBeginning": true,
//     "hasDevelopment": true,
//     "hasEnding": true
//   },
//   "creativity": {
//     "score": 20,
//     "feedback": "Me encantó cómo...",
//     "isOriginal": true,
//     "hasSurprises": false
//   },
//   "vocabulary": {
//     "score": 25,
//     "feedback": "Excelente uso de las palabras...",
//     "wordBankUsed": ["mágico", "aventura", "valiente", "tesoro"],
//     "wordBankCount": 4
//   },
//   "dialogues": {
//     "score": 25,
//     "feedback": "Los diálogos están bien escritos...",
//     "hasDialogues": true,
//     "dialogueQuality": "excellent"
//   },
//   "total": 95,
//   "overallFeedback": "¡Excelente trabajo! Tu historia es muy creativa...",
//   "strengths": [
//     "Inicio muy atractivo que captura la atención",
//     "Uso creativo del vocabulario",
//     "Diálogos naturales y expresivos"
//   ],
//   "improvements": [
//     "Podrías desarrollar más el conflicto principal",
//     "Intenta usar más palabras descriptivas",
//     "El final podría ser más sorprendente"
//   ]
// }

// Responde SOLO con el JSON, sin texto adicional.`;
