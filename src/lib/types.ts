export interface Friend {
  id: string;
  name: string;
  emoji: string;
  imageUrl?: string;
  imagePosition?: string;
  imageScale?: number;
  imagePositionX?: number;
  imagePositionY?: number;
  passcode: string;
  message: string;
  messageStyle: "elegant" | "warm" | "playful" | "minimal";
  subtitle?: string;
}

export interface AppConfig {
  ownerName: string;
  title: string;
  subtitle: string;
  backgroundTheme: "dark" | "cosmic" | "sunset" | "ocean" | "forest";
  accentColor: string;
  publicMessage: string;
  publicMessageStyle: "elegant" | "warm" | "playful" | "minimal";
  splashTitle?: string;
  splashSubtitle?: string;
  cardSubtitle?: string;
  friends: Friend[];
}

export const DEFAULT_FRIENDS: Friend[] = [
  {
    id: "friend-1",
    name: "Friend 1",
    emoji: "🌸",
    passcode: "1234",
    message: "You are amazing and I'm so grateful to have you in my life!",
    messageStyle: "elegant",
  },
  {
    id: "friend-2",
    name: "Friend 2",
    emoji: "⭐",
    passcode: "1234",
    message: "Thank you for always being there for me. You mean the world!",
    messageStyle: "warm",
  },
  {
    id: "friend-3",
    name: "Friend 3",
    emoji: "🎨",
    passcode: "1234",
    message: "Your creativity and energy inspire me every single day!",
    messageStyle: "playful",
  },
  {
    id: "friend-4",
    name: "Friend 4",
    emoji: "🌊",
    passcode: "1234",
    message: "Wishing you all the happiness you deserve (which is a lot!).",
    messageStyle: "minimal",
  },
  {
    id: "friend-5",
    name: "Friend 5",
    emoji: "🦋",
    passcode: "1234",
    message: "Life is better with you in it. Never forget that!",
    messageStyle: "elegant",
  },
  {
    id: "friend-6",
    name: "Friend 6",
    emoji: "✨",
    passcode: "1234",
    message: "You light up every room you walk into. Keep shining!",
    messageStyle: "warm",
  },
];

export const DEFAULT_CONFIG: AppConfig = {
  ownerName: "Your Name",
  title: "A Special Note For You",
  subtitle: "I wrote something just for you...",
  backgroundTheme: "cosmic",
  accentColor: "#a78bfa",
  publicMessage: "Welcome to my special message app! I created this to share thoughtful notes with my favorite people.",
  publicMessageStyle: "elegant",
  splashTitle: "A Special Note For You",
  splashSubtitle: "tap to see your message",
  cardSubtitle: "Has a message for you",
  friends: DEFAULT_FRIENDS,
};

export function getImageStyle(friend: Friend): React.CSSProperties {
  const scale = friend.imageScale ?? 1;
  let defaultX = 50;
  let defaultY = 50;

  if (friend.imagePosition === 'top') defaultY = 0;
  if (friend.imagePosition === 'bottom') defaultY = 100;
  if (friend.imagePosition === 'left') defaultX = 0;
  if (friend.imagePosition === 'right') defaultX = 100;

  const x = friend.imagePositionX ?? defaultX;
  const y = friend.imagePositionY ?? defaultY;

  return {
    objectFit: "cover",
    objectPosition: `${x}% ${y}%`,
    transform: `scale(${scale})`,
    transformOrigin: `${x}% ${y}%`,
  };
}
