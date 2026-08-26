"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
  title?: string;
  subtitle?: string;
}

export default function SplashScreen({ onComplete, title, subtitle }: SplashScreenProps) {
  const words = (title || "A Special Note For You").split(" ");
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"particles" | "title" | "subtitle">("particles");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("title"), 800),
      setTimeout(() => setPhase("subtitle"), 2400),
      setTimeout(() => {
        setVisible(false);
        setTimeout(onComplete, 800);
      }, 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const showTitle = phase === "title" || phase === "subtitle";
  const showSubtitle = phase === "subtitle";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 overflow-hidden"
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Floating particles */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(167, 139, 250, ${Math.random() * 0.5 + 0.2})`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.1, 0.6, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Glow orb */}
          <motion.div
            className="absolute w-72 h-72 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Main content */}
          <div className="relative z-10 text-center">
            {/* Title words appearing one by one */}
            <div className="flex items-center justify-center gap-3 flex-wrap px-4">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className="text-4xl md:text-6xl lg:text-7xl font-light text-white"
                  style={{
                    textShadow: "0 0 30px rgba(167,139,250,0.4)",
                  }}
                  initial={{ opacity: 0, y: 40, filter: "blur(12px)", scale: 0.9 }}
                  animate={
                    showTitle
                      ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
                      : {}
                  }
                  transition={{
                    delay: i * 0.15,
                    duration: 1.4,
                    ease: [0.16, 1, 0.3, 1], // Cinematic ease-out
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Decorative line */}
            <motion.div
              className="mx-auto mt-8 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent"
              initial={{ width: 0, opacity: 0, filter: "blur(5px)" }}
              animate={
                showSubtitle
                  ? { width: 250, opacity: 1, filter: "blur(0px)" }
                  : {}
              }
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Subtitle */}
            <motion.p
              className="mt-6 text-lg md:text-xl text-violet-300/70 font-light tracking-widest"
              initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
              animate={
                showSubtitle
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : {}
              }
              transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {subtitle || "tap to see your message"}
            </motion.p>

            {/* Arrow hint */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              animate={
                showSubtitle
                  ? { opacity: 1 }
                  : {}
              }
              transition={{ delay: 1, duration: 1 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-violet-400/50 text-2xl"
              >
                ↓
              </motion.div>
            </motion.div>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-l border-t border-violet-500/20"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-violet-500/20"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
