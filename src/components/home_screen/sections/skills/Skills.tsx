"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { SectionHeading } from "../SectionHeading";
import { StarsBackground } from "./StarsBackground";

export type SkillCategoryType = {
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
          {data.map((category) => (
              <SkillCategory key={category.name} category={category} />
            ))}
        </div>
      </div>
      <div className="pointer-events-none relative inset-x-0 bottom-0 h-[20vh] bg-gradient-to-t to-black/60 from-transparent z-20"></div>
    </>
  );
}

function SkillCategory({ category }: { category: SkillCategoryType }) {
  const categoryRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: categoryRef,
    offset: ["start 80%", "start 20%"],
  });

  const glow = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const cardBlur = useTransform(glow, [0, 1], [0, 10]);
  const cardAlpha = useTransform(glow, [0, 1], [0, 0.5]);
  const cardShadow = useMotionTemplate`0 0 ${cardBlur}px rgba(255,255,255,${cardAlpha})`;

  return (
    <motion.div
      ref={categoryRef}
      style={{ boxShadow: cardShadow }}
      className="skillsCategoryBox bg-black flex flex-col justify-center rounded-lg border mb-[24vh] w-3/5 p-6 pt-16 shadow-md min-h-[200px] relative"
    >
      <div className="absolute -top-5 -left-10 min-w-[400px] text-center px-4 bg-black border rounded">
        <h3 className="text-[3em] text-white  font-semibold m-0">{category.name}</h3>
      </div>
      <div className="flex items-center">
        {category.skills.map((skill, index) => (
            <div key={index} className="flex flex-col items-center justify-center grow w-[100px] h-[100px] m-4">
              <img src={skill.icon} alt={skill.name} className="w-full h-full contain mr-2 select-none object-contain
         filter brightness-0 invert cursor-pointer
         transition duration-200 ease-in-out
         hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.45)]
         hover:scale-105" />
              <span>{skill.name}</span>
            </div>
          ))}
      </div>
    </motion.div>
  );
}

