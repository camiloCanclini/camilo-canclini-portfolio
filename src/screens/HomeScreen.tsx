import NavBar from '../components/home_screen/nav_bar/NavBar'
import Presentation from '../components/home_screen/presentation/Presentation'

import { useThemeContext } from '../ThemeContext';

export default function HomeScreen(){
  
  const { theme } = useThemeContext();

  return (
    <div className={'w-screen ' + theme.mainBgColor}>
      <NavBar></NavBar>
      <Presentation></Presentation>
    </div>
  )
}