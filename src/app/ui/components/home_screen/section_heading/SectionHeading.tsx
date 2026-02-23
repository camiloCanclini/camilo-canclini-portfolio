// ============================================================
// TYPES
// ============================================================
interface SectionHeadingProps {
  heading: string;
  subheading: string;
  className?: string;
}

// ============================================================
// MAIN COMPONENT - Section Heading
// ============================================================
/**
 * Reusable section heading component with title and subtitle
 * Provides consistent styling across all sections
 */
export function SectionHeading({ heading, subheading, className = "" }: SectionHeadingProps) {
  return (
    <div className={`max-w-full lg:max-w-7xl mx-auto py-20 px-0 lg:px-8 lg:px-10 ${className}`}>
      {/* Main section title */}
      <h2 className="section-title text-center lg:text-left lg:text-[6em] text-[3.2em] mb-4 text-black dark:text-white max-w-4xl">
        {heading}
      </h2>

      {/* Section subtitle */}
      <p className="section-subtitle text-center lg:text-left text-neutral-700 dark:text-neutral-300 lg:text-[2em] text-[1.3em] lg:pl-6">
        {subheading}
      </p>
    </div>
  );
}