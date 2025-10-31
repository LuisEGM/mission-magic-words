import React from "react";
import { motion } from "framer-motion";
import { Lock, Mail, AlertCircle } from "lucide-react";

export const MaintenancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        {/* Card principal */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 md:p-12">
          {/* Icono de bloqueo animado */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-red-500/30 rounded-full blur-xl"
              />
              <div className="relative bg-gradient-to-br from-red-500 to-orange-600 p-6 rounded-full">
                <Lock className="text-white" size={48} />
              </div>
            </div>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
          >
            Acceso Restringido
          </motion.h1>

          {/* Mensaje principal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4 mb-8"
          >
            <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <AlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
              <div className="text-gray-200">
                <p className="font-semibold text-yellow-300 mb-1">
                  Aplicación Temporalmente Bloqueada
                </p>
                <p className="text-sm leading-relaxed">
                  Esta aplicación se encuentra actualmente restringida debido a
                  asuntos administrativos pendientes. El acceso será
                  restablecido una vez que se resuelvan los términos acordados.
                </p>
              </div>
            </div>

            <p className="text-gray-300 text-center leading-relaxed">
              Si eres el administrador o tienes preguntas sobre el acceso,
              por favor contacta al desarrollador.
            </p>
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white/5 rounded-lg p-6 border border-white/10"
          >
            <h2 className="text-lg font-semibold text-white mb-4 text-center">
              Información de Contacto
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <Mail size={18} className="text-blue-400" />
                <a
                  href="mailto:gamezluis.dev@gmail.com"
                  className="hover:text-white transition-colors underline"
                >
                  gamezluis.dev@gmail.com
                </a>
              </div>
              <p className="text-sm text-gray-400 text-center">
                Desarrollador: <span className="text-white font-medium">Luis Gámez</span>
              </p>
            </div>
          </motion.div>

          {/* Nota técnica (solo visible en desarrollo) */}
          {import.meta.env.DEV && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg"
            >
              <p className="text-xs text-blue-300 text-center">
                <strong>Nota de desarrollo:</strong> Para desbloquear la aplicación,
                establece <code className="bg-black/30 px-2 py-0.5 rounded">VITE_APP_LOCKED=false</code> en
                tu archivo <code className="bg-black/30 px-2 py-0.5 rounded">.env</code>
              </p>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-center text-gray-400 text-sm"
        >
          <p>© {new Date().getFullYear()} La Misión de las Palabras Mágicas</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

