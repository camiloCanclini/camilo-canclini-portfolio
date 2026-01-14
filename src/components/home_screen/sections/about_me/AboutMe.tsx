"use client";

import { useThemeContext } from '@/providers/ThemeContext';

const icon = "/assets/icons/camilo_canclini1.jpg"

export function AboutMe() {

  const { theme } = useThemeContext();

  return (
    <div
        className="relative flex flex-col justify-center items-center gap-4 px-4 pl-32"
      >
        <div id="about_me_section" className="px-2 py-2 self-start -top-6 relative" data-aos="fade-right">
          <div className={"" + " " + theme.mainTextColor + " " + theme.titlesSectionSize}>About me</div>
          <div className={"text-xl pt-4 pl-6" + " " + theme.mainTextColor }>A bit information...</div>
        </div>
        <div className="relative flex flex-col justify-center h-full w-2/3 " data-aos="zoom-in">
          <div className="rounded-2xl w-full h-full border-2 border-gray-300 flex items-center p-10 pl-52 bg-neutral-100 bg-opacity-10">
            <img src={icon} className="absolute top-0 -left-32 bottom-0 border-2 border-gray-300 rounded-3xl my-auto min-h-72 w-72 object-cover   backdrop-blur-xl " alt="Camilo Canclini Image"/>
              <div className="min-h-72 flex items-center">
                  <p className="text-white text-xl ">
                      I am a web developer with a large trajectory. I have knowledge in robotic, electronic, networks, graphic design, informatic segurity, and others. As you can suppose, my strength is the programming. Due to having diverse knowledge I have developed a great adaptability to learn new technologies, that's because i never have fear to learn or try new work forms.
                  </p>
              </div>
              
          </div>
        </div>
      </div>
  );
}
