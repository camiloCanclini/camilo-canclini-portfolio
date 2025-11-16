// src/components/sections/projects/project_card/ProjectParallaxCard.tsx

import React from "react";
import { useThemeContext } from "@/providers/ThemeContext";
import { ProjectCardInterface } from "./ProjectCard"; // reutilizamos la interfaz

type Props = {
  project: ProjectCardInterface;
  index: number;
};

const ProjectParallaxCard: React.FC<Props> = ({ project }) => {
  const { theme } = useThemeContext();

  // Tomamos la primera tecnología como “principal”
  const mainTech = project.technologies?.[0];

  // Si tenés demo, hago que toda la tarjeta sea link; si no, uso el repo.
  const mainLink = project.liveDemoLink || project.repoLink || undefined;

  const CardContent = (
    <div
      className={[
        "group relative w-full h-full rounded-2xl overflow-hidden",
        "bg-black/60 border border-white/10",
        "shadow-lg shadow-black/40",
        "transition-transform duration-300",
        "hover:scale-[1.02] hover:-translate-y-4",
      ].join(" ")}
    >
      {/* Imagen base */}
      <img
        src={project.placeholderImage}
        alt={project.title}
        className="w-full h-full object-cover"
      />

      {/* Overlay gradiente + contenido (aparece en hover) */}
      <div
        className={[
          "absolute inset-0",
          "bg-gradient-to-t from-black via-black/70 to-transparent",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-300 ease-out",
          "flex flex-col justify-end",
          "p-6 sm:p-7",
        ].join(" ")}
      >
        {/* Título + descripción */}
        <div>
          <h3
            className={[
              "text-2xl sm:text-3xl font-semibold",
              "text-white",
            ].join(" ")}
          >
            {project.title}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-gray-200 max-w-xs">
            {project.description}
          </p>
        </div>

        {/* Footer: tecnología principal + año */}
        <div className="mt-6 flex items-end justify-between text-white">
          <div className="flex items-center gap-2">
            {mainTech && (
              <>
                <i
                  className={[
                    mainTech.icon,
                    mainTech.color,
                    "text-lg sm:text-xl",
                  ].join(" ")}
                  aria-hidden="true"
                ></i>
                <span className="text-xs sm:text-sm uppercase tracking-wide">
                  {mainTech.title}
                </span>
              </>
            )}
          </div>
          {project.year && (
            <span className="text-xs sm:text-sm font-medium">
              {project.year}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  // Si hay link, que la card completa sea clickeable
  if (mainLink) {
    return (
      <a
        href={mainLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {CardContent}
      </a>
    );
  }

  return <div className="h-full">{CardContent}</div>;
};

export default ProjectParallaxCard;
