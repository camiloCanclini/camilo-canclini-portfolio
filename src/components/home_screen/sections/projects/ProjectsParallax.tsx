import "./Projects.css";

import { useEffect, useMemo, useRef, useState } from "react";
import { useThemeContext } from "@/providers/ThemeContext";
import ProjectParallaxCard from "./project_card/ProjectParallaxCard";
import type { ProjectCardInterface } from "./project_card/ProjectCard";
import jsonData from "@config_files/projects.json";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function ProjectsParallax() {
  const { theme } = useThemeContext();
  const [projects, setProjects] = useState<ProjectCardInterface[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setProjects(jsonData);
  }, []);

  // ---- SCROLL / PARALLAX ----
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Igual que el HeroParallax: 0 cuando el top de la sección toca el top del viewport,
    // 1 cuando el bottom toca el top del viewport.
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 260, damping: 26, bounce: 0.2 };

  // FASE HERO (0 → 0.2): inclinación, rotación, aparición
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-55, 0]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-25, 0]),
    springConfig
  );
  const translateYHero = useSpring(
    // las cards arrancan "más atrás/arriba" y se acercan a su posición normal
    useTransform(scrollYProgress, [0, 0.2], [-1000, 700]),
    springConfig
  );
  const translateXHero = useSpring(
    // las cards arrancan "más atrás/arriba" y se acercan a su posición normal
    useTransform(scrollYProgress, [0, 0.2], [300, 0]),
    springConfig
  );

  const opacityHero = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.1, 1]),
    springConfig
  );

  // FASE PARALLAX GRID (0.3 → 1): columnas se empiezan a desplazar en Y
  const yColumnLeft = useSpring(
    useTransform(scrollYProgress, [0, 0.1, 1], [0, 0, -200]),
    springConfig
  );
  const yColumnRight = useSpring(
    useTransform(scrollYProgress, [0, 0.1, 1], [0, 0, 200]),
    springConfig
  );

  // ---- Distribuir proyectos en 2 columnas ----
  const columns = useMemo(() => {
    const cols: ProjectCardInterface[][] = [[], []];
    projects.forEach((project, index) => {
      cols[index % 2].push(project);
    });
    return cols;
  }, [projects]);

  return (
    <section
      id="projects_section"
      ref={containerRef}
      className={[
        "relative py-48 flex justify-center",
        // importante para el 3D del hero
        "overflow-visible md:overflow-hidden",
        "[perspective:1200px] [transform-style:preserve-3d]",
      ].join(" ")}
      style={{ boxShadow: "inset 0px 0px 50px 2px #0008" }}
    >
      {/* Fondo */}
      <div className="grid-background absolute inset-0" />

      <div className="relative z-10 w-11/12 max-w-6xl mx-auto">
        {/* HEADER tipo hero */}
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 px-2 md:px-4"
        >
          <div className={`${theme.mainTextColor} ${theme.titlesSectionSize}`}>
            Projects
          </div>
          <p className={`text-4xl pt-4 pl-1 md:pl-6 ${theme.mainTextColor}`}>
            Here are some of the things I&apos;ve been building...
          </p>
        </motion.header>

        {/* CONTENEDOR 3D: primero hero, luego se acomoda y arranca parallax */}
        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateX: translateXHero,
            translateY: translateYHero,
            opacity: opacityHero,
          }}
          className="hidden md:block"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="grid grid-cols-2 gap-8 md:gap-10"
          >
            {/* COLUMNA IZQUIERDA */}
            <motion.div
              style={{ y: yColumnLeft }}
              className="flex flex-col gap-8 pb-32"
            >
              {columns[0].map((project, index) => (
                <div
                  key={project.title + index}
                  className="h-[460px] lg:h-[700px]"
                >
                  <ProjectParallaxCard project={project} index={index} />
                </div>
              ))}
            </motion.div>

            {/* COLUMNA DERECHA */}
            <motion.div
              style={{ y: yColumnRight }}
              className="flex flex-col gap-8 pb-32"
            >
              {columns[1].map((project, index) => (
                <div
                  key={project.title + index}
                  className="h-[260px] lg:h-[700px]"
                >
                  <ProjectParallaxCard project={project} index={index} />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* MOBILE: stack simple sin locuras */}
        <div className="md:hidden flex flex-col gap-6">
          {projects.map((project, index) => (
            <div key={project.title + index} className="h-[260px]">
              <ProjectParallaxCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsParallax;
