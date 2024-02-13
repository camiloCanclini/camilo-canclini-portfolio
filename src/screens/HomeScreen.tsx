import NavBar from '../components/home_screen/nav_bar/NavBar'

import { useThemeContext } from '../ThemeContext';

export default function HomeScreen(){
  
  const { theme } = useThemeContext();

  return (
    <div className={'h-screen w-full ' + theme.mainBgColor}>
      <NavBar></NavBar>
    </div>
  )
}