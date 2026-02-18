"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================
// IMPORTS - UI Components
// ============================================================
import { NavBar, ConfigurationMenu } from '@/app/ui/barrel_files/components'

// ============================================================
// IMPORTS - Home Sections
// ============================================================
import {
  Hero,
  ProjectsParallax,
  Career,
  Skills,
  ContactMe,
  Footer
} from '@ui/barrel_files/home_sections'

// ============================================================
// IMPORTS - Data
// ============================================================
import projectsData from "@data/projects.json";
import careerData from "@data/career.json";
import skillsData from "@data/skills.json";

export default function HomeScreen() {
  const [showConfigMenu, setShowConfigMenu] = useState(false);

  return (
    <div className="bg-theme-bg dark:bg-themedark-bg">
      <AnimatePresence>
        <ConfigurationMenu showConfigMenu={showConfigMenu}></ConfigurationMenu>
      </AnimatePresence>
      <NavBar></NavBar>
      <div className="snap-always snap-center relative ">
        <Hero setShowConfigMenu={setShowConfigMenu}></Hero>
      </div>
      <div className='snap-always snap-center'>
        <div className="shadow-inner snap-always snap-center">
          <ProjectsParallax data={projectsData}></ProjectsParallax>
        </div>
        <div>
          <Career data={careerData}></Career>
        </div>
        <div>
          <Skills data={skillsData} />
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


