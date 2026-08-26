"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import { getConfig } from "@/lib/store";
import { THEME_STYLES } from "@/lib/themes";
import React from "react";

export default function PublicMessagePage() {
  const router = useRouter();
  
  const [theme, setTheme] = useState("cosmic");
  const [ownerName, setOwnerName] = useState("");
  const [publicMessage, setPublicMessage] = useState("");
  const [publicMessageStyle, setPublicMessageStyle] = useState("elegant");
  const [revealed, setRevealed] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);

  useEffect(() => {
    const config = getConfig();
    setTheme(config.backgroundTheme);
    setOwnerName(config.ownerName);
    setPublicMessage(config.publicMessage || "");
    setPublicMessageStyle(config.publicMessageStyle || "elegant");
  }, []);

  const handleOpen = () => {
    setShowEnvelope(false);
    setTimeout(() => setRevealed(true), 600);
  };

  const messageWords = publicMessage.split(" ");

  return (
    <main className="min-h-screen relative flex items-center justify-center overflow-hidden" style={THEME_STYLES[theme]}>
      <ParticleBackground theme={theme} />

      <div className="relative z-10 w-full max-w-xl mx-4 py-12">
        {/* Back button */}
        <motion.button
          onClick={() => router.push("/")}
          className="absolute -top-2 left-0 text-violet-400/40 hover:text-violet-400/80
            transition-colors text-sm cursor-pointer z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ← Back
        </motion.button>

        {showEnvelope ? (
          /* Envelope / Opening animation */
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Envelope */}
            <motion.div
              className="relative cursor-pointer group"
              onClick={handleOpen}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Envelope body */}
              <div
                className="w-64 h-44 rounded-2xl relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(139,92,246,0.08))",
                  border: "1px solid rgba(167,139,250,0.25)",
                }}
              >
                {/* Envelope flap */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-20"
                  style={{
                    background: "linear-gradient(180deg, rgba(167,139,250,0.2), transparent)",
                    clipPath: "polygon(0 0, 50% 70%, 100% 0)",
                  }}
                  animate={{ rotateX: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Seal */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-12 h-12 rounded-full flex items-center justify-center text-xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(167,139,250,0.4), rgba(139,92,246,0.3))",
                    border: "1px solid rgba(167,139,250,0.4)",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(167,139,250,0.3)",
                      "0 0 40px rgba(167,139,250,0.5)",
                      "0 0 20px rgba(167,139,250,0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✉
                </motion.div>

                {/* Sparkle particles */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-violet-400"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Public info */}
            <motion.div
              className="text-center mt-8 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h2 className="text-white text-xl font-light mt-3">
                A public message from {ownerName}
              </h2>
              <p className="text-violet-300/40 text-sm mt-2">
                for everyone
              </p>
            </motion.div>

            {/* Tap hint */}
            <motion.p
              className="text-violet-400/30 text-xs mt-6 tracking-widest uppercase"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              tap envelope to open
            </motion.p>
          </motion.div>
        ) : (
          /* Message reveal */
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <motion.div
              className="text-center mb-8 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2
                className="text-white text-2xl md:text-3xl font-light mt-4"
                style={{ textShadow: "0 0 30px rgba(167,139,250,0.3)" }}
              >
                Dear Everyone,
              </h2>
            </motion.div>

            {/* Message card */}
            <motion.div
              className="glass-strong rounded-3xl w-full"
              style={{ padding: "2.5rem 2rem" }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            >
              {/* Decorative top line */}
              <motion.div
                className="w-16 h-px mx-auto mb-8"
                style={{
                  background: "linear-gradient(to right, transparent, rgba(167,139,250,0.5), transparent)",
                }}
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 1, duration: 0.8 }}
              />

              {/* Message text - word by word reveal */}
              <p 
                className={`message-${publicMessageStyle} text-lg md:text-xl text-white/90 text-justify w-full break-words leading-relaxed`}
                style={{ padding: "0 1.25rem" }}
              >
                {messageWords.map((word, i) => (
                  <span key={i}>
                    <motion.span
                      className="inline-block max-w-full break-words"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 1.2 + i * 0.08,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      {word}
                    </motion.span>
                    {" "}
                  </span>
                ))}
              </p>

              {/* Decorative bottom line */}
              <motion.div
                className="w-16 h-px mx-auto mt-8"
                style={{
                  background: "linear-gradient(to right, transparent, rgba(167,139,250,0.5), transparent)",
                }}
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 2, duration: 0.8 }}
              />
            </motion.div>

            {/* Signature */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.8 }}
            >
              <p className="text-violet-300/50 text-sm italic">
                With love,
              </p>
              <p
                className="text-white text-lg font-light mt-1"
                style={{ textShadow: "0 0 20px rgba(167,139,250,0.3)" }}
              >
                {ownerName}
              </p>
            </motion.div>

            {/* Floating hearts */}
            {revealed && (
              <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-xl"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      bottom: -20,
                    }}
                    animate={{
                      y: [0, -window.innerHeight - 100],
                      opacity: [0, 1, 0.8, 0],
                      x: [0, (Math.random() - 0.5) * 100],
                      rotate: [0, Math.random() * 360],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 3,
                      delay: i * 0.3 + 1,
                      ease: "easeOut",
                    }}
                  >
                    {["💜", "✨", "🌸", "⭐", "💫", "🦋"][i % 6]}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Back to selection */}
            <motion.button
              onClick={() => router.push("/")}
              className="mt-8 text-violet-400/30 hover:text-violet-400/60 text-sm
                transition-colors duration-300 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 0.6 }}
            >
              ← Back to selection
            </motion.button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
