import { useEffect, useState } from "react"
import { useThemeContext } from '@/providers/ThemeContext';
import ProjectCard, {ProjectCardInterface} from "./project_card/ProjectCard"
import jsonData from '@config_files/projects.json';



function Projects() {

  const { theme } = useThemeContext();
  const [projects, setProjects] = useState<ProjectCardInterface[]>([]);
  
  useEffect(() => {
    setProjects(jsonData);
  }, []);

  return (
    <div className=" py-20" style={{boxShadow: "inset 0px 0px 50px 2px #0008"}}>
      <div id="projects_section" className="px-20 py-10" data-aos="fade-right">
        <div className={"" + " " + theme.mainTextColor + " " + theme.titlesSectionSize}>Projects</div>
        <div className={"text-xl pt-4 pl-6" + " " + theme.mainTextColor }>Here are some of my works...</div>
      </div>
      <div className="flex px-36 gap-10 flex-wrap justify-center">
        {projects.map((project, index) => (
          <ProjectCard
            project={project}
            key={index}
            index={index}
          />
        ))}
      </div>
    </div>
  );

}

export default Projects
