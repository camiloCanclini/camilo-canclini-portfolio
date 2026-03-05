import { motion, useInView, AnimatePresence } from "framer-motion";
import { RefObject, useState } from "react";

export function SectionFloatingButton(
    {
        sectionRef,
        children,
        animatedText,
        link
    }:
        {
            sectionRef: RefObject<HTMLDivElement>,
            children: React.ReactNode
            animatedText?: string
            link?: string
        }) {
    const isInView = useInView(sectionRef, {
        amount: 0.1,
        margin: "0px 0px 0px 0px",
        once: false
    });
    const [isHovered, setIsHovered] = useState(false);
    return (
        <AnimatePresence>
            {isInView && (
                <motion.a
                    layout
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 80 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{
                        position: "fixed",
                        bottom: "30px",
                        right: "30px",
                        zIndex: 1000,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    className="FLOATING_BUTTON flex items-center gap-2
                 border border-theme-primary bg-theme-complementary text-theme-primary 
                 dark:border-theme-complementary dark:bg-theme-primary dark:text-theme-complementary
                 p-2 rounded
                hover:text-theme-primary hover:scale-105 cursor-pointer"
                    href={link ? link : "#"}
                >
                    {/* Tooltip */}
                    <AnimatePresence>
                        {isHovered && animatedText && (
                            <motion.div
                                initial={{ opacity: 0, maxWidth: 0 }}
                                animate={{ opacity: 1, maxWidth: 200 }}
                                exit={{ opacity: 0, maxWidth: 0 }}
                                transition={{
                                    duration: 0.35,
                                    ease: "easeInOut"
                                }}
                                className="overflow-hidden whitespace-nowrap"
                            >
                                <span className="mx-2 text-sm">
                                    {animatedText}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="w-8 flex items-center justify-center">
                        {children}
                    </div>

                </motion.a>
            )}
        </AnimatePresence>
    );
}