//import './NavBar.css'
import { useState, useEffect } from 'react';
import { useThemeContext } from "@/providers/ThemeContext"
import MenuBtn from './menu_btn/MenuBtn';
import './NavBar.css';

interface NavOptionProps {
  label: string;
  link: string;
}

function NavOption({ label, link }: NavOptionProps): JSX.Element {
  return (
    <a href={link} className="fading-5 nav_option text-lg px-6 h-full flex items-center justify-center basis-32 grow">
      {label}
    </a>
  );
}

function NavBar() {
  const { theme } = useThemeContext()
  const [width, setWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 0)) // this way supports SSR
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setShowNavbar(currentPosition < 300);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav id="nav_container" style={{zIndex: 999}} className={'flex items-center px-20 h-16 w-full fixed ' + (showNavbar ? 'show-nav': 'hide-nav') + ' ' + theme.mainColor + ' ' + theme.mainTextColor}>
        <p className="text-2xl">Camilo Canclini</p>
            <div className="nav_options grow h-full items-center flex ml-auto max-w-3xl justify-end">
              {
                width > 1150 ? (
                  <>
                    <NavOption label="Projects" link="#projects_section"/>
                    <NavOption label="About Me" link="#about_me_section"/>
                    <NavOption label="Carrer" link="#carrer_section"/>
                    <NavOption label="Skills" link="#skills_section"/>
                    <NavOption label="Contact Me" link="#contact_me_section"/>
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
