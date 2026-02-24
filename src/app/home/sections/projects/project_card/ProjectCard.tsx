// ============================================================
// IMPORTS - External libraries
// ============================================================
import React from "react";
import { easeIn, motion, Variants } from "framer-motion";

// ============================================================
// IMPORTS - Internal components
// ============================================================

// ============================================================
// LANGUAGE & CONTENT
// ============================================================

import { getLanguageTexts, Locale } from "@src/i18n/pageInfo";
import { useLang } from "@src/providers/LanguageProvider";


// ============================================================
// TYPE DEFINITIONS - Project Card
// ============================================================
// Type definitions based on projects.json structure

export type Technology = {
  icon: string;
  title: string;
  color: string;
};

export type ProjectCardInterface = {
  texts: Record<Locale, {
    title: string;
    description: string;
  }>;
  technologies: Technology[];
  liveDemoLink?: string;
  repoLink?: string;
  placeholderImage: string;
  images: string[];
  year?: string;
  imageClassName?: string;
};

// ============================================================
// TYPES
// ============================================================
type ProjectCardProps = {
  project: ProjectCardInterface;
  index: number;
  hoverEnabled: boolean;
  mobileMode: boolean;
};

// ============================================================
// ANIMATION VARIANTS
// ============================================================

// Main card animation - lift and glow on hover
const cardVariants: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.6,
    },
  },
  hover: {
    y: -12,
    boxShadow: "0 0px 10px 4px rgba(255,255,255,1)",
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.4,
    },
  },
};

// Border glow effect
const glowBorderVariants: Variants = {
  rest: {
    opacity: 0,
    borderColor: "rgba(255,255,255,0)",
    boxShadow: "0 0 4px rgba(255,255,255,0)",
  },
  hover: {
    opacity: 1,
    borderColor: "rgba(255,255,255,0.7)",
    boxShadow: "0 0 5px 2px rgba(255,255,255,0.9)",
    transition: { duration: 0.5 },
  },
};

// Bottom overlay expansion
const overlayVariants: Variants = {
  rest: {
    scaleY: 0.8,
    background: " linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6), transparent)",
  },
  hover: {
    scaleY: 1,
    background: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.9), transparent)",
    transition: { duration: 0.5 },
  },
};

// Title slide up animation
const titleVariants: Variants = {
  rest: {
    y: 30,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  hover: {
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

// Description fade in
const descriptionVariants: Variants = {
  rest: {
    opacity: 0,
    y: 0,
    height: 20,
  },
  hover: {
    opacity: 1,
    y: 0,
    height: 140,
    transition: {
      opacity: { duration: 0.7, delay: 0.5, ease: "easeInOut" },
      height: { duration: 0.3, ease: "easeInOut" },
    },
  },
};

// Secondary technologies reveal
const secondaryTechVariants: Variants = {
  rest: {
    opacity: 0,
    y: 6,
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      staggerChildren: 0.25,
    },
  },
};

// Individual tech icon animation
const iconVariants: Variants = {
  rest: {
    opacity: 0,
    x: 20,
  },
  hover: {
    opacity: 1,
    x: 0,
  },
};

// ============================================================
// MAIN COMPONENT - Project Card
// ============================================================
export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  hoverEnabled,
  mobileMode = false
}) => {

  // ============================================================
  // TEXTS CONTENT (LANG BASED)
  // ============================================================
  const { locale } = useLang();

  // ============================================================
  // COMPUTED VALUES
  // ============================================================
  const mainTech = project.technologies?.[0];
  const secondaryTechs = project.technologies?.slice(1) ?? [];
  const mainLink = project.liveDemoLink || project.repoLink || undefined;

  // ============================================================
  // CARD CONTENT
  // ============================================================
  const CardContent = (
    <motion.div
      className={[
        "group relative h-full w-full rounded-[1.8rem]",
        "overflow-hidden",
        "bg-slate-900/80",
        (hoverEnabled ? "cursor-pointer" : ""),
      ].join(" ")}
      variants={cardVariants}
      initial="rest"
      animate={mobileMode ? "hover" : "rest"}
      whileHover={hoverEnabled ? "hover" : undefined}
    >
      {/* Fondo: screenshot del proyecto */}
      <img
        src={project.placeholderImage}
        alt={getLanguageTexts(project.texts, locale).title}
        className={"absolute inset-0 w-full h-full object-cover overlay-blend-multiply brightness-75 " + project.imageClassName}
      />

      {/* Capa de “bevel & emboss” */}
      <div
        className={[
          "pointer-events-none absolute inset-px rounded-[1.7rem]",
          "border border-white/10",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-15px_40px_rgba(0,0,0,1)]",
          "bg-gradient-to-br from-white/10 via-transparent to-black/60",
          "mix-blend-screen",
        ].join(" ")}
      />

      {/* Borde glow controlado por Framer */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[1.8rem]"
        variants={glowBorderVariants}
      />

      {/* Overlay inferior que “sube” */}
      <div className="absolute inset-0 flex items-end rounded-[1.8rem] overflow-hidden">
        {/* Expanding dark gradient */}
        <motion.div
          className={[
            "w-full px-6 pb-5 pt-10 z-10 absolute h-full",
            "origin-bottom",
          ].join(" ")}
          variants={overlayVariants}
        />

        {/* Card content */}
        <div className="w-full px-6 pb-5 pt-10 z-20">
          {/* Title and description section */}
          <div className="space-y-2 mb-4 min-h-[120px]">
            {/* Project title with glow */}
            <motion.h3
              className={[
                "text-[1.4em] lg:text-[2em] font-semibold tracking-wide",
                "text-white",
                "drop-shadow-[0_0_5px_rgba(255,255,255,0.85)]",
              ].join(" ")}
              variants={titleVariants}
            >
              {getLanguageTexts(project.texts, locale).title}
            </motion.h3>

            {/* Project description (appears on hover) */}
            <motion.p
              className="text-[1.3em] text-gray-200/90 max-w-sm overflow-hidden"
              variants={descriptionVariants}
            >
              {getLanguageTexts(project.texts, locale).description}
            </motion.p>
          </div>

          {/* Footer: Technologies and year */}
          <div className="mt-4 flex items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Main technology - always visible with glow */}
              {mainTech && (
                <div className="flex items-center gap-2">
                  <img
                    src={mainTech.icon}
                    alt={mainTech.title}
                    className={[
                      mainTech.color,
                      "text-white text-[1em] drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]",
                      "w-8 lg:w-12 h-8 lg:h-12 object-contain grayscale brightness-0 invert",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                </div>
              )}

              {/* Secondary technologies - appear on hover */}
              {secondaryTechs.length > 0 && (
                <motion.div
                  className="flex items-center gap-2"
                  variants={secondaryTechVariants}
                >
                  {secondaryTechs.map((tech, idx) => (
                    <motion.img
                      key={tech.title + idx}
                      src={tech.icon}
                      alt={tech.title}
                      title={tech.title}
                      aria-hidden="true"
                      className={[
                        tech.color,
                        "text-white text-[1.05em] mr-1 drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]",
                        "w-6 h-6 object-contain grayscale brightness-0 invert",
                      ].join(" ")}
                      variants={iconVariants}
                    />
                  ))}
                </motion.div>
              )}
            </div>

            {/* Project year badge */}
            {project.year && (
              <span className="text-xs sm:text-sm font-semibold text-gray-100/90">
                {project.year}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  // ============================================================
  // RENDER - Wrap with link if available
  // ============================================================
  if (mainLink) {
    return (
      <a
        href={mainLink}
        target="_blank"
        rel="noopener noreferrer"
        className={hoverEnabled ? "" : "cursor-default"}
        onClick={(e) => {
          if (!hoverEnabled) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        {CardContent}
      </a>
    );
  }

  return CardContent;
};