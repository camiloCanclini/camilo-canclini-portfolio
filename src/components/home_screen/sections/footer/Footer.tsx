import React from "react";
import { WavesFooter } from "./WavesFooter";
import Wave from "react-wavify";

type FooterSectionProps = {
  className?: string;
};

function SectionTitle({ title }: { title: string }) {
  return (
    <>
      <div className="text-[3em] text-center">{title}</div>
      <div className="w-3/5 mx-auto h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
    </>
  );
}

export function FooterSocialMedias({ className }: FooterSectionProps) {
  return (
    <div className={`${className ?? ""}`}>
      <SectionTitle title="Social Medias" />
      <div className="info-text my-4 box-border flex w-full items-center justify-center px-[3.4em] text-[2em]">
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://github.com/camiloCanclini?tab=repositories"
          className="mx-[.4em] my-[.2em] text-[2.5em] hover:scale-105 transition-transform duration-200"
        >
          <i className="fa fa-github" aria-hidden="true" />
        </a>

        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://www.linkedin.com/in/camilo-canclini-635110220/"
          className="mx-[.4em] my-[.2em] text-[2.5em] hover:scale-105 transition-transform duration-200"
        >
          <i className="fa fa-linkedin-square" aria-hidden="true" />
        </a>
{/* 
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://www.instagram.com/camilo_canclini/"
          className="mx-[.4em] my-[.2em] text-[2.5em] hover:scale-105 transition-transform duration-200"
        >
          <i className="fa fa-instagram" aria-hidden="true" />
        </a> */}
      </div>
    </div>
  );
}

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

          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://github.com/camiloCanclini/camilo_canclini_portfolio"
            className="mx-[1em] my-[.2em] inline-flex text-[2.5em] hover:scale-105 transition-transform duration-200"
          >
            <i className="fa-brands fa-square-github" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function FooterContactInfo({ className }: FooterSectionProps) {
  return (
    <div className={`${className ?? ""}`}>
      <SectionTitle title="Contact Info" />
      <div className="info-text my-4 box-border flex w-full items-center justify-center px-[3.4em] text-[2em]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-2">
            <i className="fa-solid fa-envelope text-[1.4em]" aria-hidden="true" />
            <p className="text-[1.1em]">camilocanclini@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <>
      <WavesFooter className="h-20 md:h-28 w-full" />
      <footer
        className={`bg-black text-white flex w-full px-0 py-[1em] pt-[10vh] text-[8px] ${
          className ?? ""
        }`}
      >
        <FooterSocialMedias className="w-1/3 p-6 px-10" />
        <FooterAboutRepo className="w-1/3 p-6 px-10"/>
        <FooterContactInfo className="w-1/3 p-6 px-10"/>
      </footer>
    </>
  );
}
