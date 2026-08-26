"use client";

import { motion } from "framer-motion";
import { Friend, getImageStyle } from "@/lib/types";

interface FriendCardProps {
  friend: Friend;
  index: number;
  onClick: () => void;
  cardSubtitle?: string;
}

export default function FriendCard({ friend, index, onClick, cardSubtitle }: FriendCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="group relative glass rounded-2xl p-6 w-full text-left cursor-pointer
        hover:bg-white/10 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at center, rgba(167,139,250,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex items-center gap-4">
        {/* Avatar */}
        <motion.div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(167,139,250,0.2), rgba(139,92,246,0.1))",
            border: "1px solid rgba(167,139,250,0.2)",
          }}
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
        >
          {friend.imageUrl ? (
            <img src={friend.imageUrl} alt={friend.name} className="w-full h-full" style={getImageStyle(friend)} />
          ) : (
            friend.emoji
          )}
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-lg truncate">
            {friend.name}
          </h3>
          <p className="text-violet-300/50 text-sm mt-0.5">
            {friend.subtitle || cardSubtitle || "Has a message for you"}
          </p>
        </div>

        {/* Arrow */}
        <motion.div
          className="text-violet-400/40 group-hover:text-violet-400/80 transition-colors"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
        >
          →
        </motion.div>
      </div>
    </motion.button>
  );
}
