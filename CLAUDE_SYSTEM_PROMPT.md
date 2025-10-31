# 🤖 System Prompt para Claude Console

Este es el prompt que debes configurar en la **Anthropic Console** para que Claude evalúe correctamente las historias de los estudiantes.

## 🎯 ¿Por Qué Usar System Prompt?

Hay dos formas de configurar las instrucciones para Claude:

### **Opción 1: System Prompt en la Consola** ✅ RECOMENDADO

- ✅ Se configura **una vez** en la consola
- ✅ Se aplica a **todas** las requests automáticamente
- ✅ **Ahorra tokens** (no se envía en cada request)
- ✅ **Más económico** a largo plazo
- ✅ Prompts más **simples** en el código

### **Opción 2: Instrucciones en Cada Request** ❌ NO RECOMENDADO

- ❌ Se envía en **cada request** desde el código
- ❌ **Consume más tokens** (más costoso)
- ❌ Prompts más **largos** y complejos
- ❌ Más difícil de mantener

**El código ya está optimizado para usar la Opción 1** (System Prompt en consola).

---

## 📍 Dónde Configurarlo

1. Ve a [https://console.anthropic.com/](https://console.anthropic.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. En la sección **"System"** o **"System Instructions"**, pega el siguiente prompt

---

## 📝 System Prompt Completo

````
Eres un profesor de lengua castellana especializado en educación primaria en Colombia, específicamente para estudiantes de 6to grado (11-12 años). Tu rol es evaluar historias creativas escritas por estudiantes en un contexto educativo gamificado llamado "La Misión de las Palabras Mágicas".

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
NO uses bloques de código markdown (```json).
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

RECUERDA: Responde SOLO el objeto JSON, nada más.
````

---

## 🧪 Prompt de Prueba

Después de configurar el system prompt, prueba con este mensaje en el campo **"User"**:

```
Evalúa esta historia escrita por un estudiante de 6to grado:

Título: "El Dragón Amigable"

Historia: "Había una vez un dragón llamado Fuego que vivía en una montaña. Todos le tenían miedo pero él solo quería amigos. Un día una niña valiente llamada Ana subió la montaña. 'Hola dragón' dijo Ana. 'Hola niña' respondió Fuego con voz suave. Se hicieron amigos y jugaron juntos. Ana le enseñó a Fuego que ser diferente está bien. Desde ese día el dragón fue feliz porque tenía una amiga."

Palabras del banco que debía usar: dragón, montaña, valiente, amigos, feliz

Requisitos:
- Mínimo 150 palabras
- Usar al menos 3 palabras del banco
- Tener inicio, desarrollo y final
- Incluir diálogos
```

---

## ✅ Respuesta Esperada

Claude debería responder **SOLO** con un JSON como este (sin texto adicional):

```json
{
  "structure": {
    "score": 15,
    "feedback": "Tu historia tiene un inicio, desarrollo y final claros. Presentas bien a Fuego y a Ana, y cierras con un final satisfactorio. Para mejorar, podrías desarrollar más cada parte de la historia.",
    "hasBeginning": true,
    "hasDevelopment": true,
    "hasEnding": true
  },
  "creativity": {
    "score": 20,
    "feedback": "¡Me encantó la idea de un dragón que busca amigos! El giro de que Fuego no es temible sino amigable es muy original. El mensaje sobre aceptación es hermoso.",
    "isOriginal": true,
    "hasSurprises": true
  },
  "vocabulary": {
    "score": 25,
    "feedback": "¡Excelente! Usaste todas las palabras del banco de forma natural: dragón, montaña, valiente, amigos y feliz. Se nota que pensaste bien cómo integrarlas.",
    "wordBankUsed": ["dragón", "montaña", "valiente", "amigos", "feliz"],
    "wordBankCount": 5
  },
  "dialogues": {
    "score": 15,
    "feedback": "Los diálogos entre Ana y Fuego están presentes y cumplen su función. Podrías hacerlos más expresivos para mostrar mejor las emociones de los personajes.",
    "hasDialogues": true,
    "dialogueQuality": "basic"
  },
  "total": 75,
  "overallFeedback": "¡Muy buen trabajo! Tu historia tiene un mensaje hermoso sobre la amistad y aceptación. Me gustó mucho cómo mostraste que ser diferente está bien. ¡Sigue escribiendo historias tan bonitas!",
  "strengths": [
    "Uso perfecto de todas las palabras del banco",
    "Mensaje positivo sobre aceptación y ser diferente",
    "Personajes con buena intención y personalidad",
    "Final satisfactorio que cierra bien la historia"
  ],
  "improvements": [
    "Podrías agregar más detalles sobre cómo se ve la montaña o el dragón",
    "Intenta desarrollar más la historia para alcanzar las 150 palabras",
    "Explora más los diálogos para mostrar las emociones de los personajes"
  ]
}
```

---

## ⚙️ Configuración del Modelo

En la consola de Claude, asegúrate de configurar:

- **Model**: `claude-3-5-sonnet-20241022` (NO uses Haiku, usa Sonnet)
- **Temperature**: `0.3` (para respuestas consistentes)
- **Max Tokens**: `2000`

---

## 🔧 Solución al Problema del Texto Extra

Si Claude sigue agregando texto fuera del JSON, **no te preocupes**. El código ya está actualizado para extraer automáticamente el JSON del texto:

```typescript
// Código en claudeService.ts
const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
if (jsonMatch) {
  cleanResponse = jsonMatch[0]; // Extrae solo el JSON
}
```

Esto significa que incluso si Claude responde con:

```
Evaluaré la historia con los criterios establecidos. Aquí está mi evaluación:

{ "structure": { ... } }

Observaciones adicionales: ...
```

El código extraerá automáticamente solo el JSON `{ "structure": { ... } }` y lo procesará correctamente.

---

## 📊 Verificación

Después de configurar, verifica que:

1. ✅ El system prompt está en la sección correcta
2. ✅ El modelo es **claude-3-5-sonnet** (no Haiku)
3. ✅ La temperatura es 0.3
4. ✅ La respuesta de prueba es un JSON válido
5. ✅ El tono es apropiado para niños de 11-12 años

---

## 🚀 Listo para Usar

Una vez configurado correctamente en la consola, tu aplicación funcionará perfectamente porque:

- ✅ El código extrae el JSON automáticamente
- ✅ Maneja errores de parsing
- ✅ Tiene fallback a evaluación básica
- ✅ Muestra mensajes claros al usuario

---

## 📤 ¿Qué Envía el Código en Cada Request?

Con el System Prompt configurado en la consola, el código solo envía **los datos específicos** de cada historia:

```
Evalúa esta historia escrita por un estudiante de 6to grado:

**Título:** "El Dragón Amigable"

**Historia:**
Había una vez un dragón llamado Fuego que vivía en una montaña...

**Banco de palabras disponible:** dragón, montaña, valiente, amigos, feliz

**Requisitos:**
- Mínimo 150 palabras
- Máximo 300 palabras
- Al menos 1 diálogo(s)
- Al menos 3 palabras del banco de palabras
```

**Ventajas:**

- ✅ **Prompt corto** (~100 tokens vs ~1,500 tokens)
- ✅ **Más económico** (ahorra ~$0.003 por evaluación)
- ✅ **Más rápido** (menos tokens = respuesta más rápida)
- ✅ **Más fácil de mantener** (cambios solo en la consola)

---

## 💰 Comparación de Costos

### Con System Prompt en Consola (Actual)

```
Input tokens: ~150 (solo datos de la historia)
Output tokens: ~600 (evaluación)
Costo por evaluación: ~$0.01 USD
```

### Sin System Prompt (Enviando todo en cada request)

```
Input tokens: ~1,650 (instrucciones + datos)
Output tokens: ~600 (evaluación)
Costo por evaluación: ~$0.014 USD
```

**Ahorro:** ~40% en costos de input tokens

---

## 🔄 Flujo Completo

```
1. Usuario escribe historia
   ↓
2. Código envía request a Claude API:
   - System Prompt (configurado en consola) ← Se aplica automáticamente
   - User Message (solo datos de la historia) ← Enviado desde el código
   ↓
3. Claude procesa con ambos contextos
   ↓
4. Claude responde con JSON
   ↓
5. Código extrae y parsea el JSON
   ↓
6. Usuario ve feedback detallado
```

## 🔄 Promp de Prueba

El Dragón y el Tesoro Mágico

Había una vez un dragón que vivía en lo alto de una montaña misterioso. Todos los habitantes del pueblo le tenían miedo, pero él guardaba un secreto increíble: protegía un tesoro mágico que brillaba en la oscuridad de su cueva.

Un día, una niña valiente llamada Ana decidió subir la montaña para descubrir la verdad sobre el dragón. Mientras subía, el viento soplaba fuerte y la nieve caía sobre sus hombros, pero su espíritu de aventura no la dejó rendirse.

Cuando llegó a la cima, vio algo asombroso: el dragón estaba sentado tristemente junto a un cofre brillante. "Hola dragón, me llamo Ana" dijo ella con una sonrisa. "Hola niña, soy Fuego" respondió el dragón con voz suave y sorprendida. "¿No tienes miedo de mí?"

"No, porque veo que eres amable" dijo Ana. El dragón le mostró su tesoro: piedras brillantes que iluminaban la cueva. Se hicieron amigos y jugaron juntos toda la tarde. Ana le enseñó a Fuego que ser diferente está bien y que todos merecen amistad. Desde ese día, el dragón fue feliz porque tenía una amiga verdadera.

---

**Última actualización:** 2025-10-31
