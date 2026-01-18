"use client";

// ============================================================
// EXTERNAL DEPENDENCIES
// ============================================================
import { useEffect, useState } from "react";

// ============================================================
// INTERNAL COMPONENTS
// ============================================================
import MenuBtn from "./menu_btn/MenuBtn";

// ============================================================
// STYLES
// ============================================================
import "./NavBar.css";

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

const NAV_OPTIONS: NavOption[] = [
  { label: "Projects", link: "#projects_section" },
  { label: "About Me", link: "#about_me_section" },
  { label: "Career", link: "#carrer_section" },
  { label: "Skills", link: "#skills_section" },
  { label: "Contact Me", link: "#contact_me_section" },
];

// ============================================================
// SUB-COMPONENT - Nav Option
// ============================================================
/**
 * Individual navigation option link
 * Features hover animation with fading gradient effect
 */
function NavOption({ label, link }: NavOptionProps) {
  return (
    <a
      href={link}
      className="fading-5 nav_option text-lg px-6 h-full flex items-center justify-center grow"
    >
      {label}
    </a>
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
export default function NavBar() {
  // ============================================================
  // STATE
  // ============================================================
  const [showNavbar, setShowNavbar] = useState(true);

  // ============================================================
  // EFFECTS
  // ============================================================
  // Handle navbar visibility on scroll
  useEffect(() => {
    const handleScroll = () => setShowNavbar(window.scrollY < SCROLL_THRESHOLD);
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <nav
      id="nav_container"
      style={{ zIndex: NAVBAR_Z_INDEX }}
      className={`flex items-center px-20 h-16 w-full fixed ${
        showNavbar ? "show-nav" : "hide-nav"
      } text-theme-primary bg-theme-bg dark:text-themedark-primary dark:bg-themedark-bg`}
    >
      {/* ============================================================ */}
      {/* BRAND NAME */}
      {/* ============================================================ */}
      <p className="text-2xl">Camilo Canclini</p>

      {/* ============================================================ */}
      {/* NAVIGATION OPTIONS */}
      {/* ============================================================ */}
      <div className="nav_options grow h-full items-center flex ml-auto max-w-3xl justify-end">
        {/* Desktop menu (visible >= 1150px) */}
        <div className="hidden xl:flex h-full items-center">
          {NAV_OPTIONS.map((option) => (
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
