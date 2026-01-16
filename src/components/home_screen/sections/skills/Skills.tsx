"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  delay,
  Variants,
} from "framer-motion";
import { SectionHeading } from "../SectionHeading";
import { StarsBackground } from "./StarsBackground";

export type SkillCategoryType = {
  key: number;
  name: string;
  skills: SkillItemType[];
};

export type SkillItemType = {
  name: string;
  order?: number | 0; // 0 to 100
  icon: string;
};

export const Skills: React.FC<{data: SkillCategoryType[]}> = ({data}) => {
  return (
    <>
      <div className="w-full relative z-[100] pt-[20vh] overflow-hidden  backdrop-blur-md">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[20vh] bg-gradient-to-b to-black/60 from-transparent z-20"></div>
        <SectionHeading heading="My Skills" subheading="Technologies that I work with" className="z-[200] pt-[25vh] relative"/>
        
        <div className="w-full flex flex-col items-center justify-evenly max-w-3/5 mx-auto  pb-[20vh] pt-[20vh]">
          <StarsBackground className="STARS-BG absolute top-[20vh] bottom-[20vh] w-full h-full"></StarsBackground>
          {data.map((category, index) => (
              <SkillCategory key={index} category={category} />
            ))}
        </div>
      </div>
      <div className="pointer-events-none relative inset-x-0 bottom-0 h-[20vh] bg-gradient-to-t to-black/60 from-transparent z-20"></div>
    </>
  );
}

function SkillCategory({ category }: { category: SkillCategoryType }) {

  

  const skillCategoryBoxVariants : Variants = {
    hidden: { 
      opacity: 0,
      x: -10
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.5,   // uno atrás del otro
        duration: 1,
        ease: "easeOut",
      },
    }
  }
  const skillCategoryIconContainerVariants : Variants = {
    hidden: { 
      opacity: 0,
      x: -10
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 2,
        ease: "easeOut",
      },
    }
  }

  const skillIconVariants : Variants = {
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

  return (
    <motion.div
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      initial="hidden"
      whileInView="visible"
      variants={skillCategoryBoxVariants}
      className="skillsCategoryBox bg-black flex flex-col justify-center rounded-lg border mb-[24vh] w-3/5 p-12 pt-16 shadow-md min-h-[200px] relative"
    >
      <div className="absolute -top-5 -left-10 min-w-[400px] text-center px-4 bg-black border rounded">
        <h3 className="text-[3em] text-white  font-semibold m-0">{category.name}</h3>
      </div>
      <motion.div 
        className="flex items-center"
        initial="hidden"
        whileInView="visible"
        variants={skillCategoryIconContainerVariants}
        viewport={{ once: true, amount: 0.5 }}
      >
        {category.skills.map((skill, index) => (
          <motion.div className="flex flex-col items-center justify-center grow w-[100px] h-[100px] m-4"
           key={index} variants={skillIconVariants}>
            <motion.div     className="h-full w-full text-center m-2"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.img 
                src={skill.icon} 
                alt={skill.name} 
                className="w-full h-full mb-4 contain select-none object-contain cursor-pointer invert brightness-0"
                variants={{ 
                            rest: { scale: 1, filter: "brightness(0) invert(1) drop-shadow(0 0 0px rgba(255,255,255,0))" }, 
                            hover: { scale: 1.05, filter: "brightness(0) invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.45))" }
                          }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
              <motion.span className="text-white text-center "
                variants={{
                            rest: { opacity: 0, y: 10 },
                            hover: { opacity: 1, y: 0 }
                          }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {skill.name}
              </motion.span>
            </motion.div>
          </motion.div>
          ))}
      </motion.div>
    </motion.div>
  );
}

