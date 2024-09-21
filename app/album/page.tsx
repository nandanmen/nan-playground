"use client";

import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  transform,
  AnimationPlaybackControls,
  useAnimationControls,
} from "framer-motion";
import { useEffect, useRef, useState, useId } from "react";
import styles from "./styles.module.css";

const THRESHOLD = 100;

const oldRect = {
  x: 622.5,
  y: 394.5,
  width: 64,
  height: 64,
  top: 394.5,
  right: 686.5,
  bottom: 458.5,
  left: 622.5,
};

const oldCenter = {
  x: oldRect.x + oldRect.width / 2,
  y: oldRect.y + oldRect.height / 2,
};

const newRect = {
  x: 666.5,
  y: 426.5,
  width: 192,
  height: 192,
  top: 426.5,
  right: 858.5,
  bottom: 618.5,
  left: 666.5,
};

const newCenter = {
  x: newRect.x + newRect.width / 2,
  y: newRect.y + newRect.height / 2,
};

const diff = {
  x: newRect.x - oldRect.x,
  y: 96,
};

export default function Threads() {
  const [open, setOpen] = useState(false);

  const rotateControls = useAnimationControls();
  const controls = useAnimationControls();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 space-y-4">
      <div className="overflow-hidden border-[12px] border-black rounded-[54px] h-[700px] w-[344px] py-12 px-5 relative">
        <ul className="space-y-4">
          <Item />
          <li className="flex gap-3 items-center">
            <div className="w-16 h-16 bg-neutral-200 rounded-full shrink-0" />
            <motion.div
              animate={controls}
              onClick={async () => {
                if (open) {
                  rotateControls.start({
                    rotate: 0,
                    transition: {
                      type: "spring",
                      bounce: 0,
                    },
                  });
                  controls.start({
                    offsetDistance: "0%",
                    width: 64,
                    height: 64,
                    // transform: `scale(1) translateZ(0px)`,
                    transition: {
                      type: "spring",
                      stiffness: 26.7,
                      damping: 4.1,
                      mass: 0.2,
                    },
                  });
                } else {
                  controls.start({
                    offsetDistance: "100%",
                    width: 192,
                    height: 192,
                    // transform: `scale(3) translateZ(0px)`,
                    transition: {
                      type: "spring",
                      stiffness: 26.7,
                      damping: 4.1,
                      mass: 0.2,
                    },
                  });
                  rotateControls.start({
                    rotate: 360,
                    transition: {
                      repeat: Infinity,
                      ease: "linear",
                      type: "tween",
                      duration: 4,
                      delay: 0.7,
                    },
                  });
                }
                setOpen(!open);
              }}
              className={`absolute w-16 h-16 shrink-0 ${open ? "z-30" : ""}`}
              style={{
                offsetPath: "path('M32 32C96.5 -25.5 132.865 26.0836 140 192')",
              }}
            >
              <motion.div className="w-full h-full" animate={rotateControls}>
                <div className={styles.cd} />
              </motion.div>
            </motion.div>
            <div className="space-y-2 w-full">
              <div className="h-6 w-[120px] bg-neutral-200 rounded" />
              <div className="h-6 w-full bg-neutral-200 rounded" />
            </div>
          </li>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </ul>
        <motion.div
          animate={{
            y: open ? "0%" : "100%",
          }}
          transition={{
            type: "spring",
            stiffness: 26.7,
            damping: 4.1,
            mass: 0.2,
          }}
          className="absolute inset-0 top-24 rounded-t-[54px] h-full bg-white py-12 px-10 flex flex-col items-center"
        >
          <div className="pt-20 h-[260px]" />
          <ul className="w-full space-y-2">
            <div className="h-6 bg-neutral-200 rounded" />
            <div className="h-6 bg-neutral-200 rounded" />
            <div className="h-6 bg-neutral-200 rounded" />
            <div className="h-6 bg-neutral-200 rounded" />
            <div className="h-6 bg-neutral-200 rounded" />
            <div className="h-6 bg-neutral-200 rounded" />
            <div className="h-6 bg-neutral-200 rounded" />
          </ul>
        </motion.div>
      </div>
      {/* <div
        style={{
          position: "fixed",
          pointerEvents: "none",
          top: oldRect.top - 16,
          left: oldRect.left,
          width: oldRect.width,
          height: oldRect.height,
          backgroundColor: "black",
        }}
      />
      <div
        style={{
          position: "fixed",
          pointerEvents: "none",
          top: newRect.top - 16,
          left: newRect.left,
          width: newRect.width,
          height: newRect.height,
          backgroundColor: "black",
        }}
      /> */}
      {/* <svg
        style={{
          position: "fixed",
          top: oldRect.top - 16,
          left: oldRect.left,
          pointerEvents: "none",
          zIndex: 40,
        }}
        width="300"
        height="300"
      >
        <path
          d="M32 32C96.5 -25.5 132.865 26.0836 140 128"
          stroke="black"
          strokeWidth={3}
          fill="none"
        />
      </svg> */}
    </main>
  );
}

function Item() {
  return (
    <li className="flex gap-3 items-center">
      <div className="w-16 h-16 bg-neutral-200 rounded-full shrink-0" />
      <div className="space-y-2 w-full">
        <div className="h-6 w-[120px] bg-neutral-200 rounded" />
        <div className="h-6 w-full bg-neutral-200 rounded" />
      </div>
    </li>
  );
}
