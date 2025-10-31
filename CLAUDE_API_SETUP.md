# 🤖 Configuración de Claude API para Validación con IA

Este documento explica cómo configurar la API de Claude (Anthropic) para habilitar la evaluación inteligente de historias en el Nivel 3 del juego.

## 📋 Requisitos Previos

- Cuenta en [Anthropic Console](https://console.anthropic.com/)
- Tarjeta de crédito para activar la API (se cobra por uso)
- Node.js 18+ instalado

## 🚀 Pasos para Configurar

### 1. Crear Cuenta en Anthropic

1. Ve a [https://console.anthropic.com/](https://console.anthropic.com/)
2. Crea una cuenta o inicia sesión
3. Completa el proceso de verificación

### 2. Obtener API Key

1. En el dashboard de Anthropic, ve a **API Keys**
2. Haz click en **Create Key**
3. Dale un nombre descriptivo (ej: "Mission Magic Words - Dev")
4. Copia la API key (solo se muestra una vez)

### 3. Configurar Variables de Entorno

1. En la raíz del proyecto, copia el archivo `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

2. Abre `.env.local` y pega tu API key:
   ```env
   VITE_ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxx
   ```

3. Guarda el archivo

### 4. Reiniciar el Servidor de Desarrollo

```bash
pnpm dev
```

## ✅ Verificar que Funciona

1. Inicia el juego y llega al Nivel 3
2. Escribe una historia
3. Haz click en "Revisar Historia"
4. Deberías ver el botón **"Evaluar con IA"** habilitado
5. Haz click y espera 10-20 segundos
6. Verás el feedback detallado de Claude

## 💰 Costos Estimados

La API de Claude cobra por tokens (palabras procesadas):

- **Modelo usado:** `claude-3-5-sonnet-20241022`
- **Costo aproximado:** $0.01 - $0.05 USD por evaluación
- **Tokens por evaluación:** ~1,500 - 2,500 tokens

### Ejemplo de Costos

| Evaluaciones | Costo Estimado |
|--------------|----------------|
| 10           | $0.10 - $0.50  |
| 50           | $0.50 - $2.50  |
| 100          | $1.00 - $5.00  |
| 1,000        | $10 - $50      |

**Nota:** Los costos son aproximados y pueden variar según la longitud de las historias.

## 🔒 Seguridad

### ⚠️ IMPORTANTE: No Subir la API Key a Git

El archivo `.env.local` está en `.gitignore` para evitar que se suba al repositorio.

**NUNCA** hagas lo siguiente:
- ❌ Subir `.env.local` a Git
- ❌ Compartir tu API key públicamente
- ❌ Hardcodear la API key en el código

### Producción

Para producción, configura la variable de entorno en tu plataforma de hosting:

**Netlify:**
```
Site settings → Environment variables → Add variable
Key: VITE_ANTHROPIC_API_KEY
Value: tu_api_key_aqui
```

**Vercel:**
```
Project Settings → Environment Variables → Add
Name: VITE_ANTHROPIC_API_KEY
Value: tu_api_key_aqui
```

## 🛠️ Troubleshooting

### Error: "API de Claude no configurada"

**Causa:** La API key no está configurada o es inválida.

**Solución:**
1. Verifica que `.env.local` existe
2. Verifica que la API key es correcta
3. Reinicia el servidor de desarrollo

### Error: "Error al validar la historia con IA"

**Causa:** Problema de conexión o límite de rate excedido.

**Solución:**
1. Verifica tu conexión a internet
2. Revisa tu saldo en Anthropic Console
3. Espera unos segundos y vuelve a intentar

### El botón "Evaluar con IA" no aparece

**Causa:** La API key no está configurada.

**Solución:**
1. Configura la API key en `.env.local`
2. Reinicia el servidor

## 📚 Recursos Adicionales

- [Documentación de Anthropic API](https://docs.anthropic.com/)
- [Pricing de Claude](https://www.anthropic.com/pricing)
- [SDK de TypeScript](https://github.com/anthropics/anthropic-sdk-typescript)
- [Console de Anthropic](https://console.anthropic.com/)

## 🎓 Modo Fallback (Sin API)

Si no configuras la API key, el juego seguirá funcionando con el sistema de evaluación básico:

- ✅ Cuenta palabras
- ✅ Detecta diálogos (básico)
- ✅ Verifica uso del banco de palabras
- ❌ No evalúa estructura narrativa
- ❌ No evalúa creatividad
- ❌ No da feedback personalizado

## 🤝 Soporte

Si tienes problemas con la configuración:

1. Revisa este documento
2. Verifica los logs en la consola del navegador
3. Contacta al desarrollador: luis.gamez@laguama.com

---

**Última actualización:** 2025-10-31
**Versión:** 1.0

