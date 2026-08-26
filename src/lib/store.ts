import { AppConfig, DEFAULT_CONFIG } from "./types";

const STORAGE_KEY = "special-message-app-config";

export function getConfig(): AppConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...DEFAULT_CONFIG,
        ...parsed,
        friends: Array.isArray(parsed.friends) && parsed.friends.length > 0 ? parsed.friends : DEFAULT_CONFIG.friends,
      };
    }
  } catch {
    // fallback
  }
  return DEFAULT_CONFIG;
}

export function saveConfig(config: AppConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function resetConfig(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function verifyPasscode(
  friendId: string,
  passcode: string
): boolean {
  const config = getConfig();
  const friend = config.friends.find((f) => f.id === friendId);
  return friend ? friend.passcode === passcode : false;
}

export function getFriend(friendId: string) {
  const config = getConfig();
  return config.friends.find((f) => f.id === friendId) || null;
}
