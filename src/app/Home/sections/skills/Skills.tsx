"use client";

// ============================================================
// IMPORTS - External libraries
// ============================================================
import { motion, Variants } from "framer-motion";

// ============================================================
// IMPORTS - Internal components
// ============================================================
import { SectionHeading } from "@/app/ui/barrel_files/components";
import { StarsBackground } from "./StarsBackground";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// ============================================================
// TYPES
// ============================================================

type SkillItem = {
  name: string;
  icon: string;
};

type SkillCategoryProps = {
  category: {
    name: string;
    skills: SkillItem[];
  };
};

type SkillsProps = {
  data: {
    name: string;
    skills: SkillItem[];
  }[];
};




// ============================================================
// MAIN COMPONENT - Skills Section
// ============================================================
export const Skills = ({ data }: SkillsProps) => {
  return (
    <>
      {/* Skills Container */}
      <div className="w-full relative z-[100] pt-[20vh] overflow-hidden backdrop-blur-md">
        {/* Top gradient overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[20vh] bg-gradient-to-b dark:to-black/60 to-white from-transparent z-20" />
        
        {/* Section heading */}
        <SectionHeading 
          heading="My Skills" 
          subheading="Technologies that I work with" 
          className="z-[200] pt-[25vh] relative"
        />
        
        {/* Skills categories container */}
        <div className="w-full flex flex-col items-center justify-evenly w-full mx-auto pb-[20vh] pt-[20vh]">
          <StarsBackground className="STARS-BG absolute top-[20vh] bottom-[20vh] w-full h-full invert dark:invert-0" />
          
          {/* Map through skill categories */}
          {data.map((category, index) => (
            <SkillCategory key={index} category={category} />
          ))}
        </div>
      </div>
      
      {/* Bottom gradient overlay */}
      <div className="pointer-events-none relative inset-x-0 bottom-0 h-[20vh] bg-gradient-to-t dark:to-black/60 to-white from-transparent z-20" />
    </>
  );
};

// ============================================================
// SUB-COMPONENT - Skill Category
// ============================================================
function SkillCategory({ category }: SkillCategoryProps) {
  
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

   // OJO: antes de mounted, no uses theme para decidir estilos
  const isDark = mounted && resolvedTheme === "dark";
  // ============================================================
  // ANIMATION VARIANTS
  // ============================================================
  
  // Category box animation (parent)
  const skillCategoryBoxVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.5,
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  // Icon container animation
  const skillCategoryIconContainerVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 2,
        ease: "easeOut",
      },
    },
  };

  // Individual skill icon animation
  const skillIconVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -10,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  // Icon hover animation variants
  const iconHoverVariants = {
    rest: {
      scale: 1,
      filter: `brightness(0) invert(${isDark? 1 : 0}) drop-shadow(0 0 0px rgba(255,255,255,0))`,
    },
    hover: {
      scale: 1.05,
      filter: `brightness(0) invert(${isDark? 1 : 0}) drop-shadow(0 0 10px rgba(255,255,255,0.45))`,
    },
  };

  // Label hover animation variants
  const labelHoverVariants = {
    rest: {
      opacity: 0,
      y: 8,
    },
    hover: {
      opacity: 1,
      y: 0,
    },
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <motion.div
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      initial="hidden"
      whileInView="visible"
      variants={skillCategoryBoxVariants}
      className="skillsCategoryBox bg-neutral-100 dark:bg-black flex flex-col justify-center rounded-lg border dark:border-themedark-primary border-theme-primary mb-[24vh] w-3/5 p-12 pt-16 shadow-md min-h-[200px] relative"
    >
      {/* Category title badge */}
      <div className="absolute -top-5 -left-10 min-w-[400px] text-center px-4 bg-neutral-100 dark:bg-black border dark:border-themedark-primary border-theme-primary rounded">
        <h3 className="text-[3em] text-theme-primary dark:text-themedark-primary font-semibold m-0">
          {category.name}
        </h3>
      </div>

      {/* Skills grid container */}
      <motion.div
        className="flex items-center"
        initial="hidden"
        whileInView="visible"
        variants={skillCategoryIconContainerVariants}
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Map through skills */}
        {category.skills.map((skill: SkillItem, index: number) => (
          <motion.div
            key={index}
            variants={skillIconVariants}
            className="flex flex-col items-center justify-center grow w-[100px] h-[100px] m-4"
          >
            {/* Skill icon with hover effect */}
            <motion.div
              className="h-full w-full text-center m-2"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              {/* Icon image */}
              <motion.img
                src={skill.icon}
                alt={skill.name}
                className="icon-skill w-full h-full mb-4 contain select-none object-contain cursor-pointer"
                variants={iconHoverVariants}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />

              {/* Skill name label (appears on hover) */}
              <motion.div
                className="text-theme-primary dark:text-themedark-primary text-center"
                variants={labelHoverVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {skill.name}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
