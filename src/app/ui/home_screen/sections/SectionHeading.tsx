import React from "react";

interface SectionHeadingProps {
  heading: string;
  subheading: string;
  className?: string|"";
}

export function SectionHeading({ heading, subheading, className}: SectionHeadingProps) {
  return (
    <div className={"max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 " + className}>
      <h2 className="text-[6em] mb-4 text-black dark:text-white max-w-4xl">
        {heading}
      </h2>
      <p className="text-neutral-700 dark:text-neutral-300 text-[2em] pl-6">
        {subheading}
      </p>
    </div>
  );
}