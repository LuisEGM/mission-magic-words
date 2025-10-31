import React from "react";
import { Mail, Linkedin } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-6 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-300">
        <span className="font-medium">
          Developed with ❤️ by{" "}
          <span className="text-white font-semibold">Luis Gámez</span>
        </span>
        <span className="hidden sm:inline text-gray-500">•</span>
        <div className="flex items-center gap-4">
          <a
            href="mailto:gamezluis.dev@gmail.com"
            className="flex items-center gap-1.5 hover:text-white transition-colors duration-200 group"
            aria-label="Enviar correo a Luis Gámez"
          >
            <Mail
              size={16}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="hidden sm:inline">gamezluis.dev@gmail.com</span>
            <span className="sm:hidden">Email</span>
          </a>
          <span className="text-gray-500">•</span>
          <a
            href="https://www.linkedin.com/in/luis-eduardo-gamez-maldonado-aaa741215/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors duration-200 group"
            aria-label="Ver perfil de LinkedIn de Luis Gámez"
          >
            <Linkedin
              size={16}
              className="group-hover:scale-110 transition-transform"
            />
            <span>LinkedIn</span>
          </a>
          <span className="hidden sm:inline text-gray-500">•</span>
          <span className="font-medium">
            Powered by{" "}
            <span className="text-white font-semibold">Claude AI</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
