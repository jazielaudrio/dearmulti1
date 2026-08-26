"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import { getFriend, getConfig, verifyPasscode } from "@/lib/store";
import { Friend, DEFAULT_CONFIG, getImageStyle } from "@/lib/types";
import { THEME_STYLES } from "@/lib/themes";

export default function LoginPage() {
  const router = useRouter();
  const params = useParams();
  const friendId = params.friendId as string;

  const [friend, setFriend] = useState<Friend | null>(null);
  const [theme, setTheme] = useState("cosmic");
  const [passcode, setPasscode] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const config = getConfig();
    setTheme(config.backgroundTheme);
    const f = getFriend(friendId);
    if (!f) {
      router.push("/");
      return;
    }
    setFriend(f);
  }, [friendId, router]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    setError(false);

    const newPasscode = [...passcode];
    newPasscode[index] = value;
    setPasscode(newPasscode);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 4 digits entered
    if (value && index === 3) {
      const fullCode = newPasscode.join("");
      if (fullCode.length === 4) {
        setTimeout(() => handleSubmit(fullCode), 200);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !passcode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (fullCode?: string) => {
    const code = fullCode || passcode.join("");
    if (code.length < 4) return;

    if (verifyPasscode(friendId, code)) {
      router.push(`/message/${friendId}`);
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => {
        setPasscode(["", "", "", ""]);
        setError(false);
        setShaking(false);
        inputRefs.current[0]?.focus();
      }, 800);
    }
  };

  if (!friend) return null;

  return (
    <main className="min-h-screen relative flex items-center justify-center" style={THEME_STYLES[theme]}>
      <ParticleBackground theme={theme} />

      <motion.div
        className="relative z-10 w-full max-w-sm mx-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Back button */}
        <motion.button
          onClick={() => router.push("/")}
          className="absolute -top-16 left-0 text-violet-400/40 hover:text-violet-400/80
            transition-colors text-sm cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          ← Back
        </motion.button>

        {/* Card */}
        <motion.div
          className="glass-strong rounded-3xl p-8 text-center"
          animate={shaking ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Icon / Emoji */}
          <motion.div
            className="mb-4 flex justify-center"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {friend.imageUrl ? (
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border border-violet-400/30">
                <img src={friend.imageUrl} alt={friend.name} className="w-full h-full" style={getImageStyle(friend)} />
              </div>
            ) : (
              <span className="text-5xl">{friend.emoji}</span>
            )}
          </motion.div>

          {/* Name */}
          <h2 className="text-white text-xl font-light mb-1">
            {friend.name}
          </h2>
          <p className="text-violet-300/50 text-sm mb-8">
            Enter your passcode
          </p>

          {/* Passcode inputs */}
          <div className="flex justify-center gap-3 mb-8">
            {passcode.map((digit, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3, duration: 0.4 }}
              >
                <input
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-14 h-16 rounded-xl bg-white/5 border text-white text-center text-2xl
                    focus:outline-none transition-all duration-300
                    ${error
                      ? "border-red-500/60 bg-red-500/10"
                      : digit
                        ? "border-violet-400/40 bg-violet-500/10"
                        : "border-white/10 hover:border-white/20"
                    }
                    focus:border-violet-400/60 focus:bg-violet-500/10`}
                  style={{ caretColor: "transparent" }}
                />
                {digit && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-violet-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.p
                className="text-red-400/80 text-sm mb-4"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                Incorrect passcode. Try again.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <motion.button
            onClick={() => handleSubmit()}
            className="w-full py-3 rounded-xl text-white/80 font-light tracking-wider
              transition-all duration-300 cursor-pointer
              hover:bg-white/10 active:bg-white/15"
            style={{
              background: "linear-gradient(135deg, rgba(167,139,250,0.2), rgba(139,92,246,0.1))",
              border: "1px solid rgba(167,139,250,0.2)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Open Message
          </motion.button>
        </motion.div>

        {/* Hint */}
        <motion.p
          className="text-center text-violet-400/20 text-xs mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          hint: check with the sender for your code
        </motion.p>
      </motion.div>
    </main>
  );
}
