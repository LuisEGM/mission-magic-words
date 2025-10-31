# La Misión de las Palabras Mágicas 📚✨

Experiencia de gamificación educativa enfocada en comprensión lectora y escritura creativa para estudiantes de 6to grado.

## 🎮 Descripción del Juego

Los estudiantes asumen el rol de "Aprendices de Guardianes" que deben completar 3 niveles progresivos para recuperar 3 "Palabras Mágicas" robadas por el "Ladrón de Silencios", salvando así el mundo de las historias.

### Niveles

1. **El Bosque de las Letras Perdidas** - Comprensión lectora (6 preguntas, 100 puntos máx)
2. **El Puente de los Enigmas** - Acertijos y vocabulario (8 desafíos, 100 puntos máx)
3. **El Castillo de las Historias Infinitas** - Escritura creativa (100 puntos máx)

### Palabras Mágicas

- 🌟 **IMAGINACIÓN** (Nivel 1)
- ✨ **CREATIVIDAD** (Nivel 2)
- 💫 **VALENTÍA** (Nivel 3)

## 🛠️ Stack Tecnológico

- **Framework:** React 18+ con TypeScript
- **Estilos:** Tailwind CSS v4
- **State Management:** Zustand con persistencia
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Build Tool:** Vite
- **Extras:** html2canvas, jsPDF, canvas-confetti

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

El juego estará disponible en [http://localhost:5173/](http://localhost:5173/)

## 🎯 Características

- ✅ **Sin backend** - Todo funciona en el navegador
- ✅ **Persistencia local** - El progreso se guarda en localStorage
- ✅ **Responsive** - Funciona en desktop, tablet y móvil
- ✅ **Offline-capable** - Funciona sin conexión después de la primera carga
- ✅ **Animaciones fluidas** - Experiencia visual atractiva
- ✅ **Diploma descargable** - Los estudiantes pueden descargar su certificado en PDF
- ✅ **Auto-evaluación** - Sistema inteligente de evaluación de historias

## 🎨 Sistema de Puntuación

- **Total posible:** 300 puntos (100 por nivel)
- **Nivel 1:** Mínimo 65 puntos para avanzar (65%)
- **Nivel 2:** Mínimo 70 puntos para avanzar (70%)
- **Nivel 3:** Mínimo 70 puntos para avanzar (70%)

### Niveles de Guardián

- 🌟 **Guardián Experto:** 251-300 puntos (83-100%)
- ⭐ **Guardián Junior:** 201-250 puntos (67-83%)
- ✨ **Guardián Aprendiz:** 150-200 puntos (50-67%)

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── ui/              # Componentes base reutilizables
│   ├── layout/          # Componentes de layout
│   ├── level1/          # Componentes específicos del nivel 1
│   ├── level2/          # Componentes específicos del nivel 2
│   ├── level3/          # Componentes específicos del nivel 3
│   └── shared/          # Componentes compartidos
├── data/                # Datos del juego (historias, preguntas, etc.)
├── screens/             # Pantallas principales
├── store/               # Estado global (Zustand)
├── types/               # Definiciones de TypeScript
├── utils/               # Utilidades (análisis de texto, generador de diplomas)
├── App.tsx              # Componente principal
└── main.tsx             # Punto de entrada
```

## 🎓 Uso Educativo

### Para Profesores

1. Los estudiantes deben ingresar su nombre al inicio
2. Cada nivel tiene requisitos mínimos de estrellas
3. El nivel 3 evalúa automáticamente las historias basándose en:
   - Estructura narrativa (inicio, desarrollo, final)
   - Uso de vocabulario del banco de palabras
   - Presencia de diálogos
   - Creatividad
4. Al finalizar, los estudiantes pueden descargar su diploma en PDF

### Duración Estimada

- **Total:** 30-40 minutos
- **Nivel 1:** 10-12 minutos
- **Nivel 2:** 8-10 minutos
- **Nivel 3:** 15-18 minutos

## 🚀 Despliegue

### Netlify

```bash
npm run build
# Arrastrar la carpeta dist/ a Netlify
```

### Vercel

```bash
npm run build
vercel --prod
```

## 🔧 Personalización

### Cambiar contenido del juego

Edita los archivos en `src/data/`:

- `gameData.ts` - Configuración general
- `level1Data.ts` - Historia y preguntas del nivel 1
- `level2Data.ts` - Desafíos del nivel 2
- `level3Data.ts` - Configuración del nivel 3

### Ajustar requisitos

En `src/data/gameData.ts`:

```typescript
export const GAME_CONFIG: GameConfig = {
  minStarsLevel1: 65, // 65% de 100 puntos
  minStarsLevel2: 70, // 70% de 100 puntos
  minStarsLevel3: 70, // 70% de 100 puntos
  totalPossibleStars: 300, // 100 puntos por nivel
};
```

## 📱 Compatibilidad

- ✅ Chrome/Edge (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### El juego no guarda el progreso

- Verifica que localStorage esté habilitado en el navegador
- Revisa que no estés en modo incógnito

### Las imágenes no cargan

- Las URLs de inspiración usan Unsplash
- Asegúrate de tener conexión a internet para la primera carga

### Error al generar diploma

- Verifica que html2canvas y jsPDF estén instalados
- Algunos bloqueadores de anuncios pueden interferir

## 📝 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

## 🎉 Créditos

Desarrollado con Claude Code AI siguiendo especificaciones técnicas detalladas para educación gamificada.

---

**¡Que comience la aventura de salvar el mundo de las historias!** ✨📚🌟
