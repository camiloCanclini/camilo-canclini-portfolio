"use client"

// ============================================================
// IMPORTS - UI Components
// ============================================================
import { NavBar, ConfigurationMenu } from '@/app/ui/barrel_files/components'

// ============================================================
// IMPORTS - Home Sections
// ============================================================
import { 
  Hero, 
  ProjectsParallax, 
  Career, 
  Skills, 
  ContactMe, 
  Footer 
} from '@ui/barrel_files/home_sections'

// ============================================================
// IMPORTS - Data
// ============================================================
import projectsData from "@data/projects.json";
import careerData from "@data/career.json";
import skillsData from "@data/skills.json";
  
export default function HomeScreen () {

  return (
    <div className="bg-theme-bg dark:bg-themedark-bg">
      <div className="sticky top-[8vh] z-[500000] ">
        <ConfigurationMenu></ConfigurationMenu>
      </div>
      <NavBar></NavBar>
      <div className="snap-always snap-center">
        <Hero></Hero>
      </div>
      <div className='snap-always snap-center'>
        <div className="shadow-inner snap-always snap-center">
          <ProjectsParallax data={projectsData}></ProjectsParallax>
        </div>
        <div>
          <Career data={careerData} heading="My Career" subheading="Here's my professional journey"></Career>
        </div>
        <div>
          <Skills data={skillsData}/>  
        </div>
        <div>
          <ContactMe></ContactMe>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </div>
  )
}


