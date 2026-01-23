"use client";

// ============================================================
// EXTERNAL DEPENDENCIES
// ============================================================
import * as React from "react";
import {
  type Transition,
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from "framer-motion";

// ============================================================
// TYPES
// ============================================================
type StarLayerProps = React.ComponentProps<typeof motion.div> & {
  count: number;
  size: number;
  transition: Transition;
  starColor: string;
};

type StarsBackgroundProps = React.ComponentProps<"div"> & {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColor?: string;
  pointerEvents?: boolean;
};

// ============================================================
// CONSTANTS
// ============================================================
const DEFAULT_FACTOR = 0.05;
const DEFAULT_SPEED = 50;
const DEFAULT_STAR_COLOR = "#fff";
const DEFAULT_SPRING_TRANSITION = { stiffness: 50, damping: 20 };

const STAR_LAYER_1_COUNT = 1000;
const STAR_LAYER_1_SIZE = 1;

const STAR_LAYER_2_COUNT = 400;
const STAR_LAYER_2_SIZE = 2;

const STAR_LAYER_3_COUNT = 200;
const STAR_LAYER_3_SIZE = 3;

const STAR_ANIMATION_DISTANCE = 2000;

// ============================================================
// UTILITIES
// ============================================================
/**
 * Utility function to combine class names - mini replacement for `cn`
 * Supports strings, undefined, null, false, and objects with boolean values
 */
function cx(
  ...args: Array<string | undefined | null | false | Record<string, boolean>>
) {
  const out: string[] = [];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === "string") {
      out.push(arg);
      continue;
    }

    // object form: { "class-a": true, "class-b": false }
    for (const [k, v] of Object.entries(arg)) {
      if (v) out.push(k);
    }
  }

  return out.join(" ");
}

/**
 * Generates random star positions as box-shadow values
 * @param count - Number of stars to generate
 * @param starColor - Color of the stars
 * @returns CSS box-shadow string with all star positions
 */
function generateStars(count: number, starColor: string) {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(", ");
}

// ============================================================
// SUB-COMPONENT - Star Layer
// ============================================================
/**
 * Individual star layer with infinite vertical scrolling animation
 * Uses box-shadow to render multiple stars efficiently
 */
function StarLayer({
  count = 1000,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: "linear" },
  starColor = "#fff",
  className,
  ...props
}: StarLayerProps) {
  // ============================================================
  // STATE
  // ============================================================
  const [boxShadow, setBoxShadow] = React.useState<string>("");

  // ============================================================
  // EFFECTS
  // ============================================================
  // Generate stars on mount and when parameters change
  React.useEffect(() => {
    setBoxShadow(generateStars(count, starColor));
  }, [count, starColor]);

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <motion.div
      data-slot="star-layer"
      animate={{ y: [0, -2000] }}
      transition={transition}
      className={cx("star_layer absolute top-0 left-[40vh] w-full h-[2000px]", className)}
      {...props}
    >
      {/* First star field */}
      <div
        className="absolute bg-transparent w-full rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      
      {/* Duplicate star field for seamless loop */}
      <div
        className="absolute bg-transparent w-full rounded-full top-[2000px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
    </motion.div>
  );
}

// ============================================================
// MAIN COMPONENT - Stars Background
// ============================================================
/**
 * Animated stars background with parallax effect
 * Features three layers of stars with different speeds for depth
 * Responds to mouse movement for interactive parallax
 */
function StarsBackground({
  children,
  className,
  factor = DEFAULT_FACTOR,
  speed = DEFAULT_SPEED,
  transition = DEFAULT_SPRING_TRANSITION,
  starColor = DEFAULT_STAR_COLOR,
  pointerEvents = true,
  ...props
}: StarsBackgroundProps) {
  // ============================================================
  // STATE & REFS
  // ============================================================
  const offsetX = useMotionValue(1);
  const offsetY = useMotionValue(1);

  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  // ============================================================
  // HANDLERS
  // ============================================================
  /**
   * Mouse move handler for parallax effect
   * Calculates offset based on distance from center
   */
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const newOffsetX = -(e.clientX - centerX) * factor;
      const newOffsetY = -(e.clientY - centerY) * factor;
      offsetX.set(newOffsetX);
      offsetY.set(newOffsetY);
    },
    [offsetX, offsetY, factor]
  );

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div
      data-slot="stars-background"
      className={cx(
        "overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#000_0%,_#000_100%)]",
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className={cx({ "pointer-events-none": !pointerEvents })}
      >
        {/* Layer 1: Small, fast-moving stars */}
        <StarLayer
          count={STAR_LAYER_1_COUNT}
          size={STAR_LAYER_1_SIZE}
          transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
          starColor={starColor}
        />
        
        {/* Layer 2: Medium stars, slower */}
        <StarLayer
          count={STAR_LAYER_2_COUNT}
          size={STAR_LAYER_2_SIZE}
          transition={{
            repeat: Infinity,
            duration: speed * 2,
            ease: "linear",
          }}
          starColor={starColor}
        />
        
        {/* Layer 3: Large stars, slowest */}
        <StarLayer
          count={STAR_LAYER_3_COUNT}
          size={STAR_LAYER_3_SIZE}
          transition={{
            repeat: Infinity,
            duration: speed * 3,
            ease: "linear",
          }}
          starColor={starColor}
        />
      </motion.div>
      {children}
    </div>
  );
}

// ============================================================
// EXPORTS
// ============================================================
export { StarLayer, StarsBackground, type StarLayerProps, type StarsBackgroundProps };