"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Settings as SettingIcon, Sun, Moon, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ConfigurationMenu() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState("es");
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // evita mismatch (render antes de saber el theme)

  const current = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(current === "dark" ? "light" : "dark");
  };

  const languages = [
    { code: "es", name: "Español", flag: "/resources/img/icons/others/esp_flag.jpg" },
    { code: "en", name: "English", flag: "/resources/img/icons/others/eng_flag.jpg" }
  ];

  const selectedLang = languages.find(lang => lang.code === language);

  return (
    <div className="absolute top-0 right-4 flex flex-col items-end p-2">
      <div 
        className="bg-theme-bg dark:bg-themedark-bg hover:bg-theme-primary dark:hover:bg-themedark-primary
                      p-2 rounded text-theme-primary dark:text-themedark-primary hover:text-theme-complementary dark:hover:text-themedark-complementary
                      border border-theme-primary/50 dark:border-themedark-primary/50
                      shadow-md rounded-full cursor-pointer
                      flex items-center hover:scale-110 transition-transform duration-200" 
        style={{ display: "flex", gap: 8 }}
        onClick={() => setIsOpen(!isOpen)}>
        <SettingIcon></SettingIcon>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0}}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-theme-bg dark:bg-themedark-bg 
                        p-3 mt-2 rounded-lg text-theme-primary dark:text-themedark-primary
                        border border-theme-primary/50 dark:border-themedark-primary/50
                        shadow-md 
                        flex flex-col items-stretch gap-3">
            {/* Theme Toggle */}
            <div className="flex items-center w-full gap-4">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-full gap-2 px-3 py-1.5 rounded 
                          bg-white dark:bg-themedark-bg border border-theme-primary/20 dark:border-themedark-primary/20
                          hover:bg-theme-primary/10 dark:hover:bg-themedark-primary/20
                          transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {current === "dark" ? (
                  <>
                    <Moon size={22} className="text-blue-400"/>
                  </>
                ) : (
                  <>
                    <Sun size={22} className="text-yellow-500"/>
                  </>
                )}
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center w-full gap-4 relative">
              <div className="w-full relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded
                            bg-theme-primary/10 dark:bg-themedark-primary/10
                            hover:bg-theme-primary/20 dark:hover:bg-themedark-primary/20
                            border border-theme-primary/20 dark:border-themedark-primary/20
                            transition-colors duration-200
                            cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Image 
                      src={selectedLang?.flag || ""} 
                      alt={selectedLang?.name || ""} 
                      width={24} 
                      height={16}
                      className="rounded"
                    />
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-1 w-full z-10
                                bg-theme-bg dark:bg-themedark-bg
                                border border-theme-primary/20 dark:border-themedark-primary/20
                                rounded shadow-lg overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-3 py-2
                                    hover:bg-theme-primary/10 dark:hover:bg-themedark-primary/10
                                    transition-colors duration-200
                                    ${language === lang.code ? 'bg-theme-primary/20 dark:bg-themedark-primary/20' : ''}`}
                        >
                          <Image 
                            src={lang.flag} 
                            alt={lang.name} 
                            width={24} 
                            height={16}
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
