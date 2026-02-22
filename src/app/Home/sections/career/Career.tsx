"use client";

// ============================================================
// IMPORTS - External libraries
// ============================================================
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useTheme } from "next-themes";

// ============================================================
// IMPORTS - Internal components
// ============================================================
import { SectionHeading } from "@ui/barrel_files/components";

// ============================================================
// LANGUAGE & CONTENT
// ============================================================

import { getSectionText, getLanguageTexts } from "@/i18n/pageInfo";
import { useLang } from "@/providers/LanguageProvider";


// ============================================================
// TYPES
// ============================================================
export type TimelineEntryData = {
  id?: string | number;
  texts: {
    en: {
      date: string;
      title: string;
      description: string;
    };
    es: {
      date: string;
      title: string;
      description: string;
    };
  };
  images?: Array<{ src: string; alt?: string }>;
};

type CareerProps = {
  data: TimelineEntryData[];
};

type TimelineItemProps = {
  item: TimelineEntryData & { _key: string | number };
  index: number;
};

// ============================================================
// MAIN COMPONENT - Career Section
// ============================================================
export function Career({
  data,
}: CareerProps) {


  // ============================================================
  // TEXTS CONTENT (LANG BASED)
  // ============================================================
  const { locale } = useLang();
  const content = getSectionText("career", locale);

  // ============================================================
  // REFS & STATE
  // ============================================================
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // ============================================================
  // EFFECTS - Track content height
  // ============================================================
  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const ro = new ResizeObserver(() => setHeight(el.scrollHeight + 0));
    ro.observe(el);
    setHeight(el.scrollHeight);
    return () => ro.disconnect();
  }, []);

  // ============================================================
  // SCROLL ANIMATIONS
  // ============================================================
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 70%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // ============================================================
  // COMPUTED VALUES
  // ============================================================
  const entries = useMemo(
    () =>
      data.map((item, index) => ({
        ...item,
        _key: item.id ?? `${index}`,
      })),
    [data]
  );

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div
      id="carrer_section"
      ref={containerRef}
      className="lg:w-4/5 lg:mx-auto mx-0 font-sans lg:px-[20px] px-0 overflow-y-hidden pb-[20vh] lg:pt-[20vh]"
    >
      {/* Section heading */}
      <SectionHeading heading={content!.title || "Projects"} subheading={content!.subtitle.toString() || "Here are some of the things I've been building..."} />

      <div
        ref={contentRef}
        className="lg:w-4/6 w-full relative lg:max-w-7xl mx-auto pb-20 lg:pt-[10vh]"
      >
        {/* Timeline items */}
        {entries.map((item, index) => (
          <TimelineItem key={item._key} item={item} index={index} />
        ))}

        {/* Animated timeline line */}
        <div
          style={{ height: height + "px" }}
          className="timeline absolute lg:left-8 left-8 top-0 overflow-hidden w-[2px]
                     dark:bg-neutral-900 bg-neutral-100
                     [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]
                      [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
        >



          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px]
                       bg-gradient-to-r to-neutral-800 via-neutral-800 from-transparent dark:to-slate-400 dark:via-gray-50
                       from-[0%] via-[10%] rounded-full"
          />
        </div>


      </div>
    </div>
  );
}



// ============================================================
// SUB-COMPONENT - Timeline Item
// ============================================================
function TimelineItem({ item, index }: TimelineItemProps) {


  // ============================================================
  // TEXTS CONTENT (LANG BASED)
  // ============================================================
  const { locale } = useLang();

  // ============================================================
  // REFS & SCROLL TRACKING
  // ============================================================
  const entryRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // OJO: antes de mounted, no uses theme para decidir estilos
  const isDark = mounted && resolvedTheme === "dark";

  // Track scroll progress for this item (activates when 60-40% in viewport)
  const { scrollYProgress } = useScroll({
    target: entryRef,
    offset: ["start 60%", "start 40%"],
  });

  const glow = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // ============================================================
  // ANIMATION VALUES - Point Glow
  // ============================================================

  const colorShadow = isDark ? 255 : 200;


  const pointBlur = useTransform(glow, [0, 1], [0, 18]);
  const pointAlpha = useTransform(glow, [0, 1], isDark ? [255, 0] : [0, 255]);
  const pointShadow = useMotionTemplate`0 0 ${pointBlur}px rgba(${pointAlpha},${pointAlpha},${pointAlpha},1)`;

  const innerBlur = useTransform(glow, [0, 1], [0, 10]);
  const innerAlpha = useTransform(glow, [0, 1], [0, 0.75]);
  const innerShadow = useMotionTemplate`0 0 ${innerBlur}px rgba(${colorShadow},${colorShadow},${colorShadow},${innerAlpha})`;

  const innerBg = useTransform(
    glow,
    [0, 1],
    isDark
      ? ["rgba(0,0,0,1)", "rgba(255,255,255,1)"]
      : ["rgba(255,255,255,1)", "rgba(0,0,0,1)"]
  );

  // ============================================================
  // ANIMATION VALUES - Title Glow
  // ============================================================
  const titleBlur = useTransform(glow, [0, 1], [0, 10]);
  const titleAlpha = useTransform(glow, [0, 1], [0, 0.85]);
  const titleShadow = useMotionTemplate`0 0 ${titleBlur}px rgba(${colorShadow},${colorShadow},${colorShadow},${titleAlpha})`;

  const titleColor = useTransform(
    glow,
    [0, 1],
    isDark
      ? ["rgba(115,115,115,1)", "rgba(255,255,255,0.9)"]
      : ["rgba(180,180,180,1)", "rgba(0,0,0,0.9)"]
  );

  const MAX_IMAGES = 3;

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div
      ref={entryRef}
      className="flex flex-col justify-start pt-10 lg:pt-40 lg:gap-10"
    >
      {/* Timeline point and title */}
      <div className="flex flex-col z-40 items-center top-40 self-start">
        <motion.div
          className="timeline_point h-10 absolute left-3 lg:left-3 w-10 rounded-full 
          border dark:border-themedark-primary flex items-center justify-center"
          style={{ boxShadow: pointShadow, backgroundColor: innerBg }}
        >
          {/* <motion.div
            className="h-4 w-4 rounded-full border "
            style={{ boxShadow: innerShadow, backgroundColor: innerBg }}
          /> */}
        </motion.div>

        <motion.h3
          className="desktop_title lg:ml-0 ml-[2.5em] lg:mb-0 mb-4 text-[2em] lg:pl-20 lg:text-4xl font-bold"
          style={{ textShadow: titleShadow, color: titleColor }}
        >
          {getLanguageTexts(item.texts, locale).title}
        </motion.h3>
      </div>

      {/* Timeline content card */}
      <div className="relative lg:pl-20 pr-6 pl-16 lg:pt-0 w-full">

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-2xl lg:w-4/5 lg:mx-auto border border-neutral-200/70 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/30 backdrop-blur px-4 py-4 lg:px-6 lg:py-5"
        >
          {/* Date badge */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
              {getLanguageTexts(item.texts, locale).date}
            </span>
          </div>

          {/* Title */}
          <div className="text-lg lg:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {getLanguageTexts(item.texts, locale).title}
          </div>

          {/* Description */}
          <p className="mt-2 text-sm lg:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {getLanguageTexts(item.texts, locale).description}
          </p>

          {/* Images grid */}
          {!!item.images?.length && (
            <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-3">
              {item.images.slice(0, MAX_IMAGES).map((img, i) => (
                <motion.div
                  key={`${img.src}-${i}`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
                >
                  <img
                    src={img.src}
                    alt={img.alt ?? getLanguageTexts(item.texts, locale).title}
                    className="h-32 w-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
