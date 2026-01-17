import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const icon1 = "/assets/icons/camilo.jpg";
const icon2 = "/assets/icons/camilo2.jpg";   // 👈 la que aparece al pasar el cursor

export default function HeroImage() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="h-[200px] w-[200px] md:h-[500px] md:w-[500px] cursor-pointer relative flex justify-center items-center rounded-full border-4 border-white p-4 shadow-[0px_20px_45px_rgba(0,0,0,0.35)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      <motion.img
        src={icon2}
        alt="Base"
        className="absolute inset-0 w-full h-full object-cover p-3 rounded-full"
        initial={{ opacity: 1 }}
        whileHover={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />


      <motion.img
        src={icon1}
        alt="Hover"
        className="absolute inset-0 w-full h-full object-cover p-3 rounded-full"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

    </div>
  );
}
