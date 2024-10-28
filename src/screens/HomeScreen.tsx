import NavBar from '@/components/home_screen/nav_bar/NavBar'
import Hero from '@/components/home_screen/hero/Hero'

import { useThemeContext } from '@/providers/ThemeContext';

export default function HomeScreen(){
  
  const { theme } = useThemeContext();

  return (
    <div className={'w-screen ' + theme.mainBgColor}>
      <NavBar></NavBar>
      <Hero></Hero>
    </div>
  )
}