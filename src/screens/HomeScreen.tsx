import NavBar from '@/components/home_screen/nav_bar/NavBar'
import Hero from '@/components/home_screen/sections/hero/Hero'
import Projects from '@/components/home_screen/sections/projects/Projects';

import { useThemeContext } from '@/providers/ThemeContext';
import { PreloadedImageInterface } from '@/app/App'
import { AboutMe } from '@/components/home_screen/sections/about_me/AboutMe';

/* interface HomeScreenProps {
  preloadedImages: PreloadedImageInterface[];
} */

const HomeScreen: React.FC = () => {
  
  const { theme } = useThemeContext();

  return (
    <div className={' ' + theme.mainBgColor}>
      <NavBar></NavBar>
      <Hero></Hero>
      <div>
        <Projects></Projects>
        <div className="shadow-inner">
          <AboutMe></AboutMe>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen