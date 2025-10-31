# 🔒 Sistema de Control de Acceso

Este documento explica cómo usar el sistema de bloqueo de la aplicación mediante variables de entorno.

## 📋 Descripción

La aplicación incluye un sistema de control de acceso que permite bloquear completamente el acceso mediante una variable de entorno. Esto es útil para:

- Control de pagos pendientes
- Mantenimiento programado
- Restricción temporal de acceso
- Gestión de acuerdos contractuales

## 🚀 Cómo Usar

### Bloquear la Aplicación

1. Abre el archivo `.env` en la raíz del proyecto
2. Cambia la variable `VITE_APP_LOCKED` a `true`:

```env
VITE_APP_LOCKED=true
```

3. Reinicia el servidor de desarrollo o reconstruye la aplicación:

```bash
# En desarrollo
npm run dev

# En producción
npm run build
```

4. La aplicación ahora mostrará la página de mantenimiento/bloqueo

### Desbloquear la Aplicación

1. Abre el archivo `.env`
2. Cambia la variable `VITE_APP_LOCKED` a `false` o elimínala:

```env
VITE_APP_LOCKED=false
```

3. Reinicia el servidor o reconstruye la aplicación

## 🎨 Página de Bloqueo

Cuando la aplicación está bloqueada, los usuarios verán:

- ✅ Mensaje profesional de acceso restringido
- ✅ Explicación clara de la situación
- ✅ Información de contacto del desarrollador
- ✅ Diseño atractivo y profesional
- ✅ Animaciones suaves

## 🔐 Seguridad

### Variables de Entorno en Producción

Para desplegar en producción con la aplicación bloqueada:

#### Vercel
```bash
vercel env add VITE_APP_LOCKED
# Ingresa: true
```

#### Netlify
En el dashboard de Netlify:
1. Ve a Site settings → Environment variables
2. Agrega: `VITE_APP_LOCKED` = `true`

#### Otras Plataformas
Consulta la documentación de tu plataforma de hosting para agregar variables de entorno.

## 📝 Notas Importantes

1. **Reinicio Requerido**: Después de cambiar la variable de entorno, SIEMPRE debes reiniciar el servidor o reconstruir la aplicación.

2. **Modo Desarrollo**: En modo desarrollo, la página de bloqueo muestra una nota técnica con instrucciones para desbloquear.

3. **Producción**: En producción, solo se muestra el mensaje profesional sin información técnica.

4. **Valores Válidos**:
   - `"true"` → Aplicación bloqueada
   - `"false"` o vacío → Aplicación desbloqueada
   - Cualquier otro valor → Aplicación desbloqueada

## 🛠️ Personalización

Si deseas personalizar el mensaje de bloqueo, edita el archivo:
```
src/components/MaintenancePage.tsx
```

Puedes modificar:
- Textos y mensajes
- Colores y estilos
- Información de contacto
- Animaciones

## 📧 Contacto

**Desarrollador**: Luis Gámez  
**Email**: gamezluis.dev@gmail.com  
**LinkedIn**: [Luis Eduardo Gámez Maldonado](https://www.linkedin.com/in/luis-eduardo-gamez-maldonado-aaa741215/)

---

## ⚠️ Advertencia Legal

Este sistema de bloqueo es una medida técnica de control de acceso. Asegúrate de que su uso esté respaldado por acuerdos contractuales apropiados y cumpla con las leyes aplicables en tu jurisdicción.

