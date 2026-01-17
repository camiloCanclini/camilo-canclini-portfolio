"use client";
import { useEffect, useState } from "react";
import MenuBtn from "./menu_btn/MenuBtn";
import "./NavBar.css";

interface NavOptionProps {
  label: string;
  link: string;
}

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

export default function NavBar() {
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => setShowNavbar(window.scrollY < 300);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="nav_container"
      style={{ zIndex: 999 }}
      className={
        "flex items-center px-20 h-16 w-full fixed " +
        (showNavbar ? "show-nav" : "hide-nav") +
        " text-theme-primary bg-theme-bg dark:text-themedark-primary dark:bg-themedark-bg"
      }
    >
      <p className="text-2xl">Camilo Canclini</p>

      <div className="nav_options grow h-full items-center flex ml-auto max-w-3xl justify-end">
        {/* DESKTOP (visible >= 1150px) */}
        <div className="hidden xl:flex h-full items-center">
          <NavOption label="Projects" link="#projects_section" />
          <NavOption label="About Me" link="#about_me_section" />
          <NavOption label="Career" link="#carrer_section" />
          <NavOption label="Skills" link="#skills_section" />
          <NavOption label="Contact Me" link="#contact_me_section" />
        </div>

        {/* MOBILE/TABLET (visible < 1150px) */}
        <div className="flex xl:hidden items-center h-full">
          <MenuBtn />
        </div>
      </div>
    </nav>
  );
}
