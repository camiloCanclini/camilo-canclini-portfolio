import React from "react";
import { motion, Variants } from "framer-motion";
import type { ProjectCardInterface } from "./ProjectCard";




type Props = {
  project: ProjectCardInterface;
  index: number;
  hoverEnabled: boolean;
};

// ===== Variants Framer Motion =====

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

const titleVariants: Variants = {
  rest: { y: 60 },
  hover: {
    y: 0,
    transition: { duration: 0.25 },
  },
};

const descriptionVariants: Variants = {
  rest: {
    opacity: 0,
    y: 0,
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};

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

const ProjectParallaxCard: React.FC<Props> = ({ project, hoverEnabled }) => {


  const mainTech = project.technologies?.[0];
  const secondaryTechs = project.technologies?.slice(1) ?? [];
  const mainLink = project.liveDemoLink || project.repoLink || undefined;

  const CardContent = (
    <motion.div
      className={[
        "group relative h-full w-full rounded-[1.8rem]",
        "overflow-hidden",
        "bg-slate-900/80",
        "cursor-pointer",
      ].join(" ")}
      variants={cardVariants}
      initial="rest"
      animate="rest"
      whileHover={hoverEnabled ? "hover" : undefined}
    >
      {/* Fondo: screenshot del proyecto */}
      <img
        src={project.placeholderImage}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover overlay-blend-multiply brightness-75"
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
        <motion.div
          className={[
            "w-full px-6 pb-5 pt-10 z-10 absolute h-full",
            "origin-bottom",
          ].join(" ")}
          variants={overlayVariants}
        ></motion.div>

        <div className="w-full px-6 pb-5 pt-10 z-20">
          {/* Título + descripción */}
          <div className="space-y-2 mb-4 min-h-[120px]">
            {/* Título con glow */}
            <motion.h3
              className={[
                "text-[2.4em] font-semibold tracking-wide",
                // theme.mainTextColor,
                "text-white",
                "drop-shadow-[0_0_5px_rgba(255,255,255,0.85)]",
              ].join(" ")}
              variants={titleVariants}
            >
              {project.title}
            </motion.h3>

            {/* Descripción corta (aparece en hover) */}
            <motion.p
              className={[
                "text-[1.3em] text-gray-200/90 max-w-sm",
                //"line-clamp-2",
              ].join(" ")}
              variants={descriptionVariants}
            >
              {project.description}
            </motion.p>
          </div>

          {/* Footer: tecnologías + año */}
          <div className="mt-4 flex items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Tech principal con glow siempre visible */}
              {mainTech && (
                <div className="flex items-center gap-2">
                  <img src={mainTech.icon} alt={mainTech.title} className={[
                      mainTech.color,
                      "text-white text-[1.2em] drop-shadow-[0_0_3px_rgba(255,255,255,0.5)] w-12 h-12 object-contain grayscale brightness-0 invert",
                    ].join(" ")}
                    aria-hidden="true"></img>
                </div>
              )}

              {/* Otras tecnologías: aparecen en hover */}
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
                        "text-white text-[1.05em] mr-1 drop-shadow-[0_0_3px_rgba(255,255,255,0.5)] w-6 h-6 object-contain grayscale brightness-0 invert",
                      ].join(" ")}
                      variants={iconVariants}
                    />
                  ))}
                </motion.div>
              )}
            </div>

            {/* Año */}
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

  if (mainLink) {
    return (
      <a href={mainLink} target="_blank" rel="noopener noreferrer" 
      onClick={(e) => {
        if(!hoverEnabled){
          e.preventDefault();
          e.stopPropagation(); // opcional
        }
      }}>
        {CardContent}
      </a>
    );
  }

  return CardContent;
};

export default ProjectParallaxCard;
