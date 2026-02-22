"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Wave from "react-wavify";
import { useTheme } from "next-themes";

type WavesFooterProps = {
  className?: string;
  heightClassName?: string; // ej: "h-20 lg:h-28"
  distortion?: number; // 0..20 (sutil)
};

export function WavesFooter({
  className,
}: WavesFooterProps) {

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className={`${className} relative container-waves`}>
      <Wave fill='url(#gradientwave)'
        paused={false}
        style={{ display: 'flex' }}
        options={{
          height: 10,
          amplitude: 20,
          speed: 0.15,
          points: 10
        }}
        className="absolute -top-[80px]"
      >
        <defs>
          <linearGradient id="gradientwave" gradientTransform="rotate(90)">
            <stop offset="10%" stopColor={isDark ? "#141D38" : "#fCfCfC"} />
            <stop offset="90%" stopColor={isDark ? "#273970" : "#DDD"} />
          </linearGradient>
        </defs>
      </Wave>
      <Wave fill="url(#gradient2)"

        gradientUnits=""
        paused={false}
        style={{ display: 'flex' }}
        options={{
          height: 40,
          amplitude: 10,
          speed: 0.1,
          points: 8
        }}
        className="absolute -top-[40px]"
      >
        <defs>
          <linearGradient id="gradient2" gradientTransform="rotate(90)">
            <stop offset="10%" stopColor={isDark ? "#1A2545" : "#FAFAFA"} />
            <stop offset="90%" stopColor={isDark ? "#0D1325" : "#FFF"} />
          </linearGradient>
        </defs>
      </Wave>
      <Wave fill={isDark ? "#000" : "#FFF"}
        paused={false}
        style={{ display: 'flex' }}
        options={{
          height: 50,
          amplitude: 15,
          speed: 0.05,
          points: 10
        }}
        className="absolute"
      />
    </div>
  );
}
