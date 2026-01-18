// ============================================================
// EXTERNAL DEPENDENCIES
// ============================================================
import React from "react";
import { motion } from "framer-motion";

// ============================================================
// TYPES
// ============================================================
type NeonMailPanelProps = {
  iconAlt?: string;
};

// ============================================================
// CONSTANTS
// ============================================================
const ICON_SRC = "/resources/img/sections/contact_me/email.png";
const ANIMATION_DURATION = 4.5;

// ============================================================
// ANIMATION VARIANTS
// ============================================================
/**
 * Floor glow effect - pulses and scales to simulate landing impact
 */
const floorGlowAnimation = {
  opacity: [0.15, 0.8, 0.15],
  scaleX: [0.85, 1.1, 0.85],
  scaleY: [0.9, 1.0, 0.9],
};

/**
 * Shadow effect - subtle opacity and scale changes for realism
 */
const shadowAnimation = {
  opacity: [0.25, 0.55, 0.25],
  scaleX: [0.9, 1.05, 0.9],
};

/**
 * Floating icon - smooth vertical movement with rotation and scale
 */
const iconFloatAnimation = {
  y: [-22, 22, -22],
  rotateZ: [-1.5, 1.5, -1.5],
  scale: [1.0, 1.02, 1.0],
};

/**
 * Background halo - ambient glow behind icon
 */
const haloAnimation = {
  opacity: [0.35, 0.55, 0.35],
  scale: [0.98, 1.03, 0.98],
};

/**
 * Shared transition configuration for all animations
 */
const sharedTransition = {
  duration: ANIMATION_DURATION,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export const NeonMailPanel: React.FC<NeonMailPanelProps> = ({
  iconAlt = "Email",
}) => {
  return (
    <div className="relative h-full w-full flex justify-center overflow-hidden">
      {/* ============================================================ */}
      {/* BACKGROUND GRADIENTS */}
      {/* ============================================================ */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top fuchsia gradient */}
        <div className="absolute top-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        
        {/* Bottom cyan gradient */}
        <div className="absolute bottom-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        
        {/* Radial blue gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.10),transparent_55%)]" />
      </div>

      {/* ============================================================ */}
      {/* FLOOR GLOW EFFECT */}
      {/* ============================================================ */}
      <motion.div
        className="pointer-events-none absolute bottom-8 h-10 w-[80%] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(120,200,255,0.55) 0%, rgba(120,200,255,0.15) 55%, rgba(0,0,0,0) 70%)",
          filter: "blur(10px)",
        }}
        animate={floorGlowAnimation}
        transition={sharedTransition}
      />

      {/* ============================================================ */}
      {/* FLOOR SHADOW */}
      {/* ============================================================ */}
      <motion.div
        className="pointer-events-none absolute bottom-8 h-6 w-[85%] -translate-x-1/2 rounded-full bg-black/70"
        style={{ filter: "blur(12px)" }}
        animate={shadowAnimation}
        transition={sharedTransition}
      />

      {/* ============================================================ */}
      {/* FLOATING EMAIL ICON */}
      {/* ============================================================ */}
      <motion.img
        src={ICON_SRC}
        alt={iconAlt}
        className="absolute left-auto right-auto top-[35%] w-56 -translate-y-1/2 select-none drop-shadow-[0_0_18px_rgba(120,200,255,0.35)]"
        draggable={false}
        animate={iconFloatAnimation}
        transition={sharedTransition}
      />

      {/* ============================================================ */}
      {/* AMBIENT HALO BEHIND ICON */}
      {/* ============================================================ */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(120,200,255,0.18) 0%, rgba(120,200,255,0.06) 35%, rgba(0,0,0,0) 70%)",
          filter: "blur(18px)",
        }}
        animate={haloAnimation}
        transition={sharedTransition}
      />
    </div>
  );
};
