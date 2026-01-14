"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { SectionHeading } from "../SectionHeading";

export type TimelineEntryData = {
  id?: string | number;
  title: string;
  description: string;
  date: string;
  images?: Array<{ src: string; alt?: string }>;
};

type CareerProps = {
  data: TimelineEntryData[];
  heading?: string;
  subheading?: string;
};

function TimelineItem({
  item,
  index,
}: {
  item: TimelineEntryData & { _key: string | number };
  index: number;
}) {
  const entryRef = useRef<HTMLDivElement>(null);

  // 0 -> (start 80%), 1 -> (start 60%). Después queda en 1 (prendido).
  const { scrollYProgress } = useScroll({
    target: entryRef,
    offset: ["start 60%", "start 40%"],
  });

  const glow = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // ---- Punto
  const pointBlur = useTransform(glow, [0, 1], [0, 18]);
  const pointAlpha = useTransform(glow, [0, 1], [0, 0.9]);
  const pointShadow = useMotionTemplate`0 0 ${pointBlur}px rgba(255,255,255,${pointAlpha})`;

  const innerBlur = useTransform(glow, [0, 1], [0, 10]);
  const innerAlpha = useTransform(glow, [0, 1], [0, 0.75]);
  const innerShadow = useMotionTemplate`0 0 ${innerBlur}px rgba(255,255,255,${innerAlpha})`;
  const innerBg = useTransform(
    glow,
    [0, 1],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.85)"]
  );

  // ---- Título
  const titleBlur = useTransform(glow, [0, 1], [0, 10]);
  const titleAlpha = useTransform(glow, [0, 1], [0, 0.85]);
  const titleShadow = useMotionTemplate`0 0 ${titleBlur}px rgba(255,255,255,${titleAlpha})`;

  const titleColor = useTransform(
    glow,
    [0, 1],
    ["rgba(115,115,115,1)", "rgba(255,255,255,0.9)"]
  );

  const MAX_IMAGES = 3;

  return (
    <div
      ref={entryRef}
      className="flex flex-col justify-start pt-10 md:pt-40 md:gap-10"
    >
      <div className="flex flex-col z-40 items-center top-40 self-start">
        <motion.div
          className="timeline_point h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center"
          style={{ boxShadow: pointShadow }}
        >
          <motion.div
            className="h-4 w-4 rounded-full border border-neutral-300 dark:border-neutral-700"
            style={{ boxShadow: innerShadow, backgroundColor: innerBg }}
          />
        </motion.div>

        <motion.h3
          className="desktop_title hidden md:block text-xl md:pl-20 md:text-4xl font-bold"
          style={{ textShadow: titleShadow, color: titleColor }}
        >
          {item.title}
        </motion.h3>
      </div>

      <div className="relative pl-20 w-full">
        <h3 className="md:hidden block text-xl mb-2 text-left font-bold text-neutral-500 dark:text-neutral-500">
          {item.title}
        </h3>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-2xl w-4/5 mx-auto border border-neutral-200/70 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/30 backdrop-blur px-4 py-4 md:px-6 md:py-5"
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
              {item.date}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {/* #{String(index + 1).padStart(2, "0")} */}
            </span>
          </div>

          <div className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {item.title}
          </div>

          <p className="mt-2 text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {item.description}
          </p>

          {!!item.images?.length && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
              {item.images.slice(0, MAX_IMAGES).map((img, i) => (
                <motion.div
                  key={`${img.src}-${i}`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
                >
                  <img
                    src={img.src}
                    alt={img.alt ?? item.title}
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

export function Career({
  data,
  heading = "Changelog from my journey",
  subheading = "A timeline generated from JSON.",
}: CareerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const ro = new ResizeObserver(() => setHeight(el.scrollHeight + 0));
    ro.observe(el);
    setHeight(el.scrollHeight);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 70%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const entries = useMemo(
    () =>
      data.map((item, index) => ({
        ...item,
        _key: item.id ?? `${item.title}-${item.date}-${index}`,
      })),
    [data]
  );

  return (
    <div
      ref={containerRef}
      className="w-4/5 mx-auto font-sans px-[20px] overflow-y-hidden pb-[20vh] pt-[20vh]"
    >
      <SectionHeading heading={heading} subheading={subheading} />

      <div
        ref={contentRef}
        className="w-4/6 relative max-w-7xl mx-auto pb-20 pt-[10vh]"
      >
        {entries.map((item, index) => (
          <TimelineItem key={item._key} item={item} index={index} />
        ))}

        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px]
                     bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]
                     from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]
                     [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px]
                       bg-gradient-to-r to-slate-400 via-gray-50 from-transparent
                       from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
