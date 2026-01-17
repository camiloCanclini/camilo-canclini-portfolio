"use client"
import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

import WriteText from "./main_text/WriteText";

import HeroImagePersona5 from "./HeroImagePersona5";

import {
  createContainerVariants,
  createImageSimpleVariants,
  createImageWrapperVariants,
  createSubtitleWrapperVariants,
  createTextVariants,
} from "./animations";


const MotionVideo = motion.video;

// Timings in one place
const DURATION = {
  videoFade: 4,
  resizeTitles: 2,
  showSubtitle: 2,
  fadeInImage: 2,
} as const;

const DELAY = {
  videoFade: 12,           // video fade starts after 10s
  HelloWorldTypingStartDelay: 2,     // when to start typing the title
  showSubtitle: 2,    // small reveal offset in wrapper
  afterNormalResizeAnimationDelay: 2, // pause after collapsing title
  subHelloWorldTypingStartDelay: 12,  // when to start typing subtitle (relative to wrapper)
  fadeInImage: 1,
  imageWrapperDelay:2
} as const;

const textVariants = createTextVariants({
  normalDuration: DURATION.resizeTitles,
  normalPostDelay: DELAY.afterNormalResizeAnimationDelay,
});

const subtitleVariants = createSubtitleWrapperVariants({
  showDuration: DURATION.showSubtitle,
  showDelay: DELAY.showSubtitle,
});


const imageWrapperVariants = createImageWrapperVariants({
  visibleDuration: 1,
  imageWrapperDelay: DELAY.imageWrapperDelay,
});

const imageVariants = createImageSimpleVariants({
  fadeInImageDuration: DURATION.fadeInImage,
  fadeInImageDelay: DELAY.fadeInImage,
});

const backgroundVideoSrc = "/resources/videos/welcome.mp4";

function Hero() {
  const textCtr = useAnimationControls();
  const subtitleCtr = useAnimationControls();
  const imageCtr = useAnimationControls();
  const imageWrapperCtr = useAnimationControls();
  const ranRef = useRef(false);
  const ranRef2 = useRef(false);

  useEffect(() => {
    // Initial states for always-mounted wrappers
    textCtr.set("large");
    subtitleCtr.set("closed");
    imageWrapperCtr.set("hidden");
    imageCtr.set("hidden");
  }, [textCtr, subtitleCtr, imageWrapperCtr,imageCtr]);

  const handleTitleComplete = async () => {
    if (ranRef.current) return;
    ranRef.current = true;

    // 1) Collapse title to the left
    await textCtr.start("normal").then(()=>{
      // 2) Open subtitle wrapper
      subtitleCtr.start("show")

    });

  };

  const handleSubtitleComplete = async () => {
    if (ranRef2.current) return;
    ranRef2.current = true;

    // 3) Reveal image
    await imageWrapperCtr.start("visible"). then(()=>{
      imageCtr.start("fadeIn");
    });

  };

  return (
    <section
      id="home"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <MotionVideo
        className="absolute inset-0 h-full w-full object-cover brightness-50"
        src={backgroundVideoSrc}
        playsInline
        autoPlay
        muted
        loop
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: DURATION.videoFade, delay: DELAY.videoFade, ease: "easeOut" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

      <motion.div
        className="relative z-20 flex h-full w-4/5 items-center justify-center gap-12"
        initial="start"
        animate="withImage"
        variants={createContainerVariants()}
      >
        {/* Title + Subtitle column */}
        <motion.div
          className="flex flex-col gap-2"
          variants={textVariants}
          initial={false}
          animate={textCtr}
          layout="position"
          transition={{ layout: { type: "spring", stiffness: 50, damping: 10 } }}
        >
          <WriteText
            textToWrite="HELLO WORLD!"
            className="text-[7em] md:text-[9em] flex font-semibold text-white leading-tight"
            classNameText="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
            typingSpeed={90}
            startDelay={DELAY.HelloWorldTypingStartDelay * 1000}
            onComplete={handleTitleComplete}
            as="h1"
          />

          <motion.div
            key="hero-subtitle"
            variants={subtitleVariants}
            initial="hidden"
            animate={subtitleCtr}
            className="w-full"
            layout="position"
          >
            <WriteText
              // 👇 Ahora usamos modo LOOP
              textsToWrite={[
                "Camilo Canclini",
                "FullStack Dev",
                "Web Designer",
                "Database Dev",
                "Technician",
              ]}
              prefix="I am "
              className="text-[8em] text-white md:text-[5em]"
              classNameText="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
              typingSpeed={90} // velocidad de escritura
              deleteSpeed={60} // velocidad de borrado del sufijo
              holdTime={2400}  // cuánto tiempo queda cada frase escrita
              firstHoldTime={8200}
              startDelay={DELAY.subHelloWorldTypingStartDelay * 1000}
              onComplete={handleSubtitleComplete} // se ejecuta cuando termina la PRIMERA ("Camilo Canclini")
              as="h2"
            />

          </motion.div>
        </motion.div>

        {/* Image wrapper */}
        <motion.div
          layout
          variants={imageWrapperVariants}
          initial="hidden"
          animate={imageWrapperCtr}
          className="container flex justify-center items-center "
        >
          <motion.div
            layout
            variants={imageVariants}
            initial="hidden"
            animate={imageCtr}
            className="flex justify-center items-center"
          >
            {/* <HeroImage /> */}
            <HeroImagePersona5></HeroImagePersona5>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
