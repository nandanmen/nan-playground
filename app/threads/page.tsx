"use client";

import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  transform,
  AnimationPlaybackControls,
} from "framer-motion";
import { useEffect, useRef, useState, useId } from "react";

const THRESHOLD = 100;

export default function Threads() {
  const [step, setStep] = useState<"idle" | "triggered" | "done">("idle");
  const id = useId();
  const playbackRef = useRef<AnimationPlaybackControls | null>(null);
  const y = useMotionValue(0);
  const offset = useMotionValue(78);
  const stroke = useTransform(y, [0, 30], ["#ffffff", "#404040"]);

  useEffect(() => {
    return y.on("change", (v) => {
      if (step === "idle") {
        return offset.set(transform(v, [0, THRESHOLD], [78, 8]));
      }
      if (step === "triggered" && v < THRESHOLD / 2 && !playbackRef.current) {
        playbackRef.current = animate(offset, 98, {
          type: "tween",
          duration: 1,
          onComplete: () => {
            setStep("done");
            animate(offset, 0, {
              type: "tween",
              duration: 1,
              delay: 0.5,
              onComplete: () => {
                setStep("idle");
                playbackRef.current = null;
              },
            });
          },
        });
      }
    });
  }, [step, y, offset]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 space-y-4">
      <div className="overflow-hidden border-[12px] border-black rounded-[54px] h-[700px] w-[344px] py-10 px-5 bg-neutral-950 text-neutral-50">
        <motion.div
          className="relative"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          style={{
            y,
          }}
          onPanEnd={() => {
            if (y.get() > THRESHOLD) {
              setStep("triggered");
              offset.set(12);
            }
          }}
        >
          <motion.div
            className="flex justify-center mb-10"
            style={{
              y: useTransform(y, (v) => -v / 2),
              scale: useTransform(y, [THRESHOLD, THRESHOLD + 40], [1, 1.4]),
            }}
          >
            <svg
              width="64"
              viewBox="0 0 15 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="1.75"
            >
              <defs>
                <mask id={id}>
                  <rect width="15" height="18" fill="black" />
                  <path
                    d="M14 5.90968C14 5.90968 12.8403 1.19575 7.91139 1.00639C2.98244 0.817033 1.42001 4.88117 1.12694 6.92737C0.833871 8.97357 0.881464 13.037 3.12748 15.2537C5.3735 17.4704 8.11821 17.075 9.56208 16.734C11.006 16.3929 12.9214 15.2174 13.2172 12.8483C13.5129 10.4792 12.0864 8.96269 9.47703 8.50011C6.86763 8.03754 5.28195 8.77766 5.07004 10.6679C4.85814 12.5581 8.25931 13.7735 9.65099 11.9232C11.0427 10.0729 10.5208 7.01987 9.91193 6.18724C9.30307 5.3546 7.91139 4.98454 7.04159 5.16957C5.75156 5.444 5.21501 6.37227 5.21501 6.37227"
                    stroke="currentColor"
                  />
                </mask>
              </defs>
              <motion.path
                d="M14 5.90968C14 5.90968 12.8403 1.19575 7.91139 1.00639C2.98244 0.817033 1.42001 4.88117 1.12694 6.92737C0.833871 8.97357 0.881464 13.037 3.12748 15.2537C5.3735 17.4704 8.11821 17.075 9.56208 16.734C11.006 16.3929 12.9214 15.2174 13.2172 12.8483C13.5129 10.4792 12.0864 8.96269 9.47703 8.50011C6.86763 8.03754 5.28195 8.77766 5.07004 10.6679C4.85814 12.5581 8.25931 13.7735 9.65099 11.9232C11.0427 10.0729 10.5208 7.01987 9.91193 6.18724C9.30307 5.3546 7.91139 4.98454 7.04159 5.16957C5.75156 5.444 5.21501 6.37227 5.21501 6.37227"
                stroke={step === "idle" ? stroke : undefined}
                className={step !== "idle" ? "stroke-neutral-700" : undefined}
              />
              <motion.path
                mask={`url(#${id})`}
                d="M14 5.90968C14 5.90968 12.8403 1.19575 7.91139 1.00639C2.98244 0.817033 1.42001 4.88117 1.12694 6.92737C0.833871 8.97357 0.881464 13.037 3.12748 15.2537C5.3735 17.4704 8.11821 17.075 9.56208 16.734C11.006 16.3929 12.9214 15.2174 13.2172 12.8483C13.5129 10.4792 12.0864 8.96269 9.47703 8.50011C6.86763 8.03754 5.28195 8.77766 5.07004 10.6679C4.85814 12.5581 8.25931 13.7735 9.65099 11.9232C11.0427 10.0729 10.5208 7.01987 9.91193 6.18724C9.30307 5.3546 7.91139 4.98454 7.04159 5.16957C5.75156 5.444 5.21501 6.37227 5.21501 6.37227"
                strokeDasharray={
                  step === "triggered"
                    ? "12 74"
                    : step === "done"
                    ? "98"
                    : "8 70"
                }
                strokeLinecap="round"
                strokeDashoffset={offset}
                stroke="currentColor"
              />
            </svg>
          </motion.div>
          <ul className="flex flex-col gap-4">
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </ul>
        </motion.div>
      </div>
      <p className="text-neutral-500 animate-pulse">drag down</p>
    </main>
  );
}

function Item() {
  return (
    <li className="flex gap-3 items-center">
      <div className="w-16 h-16 bg-neutral-800 rounded-full shrink-0" />
      <div className="space-y-2 w-full">
        <div className="h-6 w-[120px] bg-neutral-800 rounded" />
        <div className="h-6 w-full bg-neutral-800 rounded" />
      </div>
    </li>
  );
}
