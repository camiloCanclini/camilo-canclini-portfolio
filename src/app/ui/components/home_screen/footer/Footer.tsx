"use client"

// ============================================================
// IMPORTS - External libraries
// ============================================================
import React from "react";
import Link from "next/link";
import { Linkedin, Github } from "lucide-react";

// ============================================================
// LANGUAGE & CONTENT
// ============================================================

import { getSectionText } from "@/i18n/pageInfo";
import { useLang } from "@/providers/LanguageProvider";

// ============================================================
// IMPORTS - Internal components
// ============================================================
import { WavesFooter } from "./WavesFooter";

// ============================================================
// TYPES
// ============================================================
type FooterIconLinkProps = {
  href: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

type FooterSectionProps = {
  className?: string;
  title?: string;
};

type FooterProps = {
  className?: string;
};

// ============================================================
// SUB-COMPONENT - Icon Link
// ============================================================
function FooterIconLink({ href, children, target, rel, ariaLabel }: FooterIconLinkProps) {
  const isExternal = target === "_blank";
  const sharedClassName = "mx-[.4em] my-[.2em] text-[2.5em] hover:scale-105 transition-transform" +
    " duration-200 border rounded-full p-2 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white transition-colors";

  if (isExternal) {
    return (
      <Link
        title={ariaLabel}
        target={target}
        rel={rel}
        href={href}
        className={sharedClassName}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} className={sharedClassName}>
      {children}
    </Link>
  );
}

// ============================================================
// SUB-COMPONENT - Section Title
// ============================================================
function SectionTitle({ title }: { title: string }) {
  return (
    <>
      <div className="text-[3em] text-center">{title}</div>
      <div className="w-3/5 mx-auto h-px bg-gradient-to-r from-transparent via-white to-transparent mb-[1em] lg:mb-0"></div>
    </>
  );
}

// ============================================================
// SUB-COMPONENT - Social Medias Section
// ============================================================
export function FooterSocialMedias({ className, title }: FooterSectionProps) {
  return (
    <div className={`${className ?? ""}`}>
      <SectionTitle title={title ?? "Social Medias"} />
      <div className="info-text my-4 box-border flex w-full items-center justify-center px-[3.4em] text-[2em]">
        {/* GitHub link */}
        <FooterIconLink
          href="https://github.com/camiloCanclini?tab=repositories"
          target="_blank"
          ariaLabel="GitHub Profile"
          rel="noreferrer noopener nofollow"
        >
          <Github />
        </FooterIconLink>

        {/* LinkedIn link */}
        <FooterIconLink
          href="https://www.linkedin.com/in/camilo-canclini-635110220/"
          target="_blank"
          rel="noreferrer noopener nofollow"
          ariaLabel="LinkedIn Profile"
        >
          <Linkedin />
        </FooterIconLink>
      </div>
    </div>
  );
}

// ============================================================
// SUB-COMPONENT - About Repository Section
// ============================================================
export function FooterAboutRepo({ className, title }: FooterSectionProps) {
  return (
    <div className={`${className ?? ""}`}>
      <SectionTitle title={title ?? "About this Repository"} />
      <div className="info-text my-4 box-border flex w-full items-center justify-center  text-[2em]">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-[0.9em] leading-relaxed lg:px-10 lg:py-auto w-[60%] lg:w-full">
            I leave the code and resources of this repo in my github, if you
            need copy some element or see how is made the code, feel free to
            visit the next link💜
          </p>

          <FooterIconLink
            href="https://github.com/camiloCanclini/camilo_canclini_portfolio"
            target="_blank"
            ariaLabel="Actual repository of this portfolio"
            rel="noreferrer noopener nofollow"
          >
            <Github />
          </FooterIconLink>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SUB-COMPONENT - Contact Info Section
// ============================================================
export function FooterContactInfo({ className, title }: FooterSectionProps) {

  return (
    <div className={`${className ?? ""}`}>
      <SectionTitle title={title ?? "Other pages"} />
      <div className="info-text my-4 box-border flex w-full items-center justify-center px-[3.4em] text-[2em]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-center justify-center gap-2">
            <Link
              href="/"
              className="text-[1.1em] hover:underline hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
              rel="noreferrer nofollow"
            >
              Home Page
            </Link>
            <Link
              href="/legal/terms_and_conditions"
              className="text-[1.1em] hover:underline hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
              rel="noreferrer nofollow"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/legal/privacy_policy"
              className="text-[1.1em] hover:underline hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
              rel="noreferrer nofollow"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT - Footer Section
// ============================================================
export default function Footer({ className }: FooterProps) {
  // ============================================================
  // TEXTS CONTENT (LANG BASED)
  // ============================================================
  const { locale } = useLang();
  const content = getSectionText("footer", locale);

  return (
    <>
      {/* Wave decoration */}
      <WavesFooter className="h-20 lg:h-28 w-full" />

      {/* Footer content */}
      <footer
        className={`bg-white dark:bg-black text-white flex lg:flex-row flex-col w-full px-0 py-[10vh] py-[10vh] text-[8px] ${className ?? ""
          }`}
      >
        <FooterSocialMedias title={content!.content.titleSection1 || "Social Medias"} className="lg:w-1/3 w-full p-6 px-10 text-theme-primary dark:text-themedark-primary" />
        <FooterAboutRepo title={content!.content.titleSection2 || "About this Repository"} className="lg:w-1/3 w-full p-6 px-10 text-theme-primary dark:text-themedark-primary" />
        <FooterContactInfo title={content!.content.titleSection3 || "Other pages"} className="lg:w-1/3 w-full p-6 px-10 text-theme-primary dark:text-themedark-primary" />
      </footer>
    </>
  );
}
