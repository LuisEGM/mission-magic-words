# 📋 Tareas Pendientes - La Misión de las Palabras Mágicas

## 🎯 Prioridad Alta

### 1. 🤖 Mejorar Nivel 3 - Validación con IA (Claude) ✅ COMPLETADO

**Objetivo:** Integrar Claude AI para evaluar automáticamente las historias escritas por los estudiantes.

**Tareas:**

- [x] Investigar y configurar la API de Claude (Anthropic)
  - [x] Crear cuenta en Anthropic Console
  - [x] Obtener API Key
  - [x] Configurar variables de entorno (`.env`)
  - [x] Instalar SDK: `pnpm add @anthropic-ai/sdk`
- [x] Crear servicio de validación con IA
  - [x] Crear archivo `src/services/claudeService.ts`
  - [x] Implementar función `validateStoryWithAI(story, title, criteria)`
  - [x] Definir prompt para evaluación educativa
  - [x] Manejar respuestas y errores de la API
- [x] Integrar validación en Level3Screen
  - [x] Agregar botón "Evaluar con IA" en stage review
  - [x] Mostrar loading state durante evaluación
  - [x] Mostrar feedback detallado de Claude
  - [x] Calcular estrellas basado en evaluación de IA
- [x] Criterios de evaluación para Claude:
  - [x] Estructura narrativa (15-25 puntos)
  - [x] Creatividad e imaginación (15-25 puntos)
  - [x] Uso de vocabulario del banco de palabras (15-25 puntos)
  - [x] Diálogos y expresión (15-25 puntos)
  - [x] Feedback constructivo para el estudiante
- [x] Consideraciones técnicas:
  - [x] Implementar manejo de errores
  - [x] Agregar fallback si falla la API (usa evaluación básica)
  - [x] Detectar si API está disponible
  - [x] Documentar costos de API

**Archivos creados/modificados:**

```
src/
├── services/
│   └── claudeService.ts          # ✅ Creado
├── components/
│   └── level3/
│       └── AIFeedback.tsx        # ✅ Creado - Mostrar feedback de Claude
├── screens/
│   └── Level3Screen.tsx          # ✅ Modificado - Integración completa
├── types/
│   └── index.ts                  # ✅ Modificado - Tipos para AI response
└── vite-env.d.ts                 # ✅ Creado - Tipos para imports de imágenes
```

**Archivos de configuración:**

```
.env.local                        # ✅ Creado - API key de Claude
.env.example                      # ✅ Creado - Template
CLAUDE_API_SETUP.md               # ✅ Creado - Documentación completa
```

**Recursos:**

- [Anthropic API Docs](https://docs.anthropic.com/claude/reference/getting-started-with-the-api)
- [Claude SDK TypeScript](https://github.com/anthropics/anthropic-sdk-typescript)
- [CLAUDE_API_SETUP.md](./CLAUDE_API_SETUP.md) - Guía de configuración

---

## 2. 🔊 Agregar Sonidos con Howler.js ✅ COMPLETADO

**Objetivo:** Mejorar la experiencia de juego con efectos de sonido y música de fondo.

**Tareas:**

- [x] Instalar Howler.js

  - [x] Ejecutar: `pnpm add howler`
  - [x] Ejecutar: `pnpm add -D @types/howler`

- [x] Crear servicio de audio

  - [x] Crear archivo `src/services/audioService.ts`
  - [x] Implementar clase `AudioManager` con Howler
  - [x] Configurar volumen global y controles

- [x] Conseguir/crear assets de audio

  - [x] Música de fondo (loop) - ambiente mágico/aventura
  - [x] Sonido de respuesta correcta ✅
  - [x] Sonido de respuesta incorrecta ❌
  - [x] Sonido de desbloqueo de palabra mágica ✨
  - [x] Sonido de recolección de estrellas ⭐
  - [x] Sonido de completar nivel 🎉
  - [x] Sonido de nivel fallido (puntos insuficientes) 😔
  - [x] Sonido de escritura (typing) para Level 3
  - [x] Sonido de celebración final 🏆
  - [x] Sonido de clicks en UI 🖱️

- [x] Integrar sonidos en componentes

  - [x] IntroScreen - sonido al iniciar
  - [x] Level1Screen - sonidos de respuestas correctas/incorrectas, estrellas, nivel completo/fallido
  - [x] Level2Screen - sonidos de respuestas correctas/incorrectas, estrellas, nivel completo/fallido
  - [x] Level3Screen - sonidos de selección, validación, nivel completo/fallido
  - [x] UnlockAnimation - sonido de desbloqueo
  - [x] FinalScreen - música de celebración

- [x] Crear controles de audio
  - [x] Botón de mute/unmute en header
  - [x] Persistir preferencias en localStorage
  - [x] Componente `AudioControls.tsx`
  - [x] Integrado en GameHeader
- [ ] Optimizaciones
  - [ ] Precargar sonidos importantes
  - [ ] Lazy load música de fondo
  - [ ] Comprimir archivos de audio (MP3/OGG)
  - [ ] Fallback si audio no está disponible

**Archivos a crear/modificar:**

```
public/
└── sounds/
    ├── background-music.mp3
    ├── correct-answer.mp3
    ├── wrong-answer.mp3
    ├── unlock-word.mp3
    ├── collect-star.mp3
    ├── level-complete.mp3
    ├── typing.mp3
    └── final-celebration.mp3

src/
├── services/
│   └── audioService.ts           # Nuevo
├── components/
│   ├── layout/
│   │   └── AudioControls.tsx     # Nuevo
│   ├── level1/
│   │   └── Question.tsx          # Modificar
│   ├── level2/
│   │   └── ChallengeCard.tsx     # Modificar
│   └── shared/
│       └── UnlockAnimation.tsx   # Modificar
└── screens/
    ├── IntroScreen.tsx           # Modificar
    ├── Level1Screen.tsx          # Modificar
    ├── Level2Screen.tsx          # Modificar
    ├── Level3Screen.tsx          # Modificar
    └── FinalScreen.tsx           # Modificar
```

**Recursos para audio:**

- [Freesound.org](https://freesound.org/) - Efectos de sonido gratis
- [Incompetech](https://incompetech.com/) - Música libre de derechos
- [Zapsplat](https://www.zapsplat.com/) - Efectos de sonido
- [Howler.js Docs](https://howlerjs.com/)

---

## 3. 🎨 Mejorar Layout y Diseño del Diploma

**Objetivo:** Hacer el diploma más atractivo, profesional y memorable para los estudiantes.

**Tareas:**

- [ ] Rediseñar componente DiplomaGenerator
  - [ ] Crear nuevo layout más visual
  - [ ] Agregar bordes decorativos
  - [ ] Mejorar tipografía (usar Fredoka)
  - [ ] Agregar ilustraciones/iconos
- [ ] Elementos visuales a agregar:
  - [ ] Logo/emblema del juego en la parte superior
  - [ ] Borde decorativo estilo pergamino/certificado
  - [ ] Las 3 palabras mágicas destacadas con iconos
  - [ ] Ilustración del Guardián de las Historias
  - [ ] Estrellas obtenidas de forma visual
  - [ ] Fecha de completación
  - [ ] Firma del "Guardián de las Historias"
  - [ ] Sello/medalla de "Guardián Aprobado"
- [ ] Mejorar textos del diploma
  - [ ] Texto de felicitación más emotivo
  - [ ] Mencionar logros específicos por nivel
  - [ ] Agregar mensaje motivacional
  - [ ] Incluir estadísticas del juego
- [ ] Optimizar generación de PDF
  - [ ] Mejorar calidad de imagen (DPI)
  - [ ] Ajustar tamaño de página (A4 landscape)
  - [ ] Optimizar colores para impresión
  - [ ] Agregar metadatos al PDF
- [ ] Opciones adicionales
  - [ ] Vista previa antes de descargar
  - [ ] Opción de compartir en redes sociales
  - [ ] Generar imagen PNG además de PDF
  - [ ] Personalizar con nombre del estudiante

**Estructura del diploma mejorado:**

```
┌─────────────────────────────────────────────────────────┐
│  ✨ DIPLOMA DE GUARDIÁN DE LAS HISTORIAS ✨            │
│                                                         │
│              🧙‍♂️ [Logo/Emblema] 📚                      │
│                                                         │
│  ═══════════════════════════════════════════════════   │
│                                                         │
│         Se otorga el presente diploma a:                │
│                                                         │
│              [NOMBRE DEL ESTUDIANTE]                    │
│                                                         │
│  Por completar exitosamente La Misión de las           │
│  Palabras Mágicas y recuperar las tres palabras        │
│  sagradas del mundo de las historias:                   │
│                                                         │
│     ⭐ IMAGINACIÓN  ⭐ CREATIVIDAD  ⭐ VALENTÍA         │
│                                                         │
│  Logros alcanzados:                                     │
│  • Nivel 1: [X] estrellas - Comprensión Lectora       │
│  • Nivel 2: [X] estrellas - Maestría del Vocabulario  │
│  • Nivel 3: [X] estrellas - Escritura Creativa        │
│                                                         │
│  Total: [XXX] puntos de 300 posibles                   │
│                                                         │
│  "Tu imaginación es tu superpoder más grande"          │
│                                                         │
│  ───────────────────────────────────────────────       │
│  Guardián de las Historias        [Fecha]              │
│  [Firma/Sello]                                          │
└─────────────────────────────────────────────────────────┘
```

**Archivos a modificar:**

```
src/
├── components/
│   └── shared/
│       ├── DiplomaGenerator.tsx      # Modificar
│       └── DiplomaPreview.tsx        # Nuevo - Vista previa
├── utils/
│   └── diplomaGenerator.ts           # Modificar
└── screens/
    └── FinalScreen.tsx               # Modificar
```

**Recursos de diseño:**

- [Canva](https://www.canva.com/) - Inspiración para diseño de diplomas
- [Flaticon](https://www.flaticon.com/) - Iconos decorativos
- [Google Fonts](https://fonts.google.com/) - Tipografías adicionales

---

## 📊 Resumen de Prioridades

| Tarea                         | Prioridad | Complejidad | Tiempo Estimado | Estado       |
| ----------------------------- | --------- | ----------- | --------------- | ------------ |
| 1. Validación con IA (Claude) | 🔴 Alta   | 🔴 Alta     | 8-12 horas      | ✅ Completo  |
| 2. Sonidos con Howler         | 🟡 Media  | 🟡 Media    | 4-6 horas       | ✅ Completo  |
| 3. Mejorar Diploma            | 🟢 Baja   | 🟢 Baja     | 2-4 horas       | ⏳ Pendiente |

---

## 🚀 Próximos Pasos

1. **Comenzar con Tarea #1** - La validación con IA es la mejora más impactante
2. **Conseguir API Key de Claude** - Requisito para empezar
3. **Definir presupuesto de API** - Estimar costos por estudiante
4. **Buscar/crear assets de audio** - Para Tarea #2
5. **Diseñar mockup del diploma** - Para Tarea #3

---

## 📝 Notas Adicionales

### Consideraciones para Validación con IA:

- **Costo:** Claude API tiene costo por token. Estimar ~$0.01-0.05 por evaluación
- **Privacidad:** No almacenar historias de estudiantes en servidores externos
- **Fallback:** Mantener sistema de auto-evaluación actual como respaldo
- **Idioma:** Configurar Claude para evaluar en español

### Consideraciones para Audio:

- **Tamaño:** Mantener archivos de audio pequeños (<500KB cada uno)
- **Formato:** Usar MP3 para compatibilidad universal
- **Accesibilidad:** Siempre permitir desactivar sonidos
- **Licencias:** Usar solo audio libre de derechos o con licencia apropiada

### Consideraciones para Diploma:

- **Impresión:** Diseñar pensando en impresión en blanco y negro también
- **Tamaño:** Formato A4 horizontal (landscape) es ideal
- **Personalización:** Permitir que el profesor agregue nombre de la escuela
- **Compartir:** Considerar privacidad al compartir en redes sociales

---

**Última actualización:** 2025-10-30
**Proyecto:** La Misión de las Palabras Mágicas
**Desarrollador:** Luis Gamez
