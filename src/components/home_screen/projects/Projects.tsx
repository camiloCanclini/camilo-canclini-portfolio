//import './NavBar.css'
//import { useThemeContext } from "@/providers/ThemeContext"
import { useEffect, useState } from "react"

function Projects() {
  
  
  
  useEffect(()=>{
    setTimeout(()=>{setShowIcon(true)},3000)
    setTimeout(()=>{setShowWelcome(true)},4000)
    setTimeout(()=>{setShowCvBtn(true)},5000)
  },[])
  return (
    <div id="home" className="h-screen w-full relative flex justify-center items-center">
        
        <video src={bgVideo} className="absolute w-full h-full object-cover fadeIn" playsInline autoPlay muted loop />
        <div className="h-full w-full z-20 flex items-center justify-center transition-all duration-700 ease-in-out">
            <div className={(showIcon? "grow" : "") + " basis-0 text-center transition-all duration-700 ease-in-out"}>
                {
                  showWelcome? <WelcomeText></WelcomeText> : null
                }
            </div>
            <div className="grow basis-0 h-1/2 z-20 flex justify-center transition-all duration-700 ease-in-out">
                <img src={icon} className="bounceIn" alt="Camilo Img" id="icon" data-aos="zoom-in" />
            </div>
        </div>
        {
          showCvBtn? 
          <a title="CV" href="resources/docs/cv.pdf" target="_blank" className="text-white z-30 absolute bottom-5 left-0 right-0 flex items-center justify-center">
              <i className="bounceIn fa-solid fa-file-arrow-down text-4xl"></i>
          </a>
          : 
          null
        }
        
    </div>
  )
}

export default Projects
