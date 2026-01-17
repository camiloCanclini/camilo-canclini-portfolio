"use client"
import ProjectsParallax from '@/app/Home/projects/ProjectsParallax';
import NavBar from '@/app/ui/home_screen/nav_bar/NavBar'
import Hero from '@/app/Home/hero/Hero'
import { Career } from '@/app/Home/career/Career';
import { Skills } from '@/app/Home/skills/Skills';
import { ContactMe } from '@/app/Home/contact_me/ContactMe';
import { Footer } from '@/app/Home/footer/Footer';
import ConfigurationMenu from '../ui/components/configurationMenu';

export default function HomeScreen ({ data }: { data: any }) {

  return (
    <div className="bg-theme-bg dark:bg-themedark-bg">
      <div className="sticky top-[8vh] z-[500000] ">
        <ConfigurationMenu></ConfigurationMenu>
      </div>
      <NavBar></NavBar>
      <div className="snap-always snap-center">
        <Hero></Hero>
      </div>
      <div className='snap-always snap-center'>
        <div className="shadow-inner snap-always snap-center">
          <ProjectsParallax data={data.projects}></ProjectsParallax>
        </div>
        <div>
          <Career data={data.career} heading="My Career" subheading="Here's my professional journey"></Career>
        </div>
        <div>
          <Skills data={data.skills}/>
        </div>
        <div>
          <ContactMe></ContactMe>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </div>
  )
}


