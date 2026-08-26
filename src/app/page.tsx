"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import ParticleBackground from "@/components/ParticleBackground";
import FriendCard from "@/components/FriendCard";
import { getConfig } from "@/lib/store";
import { AppConfig, DEFAULT_CONFIG } from "@/lib/types";
import { THEME_STYLES } from "@/lib/themes";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const router = useRouter();

  useEffect(() => {
    setConfig(getConfig());

    const handleStorage = () => {
      setConfig(getConfig());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <main className="min-h-screen relative" style={THEME_STYLES[config.backgroundTheme]}>
      <ParticleBackground theme={config.backgroundTheme} />

      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen 
            key="splash" 
            onComplete={handleSplashComplete} 
            title={config.splashTitle}
            subtitle={config.splashSubtitle}
          />
        ) : (
          <motion.div
            key="content"
            className="relative z-10 min-h-screen flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h1
                  className="text-3xl md:text-5xl font-light text-white mb-3"
                  style={{ textShadow: "0 0 30px rgba(167,139,250,0.3)" }}
                >
                  {config.title}
                </h1>
                <p className="text-violet-300/60 text-lg tracking-wide">
                  {config.subtitle}
                </p>
                <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
              </motion.div>

              {/* Friend list */}
              <div className="w-full max-w-md space-y-3 px-4">
                {config.friends.map((friend, index) => (
                  <FriendCard
                    key={friend.id}
                    friend={friend}
                    index={index}
                    onClick={() => router.push(`/login/${friend.id}`)}
                    cardSubtitle={config.cardSubtitle}
                  />
                ))}
              </div>

              {/* Public Message link */}
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <motion.button
                  onClick={() => router.push("/public")}
                  className="group relative px-7 py-3.5 rounded-full overflow-hidden flex items-center gap-3
                    cursor-pointer transition-all duration-500 shadow-xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(167,139,250,0.25) 0%, rgba(139,92,246,0.15) 100%)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(196,181,253,0.35)",
                    boxShadow: "0 8px 32px 0 rgba(139, 92, 246, 0.25)",
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Inner hover gradient glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-violet-500/20 animate-gradient" />

                  {/* Sparkle icon */}
                  <span className="relative z-10 text-violet-200 group-hover:rotate-12 transition-transform duration-300 text-base">
                    ✨
                  </span>

                  {/* Button text */}
                  <span className="relative z-10 text-white font-medium text-sm tracking-wider uppercase drop-shadow">
                    Read Public Message
                  </span>

                  {/* Arrow indicator */}
                  <span className="relative z-10 text-violet-300/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 text-sm">
                    →
                  </span>
                </motion.button>
              </motion.div>


            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
