"use client";

// ============================================================
// EXTERNAL DEPENDENCIES
// ============================================================
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";

// ============================================================
// INTERNAL COMPONENTS
// ============================================================
import WriteText from "./main_text/WriteText";
import HeroImage from "./hero_image/HeroImage";

// ============================================================
// ANIMATIONS
// ============================================================
import {
  createContainerVariants,
  createImageSimpleVariants,
  createImageWrapperVariants,
  createSubtitleWrapperVariants,
  createTextVariants,
} from "./animations";

// ============================================================
// LANGUAGE & CONTENT
// ============================================================

import { getSectionText } from "@/i18n/pageInfo";
import { useLang } from "@/providers/LanguageProvider";

// ============================================================
// CONSTANTS - Timing Configuration
// ============================================================
let DURATION = {
  videoFade: 4,
  resizeTitles: 2,
  showSubtitle: 2,
  fadeInImage: 2,
} as const;

const DELAY = {
  videoFade: 12,
  HelloWorldTypingStartDelay: 2,
  showSubtitle: 2,
  afterNormalResizeAnimationDelay: 0.5,
  subHelloWorldTypingStartDelay: 12,
  fadeInImage: 1,
  imageWrapperDelay: 2,
};

const TYPING_SPEEDS = {
  write: 90,
  delete: 60,
} as const;

const HOLD_TIMES = {
  default: 2400,
  first: 8200,
} as const;

// ============================================================
// CONSTANTS - Content
// ============================================================
const BACKGROUND_VIDEO_SRC = "/resources/videos/hero_background_video.mp4";

const SUBTITLE_TEXTS = [
  "Camilo Canclini",
  "FullStack Dev",
  "Web Designer",
  "Database Dev",
  "Technician",
];

const SUBTITLE_PREFIX = "I am ";

// ============================================================
// ANIMATION VARIANTS
// ============================================================
/**
 * Title text animation - large centered to small left-aligned
 */
const textVariants = createTextVariants({
  normalDuration: DURATION.resizeTitles,
  normalPostDelay: DELAY.afterNormalResizeAnimationDelay,
});

/**
 * Subtitle wrapper animation - hidden to visible
 */
const subtitleVariants = createSubtitleWrapperVariants({
  showDuration: DURATION.showSubtitle,
  showDelay: DELAY.showSubtitle,
});

/**
 * Image wrapper animation - controls image container visibility
 */
const imageWrapperVariants = createImageWrapperVariants({
  visibleDuration: 1,
  imageWrapperDelay: DELAY.imageWrapperDelay,
});

/**
 * Image animation - fade in effect
 */
const imageVariants = createImageSimpleVariants({
  fadeInImageDuration: DURATION.fadeInImage,
  fadeInImageDelay: DELAY.fadeInImage,
});

// ============================================================
// COMPONENT TYPES
// ============================================================
const MotionVideo = motion.video;

// ============================================================
// MAIN COMPONENT - Hero Section
// ============================================================
/**
 * Hero section component with animated text and background video
 * Animation sequence:
 * 1. Video fades in
 * 2. "HELLO WORLD!" types out
 * 3. Title collapses to left
 * 4. Subtitle appears with rotating text
 * 5. Hero image fades in
 */
function Hero({ setShowConfigMenu }: { setShowConfigMenu: (showConfigMenu: boolean) => void }) {
  // ============================================================
  // TEXTS CONTENT (LANG BASED)
  // ============================================================
  const { locale } = useLang();
  const content = getSectionText("hero", locale);

  // ============================================================
  // STATE & REFS
  // ============================================================
  const textCtr = useAnimationControls();
  const subtitleCtr = useAnimationControls();
  const imageCtr = useAnimationControls();
  const imageWrapperCtr = useAnimationControls();
  const ranRef = useRef(false);
  const ranRef2 = useRef(false);

  // ============================================================
  // EFFECTS
  // ============================================================
  // Initialize animation states
  useEffect(() => {
    textCtr.set("large");
    subtitleCtr.set("closed");
    imageWrapperCtr.set("hidden");
    imageCtr.set("hidden");
  }, [textCtr, subtitleCtr, imageWrapperCtr, imageCtr]);

  // ============================================================
  // HANDLERS
  // ============================================================
  /**
   * Handles completion of title typing animation
   * Triggers title collapse and subtitle reveal
   */
  const handleTitleComplete = async () => {
    if (ranRef.current) return;
    ranRef.current = true;

    // Collapse title to the left
    await textCtr.start("normal").then(() => {
      // Open subtitle wrapper
      subtitleCtr.start("show");
    });
  };

  /**
   * Handles completion of subtitle first cycle
   * Triggers hero image reveal
   */
  const handleSubtitleComplete = async () => {
    if (ranRef2.current) return;
    ranRef2.current = true;

    // Reveal image wrapper then fade in image
    await imageWrapperCtr.start("visible").then(() => {
      imageCtr.start("fadeIn");

      // FIX WIDTH ERRORS POST ANIMATION (CHANGE LANGUAGE)
      textCtr.start("fix_width");
      DELAY.subHelloWorldTypingStartDelay = 2;

      //SHOW CONFIG MENU
      setShowConfigMenu(true);
    });
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <section
      id="home_section"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* ============================================================ */}
      {/* BACKGROUND VIDEO */}
      {/* ============================================================ */}
      <MotionVideo
        className="absolute inset-0 h-full w-full object-cover brightness-50"
        src={BACKGROUND_VIDEO_SRC}
        playsInline
        autoPlay
        muted
        loop
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: DURATION.videoFade, delay: DELAY.videoFade, ease: "easeOut" }}
      />

      {/* Gradient overlay */}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

      {/* ============================================================ */}
      {/* MAIN CONTENT CONTAINER */}
      {/* ============================================================ */}
      <motion.div
        className="relative z-20 flex flex-col-reverse lg:flex-row 
        h-full w-full lg:w-full justify-end pt-[20vh] lg:pt-0
        lg:items-center lg:justify-center gap-12 lg:gap-24 h-[100vh]"
        initial="start"
        animate="withImage"
        variants={createContainerVariants()}
      >
        {/* ============================================================ */}
        {/* TEXT COLUMN (Title + Subtitle) */}
        {/* ============================================================ */}
        <motion.div
          className="MAIN_TEXT flex flex-col gap-2 lg:text-left text-center"
          variants={textVariants}
          initial="large"
          animate={textCtr}
          layout="position"
          transition={{ layout: { type: "spring", stiffness: 50, damping: 10 } }}
        >
          {/* Main title */}
          <WriteText
            textToWrite={content!.title || "HELLO WORLD!"}
            className="text-[3.8em] lg:text-[6.5em] justify-center lg:justify-start flex font-semibold text-white leading-tight"
            classNameText="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
            typingSpeed={TYPING_SPEEDS.write}
            startDelay={DELAY.HelloWorldTypingStartDelay * 1000}
            onComplete={handleTitleComplete}
            as="h1"
          />

          {/* Subtitle with rotating text */}
          <motion.div
            key="hero-subtitle"
            variants={subtitleVariants}
            initial="hidden"
            animate={subtitleCtr}
            className="w-full"
            layout="position"
          >
            <WriteText
              textsToWrite={Array.isArray(content?.subtitle) ? content!.subtitle : SUBTITLE_TEXTS}
              prefix=""//{SUBTITLE_PREFIX}
              className="text-[2em] lg:text-[3em] text-white"
              classNameText="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
              typingSpeed={TYPING_SPEEDS.write}
              deleteSpeed={TYPING_SPEEDS.delete}
              holdTime={HOLD_TIMES.default}
              firstHoldTime={HOLD_TIMES.first}
              startDelay={DELAY.subHelloWorldTypingStartDelay * 1000}
              onComplete={handleSubtitleComplete}
              as="h2"
            />
          </motion.div>
        </motion.div>

        {/* ============================================================ */}
        {/* HERO IMAGE */}
        {/* ============================================================ */}
        <motion.div
          layout
          variants={imageWrapperVariants}
          initial="hidden"
          animate={imageWrapperCtr}
          className="container flex justify-center items-center mx-auto lg:mx-0"
        >
          <motion.div
            layout
            variants={imageVariants}
            initial="hidden"
            animate={imageCtr}
            className="flex justify-center items-center"
          >
            <HeroImage />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
