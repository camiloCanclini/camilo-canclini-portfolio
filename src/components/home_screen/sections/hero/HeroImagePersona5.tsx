import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import icon1 from "@assets/icons/camilo.jpg";
import icon2 from "@assets/icons/camilo2.jpg";
import "./HeroPersona5.css";

const panelVariants = {
  rest: {
    opacity: 0,
    x: 0,            // arrancando pegado al borde del círculo
    scaleX: 0.4,
  },
  hover: {
    opacity: 1,
    x: 50,           // se desplaza hacia la derecha
    scaleX: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      duration: 3.5,
      when: "beforeChildren",
      delayChildren: 0.15,
      staggerChildren: 0.08,
    },
  },
};

const iconVariants = {
  rest: { opacity: 0, y: 10, scale: 0.9, rotate: 0 },
  hover: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 250, damping: 14 },
  },
  hoverIcon: {
    scale: 1.12,
    rotate: 4, // girito a la derecha
    transition: { type: "spring", stiffness: 300, damping: 10 },
  },
};


const circleVariants = {
  rest: {
    scale: 0.95,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};


export default function HeroImagePersona5() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="
        relative flex justify-center items-center
        h-[200px] w-[200px] md:h-[500px] md:w-[500px]
        cursor-pointer rounded-full border-4 border-white p-4
        shadow-[0px_20px_45px_rgba(0,0,0,0.35)]
      "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial="rest"
      animate={hovered ? "hover" : "rest"}
    >
      {/* FOTO BASE (MISMA ANIMACIÓN QUE TENÍAS) */}
      <motion.img
        src={icon2}
        alt="Base"
        className="absolute inset-0 w-full h-full object-cover z-30 p-3 rounded-full"
        initial={{ opacity: 1 }}
        whileHover={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* FOTO HOVER (MISMA ANIMACIÓN QUE TENÍAS) */}
      <motion.img
        src={icon1}
        alt="Hover"
        className="absolute inset-0 w-full h-full object-cover z-30 p-3 rounded-full"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Círculo de fondo que aparece con el hover */}
      <motion.div
        className="absolute inset-[5px] rounded-full bg-[#f3f3f3] z-10"
        variants={circleVariants}
      />


      {/* === PANEL PERSONA 5 + REDES === */}
      <motion.div
        className="absolute left-1/3 -translate-y-1/2 z-20"
        variants={panelVariants}
      >
        {/* sombra negra del panel */}
        <div className="persona-shadow bg-black absolute inset-0 translate-x-3 translate-y-3" />

        {/* panel gris con iconos */}
        <div
          className="
            persona-panel
            relative bg-[#f3f3f3]
            flex flex-col items-end justify-start gap-6
            px-16 py-8 w-[450px] h-[350px]
          "
        >
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-[80px] text-[#0077b5] drop-shadow-[3px_3px_0_rgba(0,0,0,0.7)]"
            variants={iconVariants}
            whileHover="hoverIcon"
          >
            <FaLinkedin />
          </motion.a>

          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-[80px] text-black drop-shadow-[3px_3px_0_rgba(0,0,0,0.7)]"
            variants={iconVariants}
            whileHover="hoverIcon"
          >
            <FaGithub />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}
