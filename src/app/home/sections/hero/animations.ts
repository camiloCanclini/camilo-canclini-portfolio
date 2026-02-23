import type { Variants } from "framer-motion";

export const createTextVariants = (opts: {
  normalDuration: number;
  normalPostDelay: number;
}): Variants => {
  const { normalDuration, normalPostDelay } = opts;
  return {

    large: {
      opacity: 1,
      scale: 1.17,
      y: -50,
      x: 0
    },
    normal: {
      y: -30,
      opacity: 1,
      scale: 1,
      //x: "-15vw",
      //maxWidth: "32rem",
      transition: { delay: normalPostDelay, duration: normalDuration, ease: "easeInOut" },
    },
    fix_width: {
      opacity: 1,
      scale: 1,
      //x: "-15vw",
      //maxWidth: "32rem",
      transition: { delay: normalPostDelay, duration: normalDuration, ease: "easeInOut" },
    },
  };
};

export const createSubtitleWrapperVariants = (opts: {
  showDuration: number;
  showDelay: number;
}): Variants => {
  const { showDuration, showDelay } = opts;
  return {
    hidden: {
      height: 0,
      opacity: 0,
      scaleY: 0.98,
      filter: "blur(6px)",
      transformOrigin: "top left",
    },
    show: {
      height: "auto",
      opacity: 1,
      scaleY: 1,
      filter: "blur(0px)",
      transition: { duration: showDuration, ease: "easeOut", delay: showDelay },
    },
  };
};

export const createImageWrapperVariants = (opts: {
  visibleDuration: number;
  imageWrapperDelay: number;
}): Variants => {
  const { visibleDuration, imageWrapperDelay } = opts;
  return {
    hidden: {
      width: 0,
      opacity: 0,
      scale: 0.95,
      //x: 30, 
      filter: "blur(8px)"
    },
    visible: {
      width: "auto",
      opacity: 1,
      scale: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { delay: imageWrapperDelay, duration: visibleDuration, ease: "easeOut" },
    },
  };
};

export const createCtaVariants = (opts: { visibleDuration: number }): Variants => {
  const { visibleDuration } = opts;
  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: visibleDuration, ease: "easeOut" },
    },
  };
};

export const createSubtitleSimpleVariants = (opts: {
  visibleDuration: number;
  visibleDelay: number;
}): Variants => {
  const { visibleDuration, visibleDelay } = opts;
  return {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: visibleDuration, ease: "easeOut", delay: visibleDelay },
    },
  };
};

export const createImageSimpleVariants = (opts: { fadeInImageDuration: number, fadeInImageDelay: number }): Variants => {
  const { fadeInImageDuration, fadeInImageDelay } = opts;
  return {
    hidden: { opacity: 0, scale: 0.85 },
    fadeIn: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { delay: fadeInImageDelay, duration: fadeInImageDuration, ease: "easeOut" },
    },
  };
};

export const createImageSlotRevealVariants = (opts: {
  delay: number;
  duration: number;
}): Variants => {
  const { delay, duration } = opts;
  return {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "auto",
      opacity: 1,
      transition: { delay, duration, ease: "easeOut" },
    },
  };
};

export const createContainerVariants = (): Variants => {
  return {
    start: {},
    noImage: { x: 0 },
    withImage: { transition: { type: "spring", stiffness: 150, damping: 15 } },
  };
};
