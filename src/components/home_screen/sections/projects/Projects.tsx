import "./Projects.css"


import { useEffect, useState } from "react";
import { useThemeContext } from "@/providers/ThemeContext";
import ProjectCard, { ProjectCardInterface } from "./project_card/ProjectCard";
import jsonData from "@config_files/projects.json";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Projects() {
  const { theme } = useThemeContext();
  const [projects, setProjects] = useState<ProjectCardInterface[]>([]);


  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true, // Permite que la animación ocurra al bajar y subir
  });

  useEffect(() => {
    // Control de la animación según el estado de inView
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  // Variantes para la animación del contenedor
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Retraso entre animaciones de los hijos
        delayChildren: 0.1,
      },
    },
  };

  // Variantes para la animación de cada tarjeta
  const cardVariants: Variants = {
    hidden: { opacity: 0, x: -50 }, // Inicio fuera de pantalla a la izquierda
    visible: { opacity: 1, x: 0 },  // Aparece en pantalla
  };

  useEffect(() => {
    setProjects(jsonData);
  }, []);

  return (
    <div className="flex justify-center relative py-20" style={{ boxShadow: "inset 0px 0px 50px 2px #0008" }} ref={ref}>
      <div className="grid-background absolute top-0 bottom-0 left-0 right-0"></div>
      <div className="w-4/5">

      {/* Contenedor de titulo sección */}
        <div id="projects_section" className="px-20 py-10 z-10">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { x: "-100%", opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
            transition={{ type: "spring", stiffness: 100, damping: 40 }}
          >
            <div className={`${theme.mainTextColor} ${theme.titlesSectionSize}`}>Projects</div>
            <div className={`text-xl pt-4 pl-6 ${theme.mainTextColor}`}>Here are some of my works...</div>
          </motion.div>
        </div>

        {/* Contenedor de tarjetas animadas */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex px-36 gap-6 flex-wrap justify-center"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className=""
            >
              <ProjectCard project={project} key={index} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
    </div>
  );
}

export default Projects;
