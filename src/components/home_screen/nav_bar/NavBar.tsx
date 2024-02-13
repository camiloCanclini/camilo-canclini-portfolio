//import './NavBar.css'
import React, { useState, useEffect } from 'react';
import { useThemeContext } from "../../../ThemeContext"
import MenuBtn from './menu_btn/MenuBtn';

interface NavOptionProps {
  label: string;
  link: string;
}

function NavOption({ label, link }: NavOptionProps): JSX.Element {
  return (
    <a href={link} className="nav_option text-lg px-6 h-full flex items-center justify-center basis-32 grow hover:bg-slate-100/5">
      {label}
    </a>
  );
}

function NavBar() {
  const { theme } = useThemeContext()
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav id="nav_container" className={'flex items-center px-20 h-16 ' + theme.mainColor + ' ' + theme.mainTextColor}>
        <p className="text-2xl">Camilo Canclini</p>
            <div className="nav_options grow h-full items-center flex ml-auto max-w-3xl justify-end">
              {
                width > 1150 ? (
                  <>
                    <NavOption label="Projects" link="projects_section"/>
                    <NavOption label="About Me" link="about-me_section"/>
                    <NavOption label="Carrer" link="carrer_section"/>
                    <NavOption label="Skills" link="skills_section"/>
                    <NavOption label="Contact Me" link="contact-me_section"/>
                  </>
                )
                :
                (
                  <MenuBtn></MenuBtn>
                )
              }
                
            </div>
    </nav>
  )
}

export default NavBar
