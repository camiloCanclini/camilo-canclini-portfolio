import './LoadingScreen.css'
import { useThemeContext } from '@/providers/ThemeContext';

export default function LoadingScreen() {
  
  const { theme } = useThemeContext();

  return (
    <div className={'flex flex-col w-full h-screen items-center justify-center '+ theme.mainBgColor}>
      <div className="loader">
          <div className="cube">
              <div className="face"></div>
              <div className="face"></div>
              <div className="face"></div>
              <div className="face"></div>
              <div className="face"></div>
              <div className="face"></div>
          </div>
      </div>
      <p className="stretch-animation mt-20 text-4xl text-white">LOADING</p>
    </div>
    
  )
}