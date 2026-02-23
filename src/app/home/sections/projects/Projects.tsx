"use client";

// ============================================================
// IMPORTS - Styles
// ============================================================
import "./Projects.css";

// ============================================================
// LANGUAGE & CONTENT
// ============================================================

import { getSectionText } from "@src/i18n/pageInfo";
import { useLang } from "@src/providers/LanguageProvider";

// ============================================================
// IMPORTS - External libraries
// ============================================================
import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

// ============================================================
// IMPORTS - Internal components
// ============================================================
import { SectionHeading } from "@ui/barrel_files/components";
import { ProjectCard, ProjectCardInterface } from "./project_card/ProjectCard";

// ============================================================
// TYPES
// ============================================================
type ProjectsProps = {
  data: ProjectCardInterface[];
};

// ============================================================
// MAIN COMPONENT - Projects Section
// ============================================================
export default function Projects({ data }: ProjectsProps) {

  // ============================================================
  // TEXTS CONTENT (LANG BASED)
  // ============================================================
  const { locale } = useLang();
  const content = getSectionText("projects", locale);

  // ============================================================
  // STATE & REFS
  // ============================================================
  const projects = data;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const refProjectsContainer = useRef<HTMLDivElement | null>(null);
  const [hoverEnabled, setHoverEnabled] = useState(false);

  // ============================================================
  // SCROLL ANIMATIONS
  // ============================================================
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Spring animation configuration
  const springConfig = { stiffness: 260, damping: 26, bounce: 0.2 };
  const rotateZLimit = 0.1;

  // 3D rotation animations
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.1], [-65, 0]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, rotateZLimit], [-25, 0]), springConfig);

  // Hero entrance animations
  const translateYHero = useSpring(useTransform(scrollYProgress, [0, 0.1], [-1700, 300]), springConfig);
  const translateXHero = useSpring(useTransform(scrollYProgress, [0, 0.1], [500, 0]), springConfig);
  const opacityHero = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.1, 1]), springConfig);

  // Column parallax animations
  const yColumnLeft = useSpring(useTransform(scrollYProgress, [0, 0.1, 1], [0, 0, -200]), springConfig);
  const yColumnRight = useSpring(useTransform(scrollYProgress, [0, 0.1, 1], [0, 0, 200]), springConfig);

  // Enable hover when scroll reaches threshold
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setHoverEnabled(v >= rotateZLimit);
  });

  // ============================================================
  // COMPUTED VALUES
  // ============================================================
  // Split projects into two columns for masonry layout
  const columns = useMemo(() => {
    const cols: ProjectCardInterface[][] = [[], []];
    projects.forEach((project, index) => {
      cols[index % 2].push(project);
    });
    return cols;
  }, [projects]);

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <section
      id="projects_section"
      ref={containerRef}
      className={[
        "relative py-48 pb-[70vh] flex justify-center",
        "overflow-visible lg:overflow-hidden",
        "[perspective:1200px] [transform-style:preserve-3d]",
      ].join(" ")}
      style={{ boxShadow: "inset 0px 0px 50px 2px #0008" }}
    >
      {/* Background grid pattern */}
      <div className="grid-background absolute inset-0 invert dark:invert-0" />

      <div className="relative z-10 w-11/12 max-w-6xl mx-auto ">
        {/* Section heading with fade-in animation */}
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 px-2 lg:px-4"
        >
          <SectionHeading heading={content!.title || "Projects"} subheading={content!.subtitle.toString() || "Here are some of the things I've been building..."} />
        </motion.header>

        {/* Desktop: 3D perspective grid with parallax columns */}
        <motion.div
          ref={refProjectsContainer}
          className="hidden lg:block"
          style={{
            rotateX,
            rotateZ,
            translateX: translateXHero,
            translateY: translateYHero,
            opacity: opacityHero,
          }}
        >
          <motion.div
            initial={{ opacity: 1, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="grid grid-cols-2 gap-8 lg:gap-10"
          >
            {/* Left column with upward parallax */}
            <motion.div style={{ y: yColumnLeft }} className="flex flex-col gap-8 pb-32">
              {columns[0].map((project, index) => (
                <div key={"PROJECT_CARD_INDEX_" + index} className="h-[460px] lg:h-[700px]">
                  <ProjectCard project={project} hoverEnabled={hoverEnabled} index={index} />
                </div>
              ))}
            </motion.div>

            {/* Right column with downward parallax */}
            <motion.div style={{ y: yColumnRight }} className="flex flex-col gap-8 pb-32">
              {columns[1].map((project, index) => (
                <div key={"PROJECT_CARD_INDEX_" + index} className="h-[260px] lg:h-[700px]">
                  <ProjectCard project={project} hoverEnabled={hoverEnabled} index={index} />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Mobile: Simple vertical list */}
        <div className="lg:hidden flex flex-col gap-6">
          {projects.map((project, index) => (
            <div key={"PROJECT_CARD_INDEX_" + index} className="h-[460px]">
              <ProjectCard project={project} hoverEnabled={hoverEnabled} index={index} mobileMode={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
