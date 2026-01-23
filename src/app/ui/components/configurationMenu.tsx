"use client";

// ============================================================
// EXTERNAL DEPENDENCIES
// ============================================================
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Settings as SettingIcon, Sun, Moon, ChevronDown } from "lucide-react";
import Image from "next/image";

// ============================================================
// TYPES
// ============================================================
type Language = {
  code: string;
  name: string;
  flag: string;
};

// ============================================================
// CONSTANTS
// ============================================================
const LANGUAGES: Language[] = [
  { code: "es", name: "Español", flag: "/resources/img/icons/others/esp_flag.jpg" },
  { code: "en", name: "English", flag: "/resources/img/icons/others/eng_flag.jpg" },
];

const FLAG_IMAGE_SIZE = { width: 24, height: 16 };

// ============================================================
// ANIMATION VARIANTS
// ============================================================
/**
 * Main menu container animation - fades in from right
 */
const menuAnimation = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3, ease: "easeOut" },
};

/**
 * Language dropdown animation - fades in from top
 */
const dropdownAnimation = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};

// ============================================================
// MAIN COMPONENT - Configuration Menu
// ============================================================
/**
 * Global configuration menu for theme switching and language selection
 * Features:
 * - Theme toggle (light/dark mode)
 * - Language selector with flag icons
 * - Animated dropdown menus
 */
export default function ConfigurationMenu() {
  // ============================================================
  // STATE
  // ============================================================
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState("es");
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  // ============================================================
  // COMPUTED VALUES
  // ============================================================
  const currentTheme = theme === "system" ? systemTheme : theme;
  const selectedLang = LANGUAGES.find((lang) => lang.code === language);

  // ============================================================
  // EFFECTS
  // ============================================================
  // Ensure component is mounted before rendering (avoids hydration mismatch)
  useEffect(() => setMounted(true), []);

  // ============================================================
  // HANDLERS
  // ============================================================
  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode);
    setIsLangOpen(false);
  };

  // ============================================================
  // RENDER
  // ============================================================
  // Prevent render before mount to avoid theme mismatch
  if (!mounted) return null;

  return (
    <div className="absolute top-0 right-4 flex flex-col items-end p-2">
      {/* ============================================================ */}
      {/* SETTINGS BUTTON */}
      {/* ============================================================ */}
      <div
        className="bg-white dark:bg-themedark-bg hover:bg-theme-primary dark:hover:bg-themedark-primary
                      p-2 rounded text-theme-primary dark:text-themedark-primary hover:text-theme-complementary dark:hover:text-themedark-complementary
                      border border-theme-primary/50 dark:border-themedark-primary/50
                      shadow-md rounded-full cursor-pointer
                      flex items-center hover:scale-110 transition-transform duration-200"
        style={{ display: "flex", gap: 8 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <SettingIcon />
      </div>

      {/* ============================================================ */}
      {/* CONFIGURATION PANEL */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...menuAnimation}
            className="bg-white dark:bg-themedark-bg 
                        p-3 mt-2 rounded-lg text-theme-primary dark:text-themedark-primary
                        border border-theme-primary/50 dark:border-themedark-primary/50
                        shadow-md 
                        flex flex-col items-stretch gap-3"
          >
            {/* ============================================================ */}
            {/* THEME TOGGLE BUTTON */}
            {/* ============================================================ */}
            <div className="flex items-center w-full gap-4">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-full gap-2 px-3 py-1.5 rounded 
                          bg-white dark:bg-themedark-bg border border-theme-primary/20 dark:border-themedark-primary/20
                          hover:bg-theme-primary/10 dark:hover:bg-themedark-primary/20
                          transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {currentTheme === "dark" ? (
                  <Moon size={22} className="text-blue-400" />
                ) : (
                  <Sun size={22} className="text-yellow-500" />
                )}
              </button>
            </div>

            {/* ============================================================ */}
            {/* LANGUAGE SELECTOR */}
            {/* ============================================================ */}
            <div className="flex items-center w-full gap-4 relative">
              <div className="w-full relative">
                {/* Language selector button */}
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded
                            bg-white dark:bg-themedark-bg border border-theme-primary/20 dark:border-themedark-primary/20
                            hover:bg-theme-primary/10 dark:hover:bg-themedark-primary/20
                            transition-colors duration-200
                            cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={selectedLang?.flag || ""}
                      alt={selectedLang?.name || ""}
                      width={FLAG_IMAGE_SIZE.width}
                      height={FLAG_IMAGE_SIZE.height}
                      className="rounded"
                    />
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isLangOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Language dropdown */}
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      {...dropdownAnimation}
                      className="absolute top-full mt-1 w-full z-10
                                bg-theme-bg dark:bg-themedark-bg
                                border border-theme-primary/20 dark:border-themedark-primary/20
                                rounded shadow-lg overflow-hidden"
                    >
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageSelect(lang.code)}
                          className={`w-full flex items-center gap-2 px-3 py-2
                                    hover:bg-theme-primary/10 dark:hover:bg-themedark-primary/10
                                    transition-colors duration-200
                                    ${
                                      language === lang.code
                                        ? "bg-theme-primary/20 dark:bg-themedark-primary/20"
                                        : ""
                                    }`}
                        >
                          <Image
                            src={lang.flag}
                            alt={lang.name}
                            width={FLAG_IMAGE_SIZE.width}
                            height={FLAG_IMAGE_SIZE.height}
                            className="rounded"
                          />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
