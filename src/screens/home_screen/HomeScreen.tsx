import NavBar from '@/components/home_screen/nav_bar/NavBar'
import Hero from '@/components/home_screen/sections/hero/Hero'
import Projects from '@/components/home_screen/sections/projects/Projects';
import React from "react";
import { useThemeContext } from '@/providers/ThemeContext';
import ProjectsParallax from '@/components/home_screen/sections/projects/ProjectsParallax';
import { Career } from '@/components/home_screen/sections/career/Career';
import { Skills } from '@/components/home_screen/sections/skills/Skills';
import dataCareer from "@config_files/entriesCarrer.json";
import dataSkills from "@config_files/skills.json";
import { ContactMe } from '@/components/home_screen/sections/contact_me/ContactMe';
import { Footer } from '@/components/home_screen/sections/footer/Footer';

const HomeScreen: React.FC = () => {
  
  const { theme } = useThemeContext();

  return (
    <div className={' ' + theme.mainBgColor}>
      <NavBar></NavBar>
      <div className="snap-always snap-center">
        <Hero></Hero>
        {/* <div className='flex justify-content-center p-3'>
          <HeroPersona5></HeroPersona5>
        </div> */}
      </div>
      <div className='snap-always snap-center'>
        {/* <div className="shadow-inner snap-always snap-center">
          <HeroParallax></HeroParallax>
        </div> */}
        <div className="shadow-inner snap-always snap-center">
          <ProjectsParallax></ProjectsParallax>
        </div>
        {/* <div className="shadow-inner snap-always snap-center">
          <AboutMe></AboutMe>
        </div> */}
        <div>
          <Career data={dataCareer} heading="My Career" subheading="Here's my professional journey"></Career>
        </div>
        <div>
          <Skills data={dataSkills}/>
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

export default HomeScreen

