// ============================================================
// IMPORTS - External libraries
// ============================================================
import React from "react";
import Link from "next/link";
import { Linkedin, Github } from "lucide-react";

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
};

type FooterSectionProps = {
  className?: string;
};

type FooterProps = {
  className?: string;
};

// ============================================================
// SUB-COMPONENT - Icon Link
// ============================================================
function FooterIconLink({ href, children, target, rel }: FooterIconLinkProps) {
  const isExternal = target === "_blank";
  const sharedClassName = "mx-[.4em] my-[.2em] text-[2.5em] hover:scale-105 transition-transform duration-200 border rounded-full p-2 hover:bg-white hover:text-black transition-colors";

  if (isExternal) {
    return (
      <a
        target={target}
        rel={rel}
        href={href}
        className={sharedClassName}
      >
        {children}
      </a>
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
      <div className="w-3/5 mx-auto h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
    </>
  );
}

// ============================================================
// SUB-COMPONENT - Social Medias Section
// ============================================================
export function FooterSocialMedias({ className }: FooterSectionProps) {
  return (
    <div className={`${className ?? ""}`}>
      <SectionTitle title="Social Medias" />
      <div className="info-text my-4 box-border flex w-full items-center justify-center px-[3.4em] text-[2em]">
        {/* GitHub link */}
        <FooterIconLink
          href="https://github.com/camiloCanclini?tab=repositories"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Github />
        </FooterIconLink>

        {/* LinkedIn link */}
        <FooterIconLink
          href="https://www.linkedin.com/in/camilo-canclini-635110220/"
          target="_blank"
          rel="noreferrer noopener"
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
export function FooterAboutRepo({ className }: FooterSectionProps) {
  return (
    <div className={`${className ?? ""}`}>
      <SectionTitle title="About this Repository" />
      <div className="info-text my-4 box-border flex w-full items-center justify-center px-[3.4em] text-[2em]">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-[0.9em] leading-relaxed px-10">
            I leave the code and resources of this repo in my github, if you
            need copy some element or see how is made the code, feel free to
            visit the next link💜
          </p>

          <FooterIconLink
            href="https://github.com/camiloCanclini/camilo_canclini_portfolio"
            target="_blank"
            rel="noreferrer noopener"
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
export function FooterContactInfo({ className }: FooterSectionProps) {
  return (
    <div className={`${className ?? ""}`}>
      <SectionTitle title="Other pages" />
      <div className="info-text my-4 box-border flex w-full items-center justify-center px-[3.4em] text-[2em]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-2">
            <Link 
              href="/terms-and-conditions" 
              className="text-[1.1em] hover:underline hover:text-blue-200 transition-colors"
            >
              Terms and Conditions
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
export function Footer({ className }: FooterProps) {
  return (
    <>
      {/* Wave decoration */}
      <WavesFooter className="h-20 md:h-28 w-full" />
      
      {/* Footer content */}
      <footer
        className={`bg-black text-white flex w-full px-0 py-[1em] py-[10vh] text-[8px] ${
          className ?? ""
        }`}
      >
        <FooterSocialMedias className="w-1/3 p-6 px-10" />
        <FooterAboutRepo className="w-1/3 p-6 px-10" />
        <FooterContactInfo className="w-1/3 p-6 px-10" />
      </footer>
    </>
  );
}
