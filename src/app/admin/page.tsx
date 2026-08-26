"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import { getConfig, saveConfig, resetConfig } from "@/lib/store";
import { AppConfig, Friend, DEFAULT_CONFIG, getImageStyle } from "@/lib/types";

const THEMES = ["cosmic", "sunset", "ocean", "forest", "dark"] as const;
const STYLES = ["elegant", "warm", "playful", "minimal"] as const;
const EMOJIS = ["🌸", "⭐", "🎨", "🌊", "🦋", "✨", "🎯", "🔥", "🌙", "💎", "🎵", "🌈", "🍀", "🦉", "🐱", "🌺"];

const THEME_STYLES: Record<string, React.CSSProperties> = {
  cosmic: { background: "radial-gradient(ellipse at 20% 50%, #1a0533 0%, #0a0a1a 50%, #050510 100%)" },
  sunset: { background: "radial-gradient(ellipse at 20% 50%, #331a0a 0%, #1a0a0a 50%, #100505 100%)" },
  ocean: { background: "radial-gradient(ellipse at 20% 50%, #0a1a33 0%, #0a0a1a 50%, #050510 100%)" },
  forest: { background: "radial-gradient(ellipse at 20% 50%, #0a331a 0%, #0a1a0a 50%, #051005 100%)" },
  dark: { background: "radial-gradient(ellipse at 20% 50%, #1a1a1a 0%, #0a0a0a 50%, #050505 100%)" },
};

const INPUT_FIELD_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "0.625rem 0.875rem",
  borderRadius: "0.75rem",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  color: "white",
  fontSize: "0.875rem",
  outline: "none",
  transition: "all 0.3s",
};

const INPUT_FIELD_FOCUS_STYLE: React.CSSProperties = {
  ...INPUT_FIELD_STYLE,
  borderColor: "rgba(167, 139, 250, 0.4)",
  background: "rgba(167, 139, 250, 0.05)",
};

export default function AdminPage() {
  const router = useRouter();
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState<"general" | "friends">("general");
  const [saved, setSaved] = useState(false);
  const [editingFriend, setEditingFriend] = useState<number | null>(null);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  const handleSave = () => {
    saveConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Reset all settings to default? This cannot be undone.")) {
      resetConfig();
      setConfig(DEFAULT_CONFIG);
    }
  };

  const updateFriend = (index: number, updates: Partial<Friend>) => {
    const newFriends = [...config.friends];
    newFriends[index] = { ...newFriends[index], ...updates };
    setConfig({ ...config, friends: newFriends });
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      updateFriend(index, { imageUrl: result });
    };
    reader.readAsDataURL(file);
  };

  const addFriend = () => {
    if (config.friends.length >= 6) return;
    const newFriend: Friend = {
      id: `friend-${Date.now()}`,
      name: `Friend ${config.friends.length + 1}`,
      emoji: EMOJIS[config.friends.length % EMOJIS.length],
      passcode: "1234",
      message: "Write something special here...",
      messageStyle: "elegant",
    };
    setConfig({ ...config, friends: [...config.friends, newFriend] });
  };

  const removeFriend = (index: number) => {
    const newFriends = config.friends.filter((_, i) => i !== index);
    setConfig({ ...config, friends: newFriends });
  };

  return (
    <main className="min-h-screen relative" style={THEME_STYLES[config.backgroundTheme]}>
      <ParticleBackground theme={config.backgroundTheme} />

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-30 glass border-b border-white/5">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="text-violet-400/50 hover:text-violet-400/80 transition-colors text-sm cursor-pointer"
            >
              ← Back
            </button>
            <h1 className="text-white font-light tracking-wide">Admin Panel</h1>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300"
              style={{
                background: saved
                  ? "rgba(34,197,94,0.2)"
                  : "linear-gradient(135deg, rgba(167,139,250,0.3), rgba(139,92,246,0.2))",
                border: `1px solid ${saved ? "rgba(34,197,94,0.3)" : "rgba(167,139,250,0.3)"}`,
                color: saved ? "#4ade80" : "rgba(255,255,255,0.8)",
              }}
            >
              {saved ? "✓ Saved" : "Save"}
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {(["general", "friends"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-sm capitalize cursor-pointer transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                    : "text-white/40 hover:text-white/60 border border-transparent"
                }`}
              >
                {tab} Settings
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "general" ? (
              <motion.div
                key="general"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Section title="Header">
                  <Field label="Title">
                    <input
                      value={config.title}
                      onChange={(e) => setConfig({ ...config, title: e.target.value })}
                      style={INPUT_FIELD_STYLE}
                      onFocus={(e) => Object.assign(e.target.style, INPUT_FIELD_FOCUS_STYLE)}
                      onBlur={(e) => Object.assign(e.target.style, INPUT_FIELD_STYLE)}
                    />
                  </Field>
                  <Field label="Subtitle">
                    <input
                      value={config.subtitle}
                      onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
                      style={INPUT_FIELD_STYLE}
                      onFocus={(e) => Object.assign(e.target.style, INPUT_FIELD_FOCUS_STYLE)}
                      onBlur={(e) => Object.assign(e.target.style, INPUT_FIELD_STYLE)}
                    />
                  </Field>
                  <Field label="Your Name (sender)">
                    <input
                      value={config.ownerName}
                      onChange={(e) => setConfig({ ...config, ownerName: e.target.value })}
                      style={INPUT_FIELD_STYLE}
                      onFocus={(e) => Object.assign(e.target.style, INPUT_FIELD_FOCUS_STYLE)}
                      onBlur={(e) => Object.assign(e.target.style, INPUT_FIELD_STYLE)}
                    />
                  </Field>
                </Section>

                <Section title="Startup Animation & Box Text">
                  <Field label="Startup Animation Text (Words appear 1 by 1)">
                    <input
                      value={config.splashTitle || "A Special Note For You"}
                      onChange={(e) => setConfig({ ...config, splashTitle: e.target.value })}
                      placeholder="e.g. A Special Note For You"
                      style={INPUT_FIELD_STYLE}
                      onFocus={(e) => Object.assign(e.target.style, INPUT_FIELD_FOCUS_STYLE)}
                      onBlur={(e) => Object.assign(e.target.style, INPUT_FIELD_STYLE)}
                    />
                  </Field>
                  <Field label="Startup Animation Subtitle">
                    <input
                      value={config.splashSubtitle || "tap to see your message"}
                      onChange={(e) => setConfig({ ...config, splashSubtitle: e.target.value })}
                      placeholder="e.g. tap to see your message"
                      style={INPUT_FIELD_STYLE}
                      onFocus={(e) => Object.assign(e.target.style, INPUT_FIELD_FOCUS_STYLE)}
                      onBlur={(e) => Object.assign(e.target.style, INPUT_FIELD_STYLE)}
                    />
                  </Field>
                  <Field label="Selection Box Text (Default for all friends)">
                    <input
                      value={config.cardSubtitle || "Has a message for you"}
                      onChange={(e) => setConfig({ ...config, cardSubtitle: e.target.value })}
                      placeholder="e.g. Has a message for you"
                      style={INPUT_FIELD_STYLE}
                      onFocus={(e) => Object.assign(e.target.style, INPUT_FIELD_FOCUS_STYLE)}
                      onBlur={(e) => Object.assign(e.target.style, INPUT_FIELD_STYLE)}
                    />
                  </Field>
                </Section>

                <Section title="Background Theme">
                  <div className="grid grid-cols-5 gap-2">
                    {THEMES.map((theme) => (
                      <button
                        key={theme}
                        onClick={() => setConfig({ ...config, backgroundTheme: theme })}
                        className="p-3 rounded-xl text-center capitalize text-sm cursor-pointer transition-all duration-300"
                        style={{
                          ...(config.backgroundTheme === theme
                            ? { outline: "2px solid rgba(167,139,250,0.5)", background: "rgba(167,139,250,0.2)" }
                            : { background: "rgba(255,255,255,0.05)" }),
                          color: config.backgroundTheme === theme ? "#c4b5fd" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        <div
                          className="w-full h-6 rounded-md mb-1.5"
                          style={THEME_STYLES[theme]}
                        />
                        {theme}
                      </button>
                    ))}
                  </div>
                </Section>

                <Section title="Accent Color">
                  <div className="flex gap-2 flex-wrap">
                    {["#a78bfa", "#f472b6", "#34d399", "#60a5fa", "#fbbf24", "#fb923c", "#f87171", "#c084fc"].map(
                      (color) => (
                        <button
                          key={color}
                          onClick={() => setConfig({ ...config, accentColor: color })}
                          className="w-10 h-10 rounded-full cursor-pointer transition-all duration-300"
                          style={{
                            background: color,
                            outline: config.accentColor === color ? "2px solid rgba(255,255,255,0.5)" : "none",
                            transform: config.accentColor === color ? "scale(1.1)" : "scale(1)",
                          }}
                        />
                      )
                    )}
                  </div>
                </Section>

                <Section title="Public Message (For Everyone)">
                  <Field label="Message Text">
                    <textarea
                      value={config.publicMessage || ""}
                      onChange={(e) => setConfig({ ...config, publicMessage: e.target.value })}
                      className="min-h-[100px] resize-y"
                      style={INPUT_FIELD_STYLE}
                      onFocus={(e) => Object.assign(e.target.style, INPUT_FIELD_FOCUS_STYLE)}
                      onBlur={(e) => Object.assign(e.target.style, INPUT_FIELD_STYLE)}
                    />
                  </Field>
                  <Field label="Message Style">
                    <div className="flex gap-2">
                      {STYLES.map((style) => (
                        <button
                          key={style}
                          onClick={() => setConfig({ ...config, publicMessageStyle: style })}
                          className="px-3 py-1.5 rounded-lg text-xs capitalize cursor-pointer transition-all duration-200"
                          style={{
                            color: (config.publicMessageStyle || 'elegant') === style ? "#c4b5fd" : "rgba(255,255,255,0.4)",
                            background: (config.publicMessageStyle || 'elegant') === style ? "rgba(167,139,250,0.2)" : "transparent",
                            border: `1px solid ${(config.publicMessageStyle || 'elegant') === style ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.1)"}`,
                          }}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </Field>
                </Section>

                <Section title="Danger Zone">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded-lg text-sm text-red-400/70 border border-red-500/20 hover:bg-red-500/10 transition-all duration-300 cursor-pointer"
                  >
                    Reset to Defaults
                  </button>
                </Section>
              </motion.div>
            ) : (
              <motion.div
                key="friends"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {config.friends.map((friend, index) => (
                  <motion.div
                    key={friend.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div
                      className="glass rounded-2xl overflow-hidden cursor-pointer"
                      onClick={() => setEditingFriend(editingFriend === index ? null : index)}
                    >
                      <div className="p-4 flex items-center gap-3">
                        <span className="text-2xl">{friend.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium truncate">{friend.name}</h3>
                          <p className="text-violet-300/40 text-xs">
                            Passcode: {friend.passcode} · Style: {friend.messageStyle}
                          </p>
                        </div>
                        <motion.span
                          className="text-violet-400/40"
                          animate={{ rotate: editingFriend === index ? 180 : 0 }}
                        >
                          ▾
                        </motion.span>
                      </div>

                      <AnimatePresence>
                        {editingFriend === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-white/5"
                          >
                            <div className="p-4 space-y-4">
                              <Field label="Name">
                                <input
                                  value={friend.name}
                                  onChange={(e) => updateFriend(index, { name: e.target.value })}
                                  onClick={(e) => e.stopPropagation()}
                                  style={INPUT_FIELD_STYLE}
                                  onFocus={(e) => Object.assign(e.target.style, INPUT_FIELD_FOCUS_STYLE)}
                                  onBlur={(e) => Object.assign(e.target.style, INPUT_FIELD_STYLE)}
                                />
                              </Field>

                              <Field label="Custom Selection Box Subtitle (Optional)">
                                <input
                                  value={friend.subtitle || ""}
                                  placeholder={config.cardSubtitle || "Has a message for you"}
                                  onChange={(e) => updateFriend(index, { subtitle: e.target.value })}
                                  onClick={(e) => e.stopPropagation()}
                                  style={INPUT_FIELD_STYLE}
                                  onFocus={(e) => Object.assign(e.target.style, INPUT_FIELD_FOCUS_STYLE)}
                                  onBlur={(e) => Object.assign(e.target.style, INPUT_FIELD_STYLE)}
                                />
                              </Field>

                              <Field label="Icon / Emoji">
                                <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                                  {friend.imageUrl ? (
                                    <div className="flex flex-col gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                      <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border border-violet-400/40 flex-shrink-0">
                                          <img src={friend.imageUrl} alt="Custom Icon" className="w-full h-full" style={getImageStyle(friend)} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-white text-xs font-medium">Image Preview</p>
                                          <button 
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              updateFriend(index, { imageUrl: undefined, imagePosition: undefined, imageScale: undefined, imagePositionX: undefined, imagePositionY: undefined });
                                            }}
                                            className="text-xs text-red-400 hover:text-red-300 mt-1 cursor-pointer"
                                          >
                                            Remove Image
                                          </button>
                                        </div>
                                      </div>

                                      {/* Zoom / Scale Control */}
                                      <div className="space-y-1.5">
                                        <div className="flex justify-between text-xs text-violet-300/70">
                                          <span>Zoom / Scale</span>
                                          <span className="font-mono">{(friend.imageScale ?? 1).toFixed(2)}x</span>
                                        </div>
                                        <input
                                          type="range"
                                          min="0.5"
                                          max="3.0"
                                          step="0.05"
                                          value={friend.imageScale ?? 1}
                                          onChange={(e) => updateFriend(index, { imageScale: parseFloat(e.target.value) })}
                                          className="w-full accent-violet-400 cursor-pointer"
                                        />
                                      </div>

                                      {/* Position X Control */}
                                      <div className="space-y-1.5">
                                        <div className="flex justify-between text-xs text-violet-300/70">
                                          <span>Position X (Left ↔ Right)</span>
                                          <span className="font-mono">{friend.imagePositionX ?? (friend.imagePosition === 'left' ? 0 : friend.imagePosition === 'right' ? 100 : 50)}%</span>
                                        </div>
                                        <input
                                          type="range"
                                          min="0"
                                          max="100"
                                          step="1"
                                          value={friend.imagePositionX ?? (friend.imagePosition === 'left' ? 0 : friend.imagePosition === 'right' ? 100 : 50)}
                                          onChange={(e) => updateFriend(index, { imagePositionX: parseInt(e.target.value) })}
                                          className="w-full accent-violet-400 cursor-pointer"
                                        />
                                      </div>

                                      {/* Position Y Control */}
                                      <div className="space-y-1.5">
                                        <div className="flex justify-between text-xs text-violet-300/70">
                                          <span>Position Y (Top ↕ Bottom)</span>
                                          <span className="font-mono">{friend.imagePositionY ?? (friend.imagePosition === 'top' ? 0 : friend.imagePosition === 'bottom' ? 100 : 50)}%</span>
                                        </div>
                                        <input
                                          type="range"
                                          min="0"
                                          max="100"
                                          step="1"
                                          value={friend.imagePositionY ?? (friend.imagePosition === 'top' ? 0 : friend.imagePosition === 'bottom' ? 100 : 50)}
                                          onChange={(e) => updateFriend(index, { imagePositionY: parseInt(e.target.value) })}
                                          className="w-full accent-violet-400 cursor-pointer"
                                        />
                                      </div>

                                      {/* Presets */}
                                      <div className="space-y-1.5">
                                        <span className="text-xs text-violet-300/50 block">Quick Presets</span>
                                        <div className="flex gap-1.5 flex-wrap">
                                          {[
                                            { label: 'Center', x: 50, y: 50 },
                                            { label: 'Top', x: 50, y: 0 },
                                            { label: 'Bottom', x: 50, y: 100 },
                                            { label: 'Left', x: 0, y: 50 },
                                            { label: 'Right', x: 100, y: 50 },
                                          ].map((preset) => (
                                            <button
                                              key={preset.label}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                updateFriend(index, { imagePositionX: preset.x, imagePositionY: preset.y, imagePosition: preset.label.toLowerCase() });
                                              }}
                                              className="px-2.5 py-1 rounded-lg text-xs capitalize transition-all duration-200 cursor-pointer"
                                              style={{
                                                background: "rgba(255,255,255,0.05)",
                                                color: "rgba(255,255,255,0.7)",
                                                border: "1px solid rgba(255,255,255,0.1)",
                                              }}
                                            >
                                              {preset.label}
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex gap-1.5 flex-wrap">
                                      {EMOJIS.map((emoji) => (
                                        <button
                                          key={emoji}
                                          onClick={() => updateFriend(index, { emoji })}
                                          className="w-9 h-9 rounded-lg flex items-center justify-center text-lg cursor-pointer transition-all duration-200"
                                          style={{
                                            background: friend.emoji === emoji ? "rgba(167,139,250,0.3)" : "transparent",
                                            outline: friend.emoji === emoji ? "1px solid rgba(167,139,250,0.5)" : "none",
                                            transform: friend.emoji === emoji ? "scale(1.1)" : "scale(1)",
                                          }}
                                        >
                                          {emoji}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                  
                                  <div className="text-xs text-violet-300/50 mt-2">
                                    <label className="cursor-pointer hover:text-violet-300 transition-colors">
                                      <span>Upload Custom Image...</span>
                                      <input 
                                        type="file" 
                                        accept="image/png, image/jpeg, image/jpg" 
                                        className="hidden" 
                                        onChange={(e) => handleImageUpload(index, e)}
                                      />
                                    </label>
                                  </div>
                                </div>
                              </Field>

                              <Field label="Passcode (4 digits)">
                                <input
                                  value={friend.passcode}
                                  onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                                    updateFriend(index, { passcode: val });
                                  }}
                                  className="input-field"
                                  maxLength={4}
                                  onClick={(e) => e.stopPropagation()}
                                  style={INPUT_FIELD_STYLE}
                                  onFocus={(e) => Object.assign(e.target.style, INPUT_FIELD_FOCUS_STYLE)}
                                  onBlur={(e) => Object.assign(e.target.style, INPUT_FIELD_STYLE)}
                                />
                              </Field>

                              <Field label="Message Style">
                                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                  {STYLES.map((style) => (
                                    <button
                                      key={style}
                                      onClick={() => updateFriend(index, { messageStyle: style })}
                                      className="px-3 py-1.5 rounded-lg text-xs capitalize cursor-pointer transition-all duration-200"
                                      style={{
                                        color: friend.messageStyle === style ? "#c4b5fd" : "rgba(255,255,255,0.4)",
                                        background: friend.messageStyle === style ? "rgba(167,139,250,0.2)" : "transparent",
                                        border: `1px solid ${friend.messageStyle === style ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.1)"}`,
                                      }}
                                    >
                                      {style}
                                    </button>
                                  ))}
                                </div>
                              </Field>

                              <Field label="Message">
                                <textarea
                                  value={friend.message}
                                  onChange={(e) => updateFriend(index, { message: e.target.value })}
                                  onClick={(e) => e.stopPropagation()}
                                  className="min-h-[100px] resize-y"
                                  style={INPUT_FIELD_STYLE}
                                  onFocus={(e) => Object.assign(e.target.style, INPUT_FIELD_FOCUS_STYLE)}
                                  onBlur={(e) => Object.assign(e.target.style, INPUT_FIELD_STYLE)}
                                />
                              </Field>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFriend(index);
                                }}
                                className="text-red-400/50 hover:text-red-400/80 text-xs cursor-pointer transition-colors duration-200"
                              >
                                Remove this friend
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}

                {config.friends.length < 6 && (
                  <motion.button
                    onClick={addFriend}
                    className="w-full glass rounded-2xl p-4 text-violet-400/40 hover:text-violet-400/60 text-sm cursor-pointer transition-all duration-300 hover:bg-white/5 border border-dashed border-white/10 hover:border-violet-400/20"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    + Add Friend ({config.friends.length}/6)
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="text-white/70 text-sm font-medium mb-4 tracking-wide uppercase">
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-violet-300/50 text-xs mb-1.5 tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}
