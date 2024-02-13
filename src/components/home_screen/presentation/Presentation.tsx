//import './NavBar.css'
import { useThemeContext } from "../../../ThemeContext"
import { useState } from "react"

import bgVideo from '../../../assets/videos/welcome.mp4'
import icon from '../../../assets/icons/camilo.png'
import './Presentation.css'
function Presentation() {

  let theme = useThemeContext()
  let [iconShow, setIconShow] = useState(false)

  return (
    <div id="home" className="h-screen w-screen relative flex justify-center items-center">
        <a title="CV" href="resources/docs/cv.pdf" target="_blank" className="z-30 absolute bottom-5 left-0 right-0 z-20 flex items-center justify-center">
            <i className="fa-solid fa-file-arrow-down text-4xl"></i>
        </a>
        <video src={bgVideo} className="absolute w-full h-full object-cover fadeIn" playsInline autoPlay muted loop />
        <div className="h-full w-full z-20">
            <div className="grow">
                <span className="" id="welcome_t1"></span>
                <span className="welcome_message_t2"></span>
            </div>
            <div className="z-20 bounceIn">
                <img src={icon} alt="Camilo Img" id="icon" data-aos="zoom-in" />
            </div>
        </div>
    </div>
  )
}

export default Presentation
