"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type NavOption = {
    label: string;
    link: string;
};

type MobileMenuProps = {
    isOpen: boolean;
    onClose: () => void;
    navOptions: NavOption[];
    topOffset?: number; // altura del navbar (px)
};

export default function MobileMenu({
    isOpen,
    onClose,
    navOptions,
    topOffset = 64, // tu navbar es h-16 => 64px
}: MobileMenuProps) {
    // Cerrar con ESC
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen, onClose]);

    // Variants (drop desde arriba)
    const panelVariants = {
        closed: { height: 0, opacity: 0 },
        open: {
            height: "auto",
            opacity: 1,
            transition: { duration: 0.25, ease: "easeOut" },
        },
        exit: {
            height: 0,
            opacity: 0,
            transition: { duration: 0.2, ease: "easeIn" },
        },
    };

    const itemVariants = {
        closed: { opacity: 0, y: -8 },
        open: { opacity: 1, y: 0 },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay (click afuera) */}
                    <motion.button
                        type="button"
                        aria-label="Close menu overlay"
                        className="fixed inset-0 z-[998] bg-black/30 backdrop-blur-[2px] xl:hidden"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.15 } }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    />

                    {/* Panel */}
                    <motion.div
                        className="fixed left-0 right-0 z-[999] xl:hidden"
                        style={{ top: topOffset }}
                        initial="closed"
                        animate="open"
                        exit="exit"
                        variants={panelVariants}
                    >
                        <div className="mx-3 mt-2 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg dark:border-white/10 dark:bg-themedark-bg">
                            <div className="p-2">
                                <motion.ul
                                    className="flex flex-col"
                                    initial="closed"
                                    animate="open"
                                    variants={{
                                        open: { transition: { staggerChildren: 0.05 } },
                                        closed: {},
                                    }}
                                >
                                    {navOptions.map((opt) => (
                                        <motion.li key={opt.link} variants={itemVariants}>
                                            <Link
                                                href={opt.link}
                                                onClick={onClose}
                                                className="block rounded-xl px-4 py-3 text-base font-medium text-theme-primary hover:bg-black/5 dark:text-themedark-primary dark:hover:bg-white/10"
                                            >
                                                {opt.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </div>

                            {/* Divider + CTA opcional */}
                            <div className="border-t border-black/10 p-2 dark:border-white/10">
                                <button
                                    onClick={onClose}
                                    className="w-full rounded-xl px-4 py-3 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}