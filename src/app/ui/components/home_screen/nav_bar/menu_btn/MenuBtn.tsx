"use client";

type MenuBtnProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function MenuBtn({ isOpen, onToggle }: MenuBtnProps) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      onClick={onToggle}
      className="inline-flex items-center justify-center rounded-xl px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
    >
      {/* iconito hamburguesa (minimal) */}
      <div className="flex flex-col gap-1.5">
        <span
          className={`block h-[2px] w-6 bg-current transition-transform duration-200 ${isOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
        />
        <span
          className={`block h-[2px] w-6 bg-current transition-opacity duration-200 ${isOpen ? "opacity-0" : "opacity-100"
            }`}
        />
        <span
          className={`block h-[2px] w-6 bg-current transition-transform duration-200 ${isOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
        />
      </div>
    </button>
  );
}