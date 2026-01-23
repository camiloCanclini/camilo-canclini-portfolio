// ============================================================
// EXTERNAL DEPENDENCIES
// ============================================================
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================
// TYPES
// ============================================================
type FormStatus = "idle" | "success" | "error";

type NeonMailPanelProps = {
  status?: FormStatus;
  iconAlt?: string;
};

// ============================================================
// CONSTANTS
// ============================================================
const ICON_SOURCES: Record<FormStatus, string> = {
  idle: "/resources/img/sections/contact_me/email.png",
  success: "/resources/img/sections/contact_me/email_success.png",
  error: "/resources/img/sections/contact_me/email_error.png",
};

/**
 * Color themes for each status state
 */
const COLOR_THEMES: Record<FormStatus, {
  gradient1: string;
  gradient2: string;
  radialGradient: string;
  floorGlow: string;
  dropShadow: string;
  halo: string;
}> = {
  idle: {
    gradient1: "bg-fuchsia-500/10",
    gradient2: "bg-cyan-400/10",
    radialGradient: "bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.10),transparent_55%)]",
    floorGlow: "radial-gradient(circle, rgba(120,200,255,0.55) 0%, rgba(120,200,255,0.15) 55%, rgba(0,0,0,0) 70%)",
    dropShadow: "drop-shadow-[0_0_18px_rgba(120,200,255,0.35)]",
    halo: "radial-gradient(circle, rgba(120,200,255,0.18) 0%, rgba(120,200,255,0.06) 35%, rgba(0,0,0,0) 70%)",
  },
  success: {
    gradient1: "bg-emerald-500/10",
    gradient2: "bg-green-400/10",
    radialGradient: "bg-[radial-gradient(circle_at_50%_40%,rgba(34,197,94,0.10),transparent_55%)]",
    floorGlow: "radial-gradient(circle, rgba(120,255,150,0.55) 0%, rgba(120,255,150,0.15) 55%, rgba(0,0,0,0) 70%)",
    dropShadow: "drop-shadow-[0_0_18px_rgba(120,255,150,0.35)]",
    halo: "radial-gradient(circle, rgba(120,255,150,0.18) 0%, rgba(120,255,150,0.06) 35%, rgba(0,0,0,0) 70%)",
  },
  error: {
    gradient1: "bg-red-500/10",
    gradient2: "bg-rose-400/10",
    radialGradient: "bg-[radial-gradient(circle_at_50%_40%,rgba(239,68,68,0.10),transparent_55%)]",
    floorGlow: "radial-gradient(circle, rgba(255,120,120,0.55) 0%, rgba(255,120,120,0.15) 55%, rgba(0,0,0,0) 70%)",
    dropShadow: "drop-shadow-[0_0_18px_rgba(255,120,120,0.35)]",
    halo: "radial-gradient(circle, rgba(255,120,120,0.18) 0%, rgba(255,120,120,0.06) 35%, rgba(0,0,0,0) 70%)",
  },
};

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
 * Icon transition - entrance and exit animation when status changes
 */
const iconTransition = {
  initial: { opacity: 0, scale: 0.8, rotateZ: -10 },
  animate: { opacity: 1, scale: 1.0, rotateZ: 0 },
  exit: { opacity: 0, scale: 0.8, rotateZ: 10 },
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
  status = "idle",
  iconAlt = "Email",
}) => {
  const currentIcon = ICON_SOURCES[status];
  const theme = COLOR_THEMES[status];
  return (
    <div className="relative h-full w-full flex justify-center overflow-hidden">
      {/* ============================================================ */}
      {/* BACKGROUND GRADIENTS */}
      {/* ============================================================ */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top gradient */}
        <div className={`absolute top-10 h-72 w-72 rounded-full ${theme.gradient1} blur-3xl transition-colors duration-500`} />
        
        {/* Bottom gradient */}
        <div className={`absolute bottom-10 h-72 w-72 rounded-full ${theme.gradient2} blur-3xl transition-colors duration-500`} />
        
        {/* Radial gradient overlay */}
        <div className={`absolute inset-0 ${theme.radialGradient} transition-all duration-500`} />
      </div>

      {/* ============================================================ */}
      {/* FLOOR GLOW EFFECT */}
      {/* ============================================================ */}
      {/* <motion.div
        className="pointer-events-none absolute bottom-8 h-10 w-[80%] -translate-x-1/2 rounded-full"
        style={{
          background: theme.floorGlow,
          filter: "blur(20px)",
        }}
        animate={floorGlowAnimation}
        transition={sharedTransition}
      />
    */}
      {/* ============================================================ */}
      {/* FLOOR SHADOW */}
      {/* ============================================================ */}
      <motion.div
        className="pointer-events-none absolute bottom-8 h-6 w-[85%] -translate-x-1/2 rounded-full dark:bg-black/70"
        style={{ filter: "blur(12px)" }}
        animate={shadowAnimation}
        transition={sharedTransition}
      />

      {/* ============================================================ */}
      {/* FLOATING EMAIL ICON */}
      {/* ============================================================ */}
      <AnimatePresence mode="wait">
        <motion.img
          key={status}
          src={currentIcon}
          alt={iconAlt}
          className={`absolute left-auto right-auto top-[35%] w-56 -translate-y-1/2 select-none ${theme.dropShadow}`}
          draggable={false}
          initial={iconTransition.initial}
          animate={[
            iconTransition.animate,
            iconFloatAnimation,
          ]}
          exit={iconTransition.exit}
          transition={{
            ...sharedTransition,
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
            rotateZ: { duration: 0.3 },
          }}
        />
      </AnimatePresence>

      {/* ============================================================ */}
      {/* AMBIENT HALO BEHIND ICON */}
      {/* ============================================================ */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: theme.halo,
          filter: "blur(18px)",
        }}
        animate={haloAnimation}
        transition={sharedTransition}
      />
    </div>
  );
};
