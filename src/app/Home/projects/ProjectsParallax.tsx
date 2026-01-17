"use client";

import "./Projects.css";
import { useMemo, useRef, useState, useLayoutEffect } from "react";
import ProjectParallaxCard from "./project_card/ProjectParallaxCard";
import type { ProjectCardInterface } from "./project_card/ProjectCard";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";

export default function ProjectsParallax({ data }: { data: ProjectCardInterface[] }) {

  const projects = data;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const refProjectsContainer = useRef<HTMLDivElement | null>(null);

  // en SSR arranca "auto", en cliente se ajusta luego
  const [heightProjectContainer, setHeightProjectContainer] = useState<string | number>("auto");
  const [hoverEnabled, setHoverEnabled] = useState(false);

  useLayoutEffect(() => {
    if (!refProjectsContainer.current) return;
    const contentHeight = refProjectsContainer.current.scrollHeight;
    setHeightProjectContainer(contentHeight + 500);
  }, [projects]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 260, damping: 26, bounce: 0.2 };
  const rotateZLimit = 0.1;

  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.1], [-55, 0]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, rotateZLimit], [-25, 0]), springConfig);

  const translateYHero = useSpring(useTransform(scrollYProgress, [0, 0.1], [-1100, 300]), springConfig);
  const translateXHero = useSpring(useTransform(scrollYProgress, [0, 0.1], [300, 0]), springConfig);
  const opacityHero = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.1, 1]), springConfig);

  const yColumnLeft = useSpring(useTransform(scrollYProgress, [0, 0.1, 1], [0, 0, -200]), springConfig);
  const yColumnRight = useSpring(useTransform(scrollYProgress, [0, 0.1, 1], [0, 0, 200]), springConfig);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setHoverEnabled(v >= rotateZLimit);
  });

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
        "overflow-visible md:overflow-hidden",
        "[perspective:1200px] [transform-style:preserve-3d]",
      ].join(" ")}
      style={{ boxShadow: "inset 0px 0px 50px 2px #0008" }}
    >
      <div className="grid-background absolute inset-0" />

      <div className="relative z-10 w-11/12 max-w-6xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 px-2 md:px-4"
        >
          <div className={`text-theme-primary bg-theme-bg dark:text-themedark-primary dark:bg-themedark-bg`}>Projects</div>
          <p className={`text-4xl pt-4 pl-1 md:pl-6 text-theme-primary dark:text-themedark-primary`}>
            Here are some of the things I&apos;ve been building...
          </p>
        </motion.header>

        <motion.div
          ref={refProjectsContainer}
          className="hidden md:block"
          style={{
            rotateX,
            rotateZ,
            translateX: translateXHero,
            translateY: translateYHero,
            opacity: opacityHero,
            height: heightProjectContainer, // SSR: auto, Client: number
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="grid grid-cols-2 gap-8 md:gap-10"
          >
            <motion.div style={{ y: yColumnLeft }} className="flex flex-col gap-8 pb-32">
              {columns[0].map((project, index) => (
                <div key={project.title + index} className="h-[460px] lg:h-[700px]">
                  <ProjectParallaxCard project={project} hoverEnabled={hoverEnabled} index={index} />
                </div>
              ))}
            </motion.div>

            <motion.div style={{ y: yColumnRight }} className="flex flex-col gap-8 pb-32">
              {columns[1].map((project, index) => (
                <div key={project.title + index} className="h-[260px] lg:h-[700px]">
                  <ProjectParallaxCard project={project} hoverEnabled={hoverEnabled} index={index} />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="md:hidden flex flex-col gap-6">
          {projects.map((project, index) => (
            <div key={project.title + index} className="h-[260px]">
              <ProjectParallaxCard project={project} hoverEnabled={hoverEnabled} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
