import React from 'react';
import { useThemeContext } from '@/providers/ThemeContext';
import { LazyLoadImage } from "react-lazy-load-image-component";
import Tilt from "react-parallax-tilt"
import { motion } from 'framer-motion';

export interface ProjectCardInterface {
  placeholderImage: string
  images: string[];
  title: string;
  description: string;
  technologies: { icon: string; title: string; color: string }[];
  liveDemoLink: string | undefined | null;
  repoLink: string| undefined | null;
}

const ProjectCard: React.FC<{ project: ProjectCardInterface, index: number}> = ({project, index}) => {
  const { theme } = useThemeContext();
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.3, duration: 0.5 , ease: 'easeInOut'}} // Cada tarjeta se muestra con un retraso
    >
    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.05} glarePosition='all' className='h-full border border-gray-600 rounded-3xl overflow-hidden hover:cursor-pointer'>
      <div className={" h-full" + " " + [theme.projectsCardBgColor,theme.projectsCardWidth, theme.projectsCardFontColor].join(" ")} >
        <div className="w-full h-1/2" data-pos="0">
          <img className='rounded-b-3xl h-full w-full object-cover' src={project.placeholderImage} />
        </div>
        <div className="px-6 pb-4 flex flex-col h-1/2">
          <div className="text-2xl my-4">{project.title}</div>
          <div className="my-4">{project.description}</div>
          <div className="flex justify-between mt-auto">
              <div className='flex items-center gap-2'>
                {project.technologies.map((tech, index) => (
                  <div key={index} className={"text-xl" + ""}> {/* If i don´t put that way, it doesn´t work... */}
                      <i
                      key={index}
                      className={tech.icon + " " + tech.color}
                      data-title={tech.title}
                      aria-hidden="true"
                    ></i>
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <div className="text-3xl">
                  { 
                  (project.liveDemoLink != null) ? 
                    <a href={project.liveDemoLink} className="mx-1" target="_blank" rel="noopener noreferrer">
                      <i className="fa-sharp fa-regular fa-circle-play" aria-hidden="true"></i>
                    </a>
                  :
                    null
                  }
                  {
                  (project.repoLink != null) ? 
                    <a href={project.repoLink} className="mx-1" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-github" aria-hidden="true"></i>
                    </a>
                  :
                    null
                  }
                </div>
            </div>
          </div>
        </div>
      </div>
    </Tilt>
    </motion.div>
  );
  
};

export default ProjectCard;