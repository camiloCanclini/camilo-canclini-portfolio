"use client";

import React from "react";
import { motion } from "framer-motion";
import Wave from "react-wavify";

type WavesFooterProps = {
  className?: string;
  heightClassName?: string; // ej: "h-20 md:h-28"
  distortion?: number; // 0..20 (sutil)
};

export function WavesFooter({
  className,
}: WavesFooterProps) {
  return (
    <div className={`${className} relative container-waves`}>
      <Wave fill='#1d2e54'
            paused={false}
            style={{ display: 'flex' }}
            options={{
              height: 10,
              amplitude: 20,
              speed: 0.15,
              points: 10
            }}
            className="absolute -top-[80px]"
      />
      <Wave fill='#060f24'
            paused={false}
            style={{ display: 'flex' }}
            options={{
              height: 40,
              amplitude: 10,
              speed: 0.1,
              points: 8
            }}
            className="absolute -top-[40px]"
      />
      <Wave fill='#000'
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
