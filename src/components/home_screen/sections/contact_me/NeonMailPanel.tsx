import React from "react";
import { motion } from "framer-motion";
import iconSrc from "/public/resources/img/sections/contact_me/email.png";

type NeonMailPanelProps = {
  iconAlt?: string;
};

export const NeonMailPanel: React.FC<NeonMailPanelProps> = ({
  iconAlt = "Email",
}) => {
  const DURATION = 4.5;

  return (
    <div className="relative h-full w-full flex justify-center overflow-hidden">
      {/* Fondo: gradientes sutiles tipo neon */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.10),transparent_55%)]" />
      </div>

      {/* Glow del piso (se prende al “bajar”) */}
      <motion.div
        className="pointer-events-none absolute bottom-8 h-10 w-[80%] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(120,200,255,0.55) 0%, rgba(120,200,255,0.15) 55%, rgba(0,0,0,0) 70%)",
          filter: "blur(10px)",
        }}
        animate={{
          opacity: [0.15, 0.8, 0.15],
          scaleX: [0.85, 1.1, 0.85],
          scaleY: [0.9, 1.0, 0.9],
        }}
        transition={{
          duration: DURATION,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* “Sombra” más marcada (opcional, da más realismo) */}
      <motion.div
        className="pointer-events-none absolute bottom-8 h-6 w-[85%] -translate-x-1/2 rounded-full bg-black/70"
        style={{ filter: "blur(12px)" }}
        animate={{
          opacity: [0.25, 0.55, 0.25],
          scaleX: [0.9, 1.05, 0.9],
        }}
        transition={{
          duration: DURATION,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Icono flotando */}
      <motion.img
        src={iconSrc}
        alt={iconAlt}
        className="absolute left-auto right-auto top-[35%] w-56 -translate-y-1/2 select-none drop-shadow-[0_0_18px_rgba(120,200,255,0.35)]"
        draggable={false}
        animate={{
          y: [-22, 22, -22],
          rotateZ: [-1.5, 1.5, -1.5],
          scale: [1.0, 1.02, 1.0],
        }}
        transition={{
          duration: DURATION,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Brillito ambiente (halo atrás del icono) */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(120,200,255,0.18) 0%, rgba(120,200,255,0.06) 35%, rgba(0,0,0,0) 70%)",
          filter: "blur(18px)",
        }}
        animate={{
          opacity: [0.35, 0.55, 0.35],
          scale: [0.98, 1.03, 0.98],
        }}
        transition={{
          duration: DURATION,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
