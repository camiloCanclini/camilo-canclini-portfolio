import './LoadingScreen.css'

export default function LoadingScreen() {
  

  return (
    <div className='flex flex-col w-full h-screen items-center justify-center text-theme-bg dark:text-themedark-bg'>
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
      <p className="stretch-animation mt-20 text-4xl text-theme-primary dark:text-themedark-primary">LOADING</p>
    </div>
    
  )
}