import NavBar from '@/components/home_screen/nav_bar/NavBar'
import Presentation from '@/components/home_screen/presentation/Hero'

import { useThemeContext } from '@/providers/ThemeContext';

export default function HomeScreen(){
  
  const { theme } = useThemeContext();

  return (
    <div className={'w-screen ' + theme.mainBgColor}>
      <NavBar></NavBar>
      <Presentation></Presentation>
    </div>
  )
}