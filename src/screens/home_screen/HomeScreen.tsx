import NavBar from '@/components/home_screen/nav_bar/NavBar'
import Hero from '@/components/home_screen/sections/hero/Hero'
import Projects from '@/components/home_screen/sections/projects/Projects';
import React from "react";
import { useThemeContext } from '@/providers/ThemeContext';
import { AboutMe } from '@/components/home_screen/sections/about_me/AboutMe';
import { HeroParallax } from '@/components/home_screen/sections/projects_2/Projects2';

const HomeScreen: React.FC = () => {
  
  const { theme } = useThemeContext();

  return (
    <div className={' ' + theme.mainBgColor}>
      <NavBar></NavBar>
      <div className="snap-always snap-center">
        <Hero></Hero>
      </div>
      <div className='snap-always snap-center'>
        {/* <div className="shadow-inner snap-always snap-center">
          <HeroParallax></HeroParallax>
        </div> */}
        <div className="shadow-inner snap-always snap-center">
          <Projects></Projects>
        </div>
        <div className="shadow-inner snap-always snap-center">
          <AboutMe></AboutMe>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen

