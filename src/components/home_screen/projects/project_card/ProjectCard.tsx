import React from 'react';

interface ProjectCardProps {
  images: string[];
  title: string;
  description: string;
  technologies: { icon: string; title: string }[];
  liveDemoLink: string;
  repoLink: string;
}


const ProjectCard: React.FC<ProjectCardProps> = ({
  images,
  title,
  description,
  technologies,
  liveDemoLink,
  repoLink,
}) => {
  return (
    <div className="item aos-init aos-animate" data-aos="zoom-in">
      <div className="projects_img-carousel" data-pos="0">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`${title} image ${index + 1}`} />
        ))}
        <button className="left">
          <i className="fa-solid fa-circle-arrow-left" aria-hidden="true"></i>
        </button>
        <button className="right">
          <i className="fa-solid fa-circle-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
      <div className="texts">
        <div className="texts-title">{title}</div>
        <div className="texts-info">{description}</div>
        <div className="texts-icons">
          <div className="texts-technologies">
            {technologies.map((tech, index) => (
              <i
                key={index}
                className={tech.icon}
                data-title={tech.title}
                aria-hidden="true"
              ></i>
            ))}
          </div>
          <a href={liveDemoLink} className="link-repo left" target="_blank" rel="noopener noreferrer">
            <i className="fa-sharp fa-regular fa-circle-play" aria-hidden="true"></i>
          </a>
          <a href={repoLink} className="link-repo" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-github" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;