
import React from 'react';
import './ProjectCard.css'
import { useThemeContext } from '@/providers/ThemeContext';
import Tilt from "react-parallax-tilt"


export interface ProjectCardInterface {
  title: string;
  description: string;
  technologies: { icon: string; title: string; color: string }[];
  liveDemoLink?: string;
  repoLink?: string;
  placeholderImage: string
  images: string[];
}

const ProjectCard: React.FC<{ project: ProjectCardInterface, index: number}> = ({project, index}) => {
  const { theme } = useThemeContext();

  return (
    <Tilt perspective={2000} tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.05} glarePosition='all' className='project-card h-full border border-gray-600 rounded-xl overflow-hidden hover:cursor-pointer'>
      <div className={" h-full w-full" + " " + [theme.projectsCardBgColor, theme.projectsCardFontColor].join(" ")} >
        <div className="w-full h-1/2" data-pos="0">
          <img className='rounded-b-3xl h-full w-full object-cover' src={project.placeholderImage} />
        </div>
        <div className="px-6 pb-4 flex flex-col h-1/2">
          <div className="text-2xl my-4">{project.title}</div>
          <div className="my-4">{project.description}</div>
          <div className="flex justify-between mt-auto">
              <div className='flex items-center gap-2'>
                {project.technologies.map((tech, index) => (
                  <div key={index} className={"text-xl" + ""}>
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
    
  );
  
};

export default ProjectCard;