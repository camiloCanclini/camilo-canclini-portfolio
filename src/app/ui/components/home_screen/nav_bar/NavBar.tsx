"use client";

// ============================================================
// EXTERNAL DEPENDENCIES
// ============================================================
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// ============================================================
// INTERNAL COMPONENTS
// ============================================================
import MenuBtn from "./menu_btn/MenuBtn";

// ============================================================
// STYLES
// ============================================================
import "./NavBar.css";


// ============================================================
// LANGUAGE & CONTENT
// ============================================================

import { getSectionText } from "@/i18n/pageInfo";
import { useLang } from "@/providers/LanguageProvider";
import Link from "next/link";

// ============================================================
// TYPES
// ============================================================
interface NavOptionProps {
  label: string;
  link: string;
}

type NavOption = {
  label: string;
  link: string;
};

// ============================================================
// CONSTANTS
// ============================================================
const SCROLL_THRESHOLD = 300;
const NAVBAR_Z_INDEX = 999;

/* const NAV_OPTIONS: NavOption[] = [
  { label: "Projects", link: "#projects_section" },
  { label: "About Me", link: "#about_me_section" },
  { label: "Career", link: "#carrer_section" },
  { label: "Skills", link: "#skills_section" },
  { label: "Contact Me", link: "#contact_me_section" },
]; */

// ============================================================
// SUB-COMPONENT - Nav Option
// ============================================================
/**
 * Individual navigation option link
 * Features hover animation with fading gradient effect
 */
function NavOption({ label, link }: NavOptionProps) {
  return (
    <Link
      href={link}
      className="fading-5 nav_option text-lg px-6 h-full flex items-center justify-center grow"
    >
      {label}
    </Link>
  );
}

// ============================================================
// MAIN COMPONENT - NavBar
// ============================================================
/**
 * Main navigation bar component
 * Features:
 * - Auto-hide on scroll down (after 300px)
 * - Responsive design (desktop menu / mobile hamburger)
 * - Theme-aware styling
 */
export default function NavBar({ scrollEffect }: { scrollEffect?: boolean }) {
  const pathname = usePathname();

  // Determinamos si el efecto debe estar activo:
  // Si se pasa la prop, manda la prop. Si no, solo en la home ("/").
  const isEffectActive = scrollEffect !== undefined ? scrollEffect : pathname === "/";

  // ============================================================
  // STATE
  // ============================================================
  // Si el efecto está activo, inicia oculto (false). Si no, siempre visible (true).
  // Nota: Ajustamos segun la lógica de CSS donde show-nav es top: -100% y hide-nav es top: 0
  // Para evitar confusión, vamos a usar un nombre de estado más claro internamente o mantener la lógica del CSS.
  // En tu CSS actual: .show-nav { top: -100% } y .hide-nav { top: 0 }
  // Por lo tanto, si qeremos que se VEA, necesitamos que showNavbar sea FALSE (clase hide-nav).
  const [isNavHidden, setIsNavHidden] = useState(isEffectActive);

  // ============================================================
  // EFFECTS
  // ============================================================
  // Handle navbar visibility on scroll
  useEffect(() => {
    if (!isEffectActive) {
      setIsNavHidden(false);
      return;
    }

    const handleScroll = () => {
      setIsNavHidden(window.scrollY < SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isEffectActive]);

  const { locale } = useLang();
  const sectionText = getSectionText("nav_bar", locale);

  if (!sectionText) return null;

  const { content } = sectionText;

  const navOptions: NavOption[] = [
    { label: content.projects || "Projects", link: "/#projects_section" },
    { label: content.career || "Career", link: "/#carrer_section" },
    { label: content.skills || "Skills", link: "/#skills_section" },
    { label: content.contact || "Contact Me", link: "/#contact_me_section" },
  ];
  // ============================================================
  // RENDER
  // ============================================================
  return (
    <nav
      id="nav_container"
      style={{ zIndex: NAVBAR_Z_INDEX }}
      className={`flex items-center px-20 h-16 w-full fixed ${isNavHidden ? "show-nav" : "hide-nav"
        } text-theme-primary bg-white dark:text-themedark-primary dark:bg-themedark-bg shadow-md dark:shadow-white/10 border-t-0`}
    >
      {/* ============================================================ */}
      {/* BRAND NAME */}
      {/* ============================================================ */}
      <Link href="/" className="text-2xl">Camilo Canclini</Link>

      {/* ============================================================ */}
      {/* NAVIGATION OPTIONS */}
      {/* ============================================================ */}
      <div className="nav_options grow h-full items-center flex ml-auto max-w-3xl justify-end">
        {/* Desktop menu (visible >= 1150px) */}
        <div className="hidden xl:flex h-full items-center">
          {navOptions.map((option) => (
            <NavOption key={option.link} label={option.label} link={option.link} />
          ))}
        </div>

        {/* Mobile/Tablet menu (visible < 1150px) */}
        <div className="flex xl:hidden items-center h-full">
          <MenuBtn />
        </div>
      </div>
    </nav>
  );
}
