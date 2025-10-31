# 🤖 Guía de Integración con Claude API

## ⚠️ IMPORTANTE: Consola vs Código

### **Consola de Claude (Playground)**
- ✅ Solo para **probar** y **experimentar**
- ✅ Útil para **ajustar** el prompt antes de implementarlo
- ❌ **NO afecta** tu aplicación en producción
- ❌ **NO necesitas** configurar nada ahí para que tu app funcione

### **Código de tu Aplicación (claudeService.ts)**
- ✅ El System Prompt se **envía en cada request** desde el código
- ✅ Ya está **implementado** en `getSystemPrompt()`
- ✅ Se combina con el User Prompt en cada evaluación
- ✅ **Esto es lo que realmente usa tu app**

---

## 🏗️ Arquitectura de la Integración

```typescript
// src/services/claudeService.ts

async validateStory(request: AIValidationRequest) {
  const systemPrompt = this.getSystemPrompt();  // ← Instrucciones generales (~1,400 tokens)
  const userPrompt = this.buildUserPrompt(request); // ← Datos específicos (~150 tokens)

  const message = await this.client.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 2000,
    temperature: 0.3,
    system: systemPrompt,    // ← Define ROL y COMPORTAMIENTO
    messages: [
      {
        role: "user",
        content: userPrompt,  // ← Datos de LA HISTORIA
      },
    ],
  });

  return this.parseEvaluation(message.content[0].text);
}
```

---

## 📊 Flujo Completo

```
1. Usuario escribe historia en Level 3
   ↓
2. Click en "Evaluar con IA"
   ↓
3. claudeService.validateStory() se ejecuta
   ↓
4. Se construyen dos prompts:
   ├─ System Prompt (getSystemPrompt)
   │  └─ Rol, personalidad, criterios, formato JSON
   └─ User Prompt (buildUserPrompt)
      └─ Título, texto, banco de palabras, requisitos
   ↓
5. Se envía request a Claude API:
   {
     system: "Eres un profesor...",
     messages: [{ role: "user", content: "Evalúa esta historia..." }]
   }
   ↓
6. Claude procesa y responde con JSON
   ↓
7. parseEvaluation() extrae el JSON
   ↓
8. AIFeedback component muestra la evaluación
   ↓
9. Usuario ve feedback detallado ✨
```

---

## 💰 Costos con Claude Haiku

### **Pricing:**
- **Input:** $1.00 por 1M tokens
- **Output:** $5.00 por 1M tokens

### **Por Evaluación:**
```
Input:  ~1,550 tokens × $0.000001 = $0.00155
Output: ~545 tokens   × $0.000005 = $0.00273
──────────────────────────────────────────────
Total:                            $0.0043
```

**~$0.005 USD por evaluación** (medio centavo)

### **Proyección:**
| Evaluaciones | Costo Total |
|--------------|-------------|
| 100          | $0.50       |
| 500          | $2.50       |
| 1,000        | $5.00       |
| 5,000        | $25.00      |
| 10,000       | $50.00      |

---

## 🧪 Cómo Probar en la Consola (Opcional)

Si quieres probar el prompt en la consola de Claude antes de usarlo en tu app:

1. Ve a [https://console.anthropic.com/](https://console.anthropic.com/)
2. En el campo **"System"**, pega el contenido de `getSystemPrompt()`
3. En el campo **"User"**, pega un ejemplo de `buildUserPrompt()`
4. Verifica que la respuesta sea un JSON válido

**Nota:** Esto es solo para probar. Tu app NO usa la configuración de la consola.

---

## 📝 System Prompt (Referencia)

El System Prompt completo está en `src/services/claudeService.ts` en el método `getSystemPrompt()`.

**Incluye:**
- Rol y personalidad del profesor
- Contexto educativo (6to grado, Colombia)
- 4 criterios de evaluación (estructura, creatividad, vocabulario, diálogos)
- Escala de puntuación (15-25 estrellas por criterio)
- Formato de respuesta JSON
- Principios y ejemplos de lenguaje

**Total:** ~1,400 tokens

---

## 📝 User Prompt (Referencia)

El User Prompt se construye dinámicamente en `buildUserPrompt()` con:

```
Evalúa esta historia escrita por un estudiante de 6to grado:

**Título:** "[título de la historia]"

**Historia:**
[texto de la historia]

**Banco de palabras disponible:** [palabras separadas por comas]

**Requisitos:**
- Mínimo [X] palabras
- Máximo [X] palabras
- Al menos [X] diálogo(s)
- Al menos [X] palabras del banco de palabras
```

**Total:** ~150 tokens (varía según la longitud de la historia)

---

## 🔧 Configuración Actual

### **Modelo:**
- `claude-3-5-haiku-20241022`
- 3x más barato que Sonnet
- Excelente para tareas estructuradas
- Perfecto para evaluaciones educativas

### **Parámetros:**
- `max_tokens: 2000` - Suficiente para la evaluación completa
- `temperature: 0.3` - Baja para respuestas consistentes

---

## ✅ Checklist de Verificación

Antes de usar en producción, verifica:

- ✅ API key configurada en `.env.local`
- ✅ Variable `VITE_ANTHROPIC_API_KEY` con tu key
- ✅ Código compila sin errores (`pnpm tsc -b`)
- ✅ Prueba con una historia de ejemplo
- ✅ Verifica que el JSON se parsea correctamente
- ✅ Revisa que el feedback sea apropiado para niños

---

## 🚀 Próximos Pasos

1. **Probar la integración:**
   ```bash
   pnpm dev
   ```

2. **Ir al Nivel 3** y escribir una historia

3. **Click en "Evaluar con IA"**

4. **Verificar:**
   - ✅ La evaluación se muestra correctamente
   - ✅ Los 4 criterios tienen puntajes
   - ✅ El feedback es apropiado
   - ✅ Las estrellas se suman correctamente

---

## 🐛 Troubleshooting

### **Error: "API de Claude no configurada"**
- Verifica que `.env.local` existe
- Verifica que `VITE_ANTHROPIC_API_KEY` está configurada
- Reinicia el servidor de desarrollo

### **Error: "No se pudo interpretar la respuesta"**
- Claude puede estar agregando texto extra
- El código ya maneja esto con regex
- Verifica en la consola del navegador el error exacto

### **Error: "Rate limit exceeded"**
- Has excedido el límite de requests
- Espera unos minutos
- Considera actualizar tu plan en Anthropic

---

**Última actualización:** 2025-10-31

