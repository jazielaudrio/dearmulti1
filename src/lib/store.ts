import { AppConfig, DEFAULT_CONFIG } from "./types";
import { supabase } from "./supabase";

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

export async function fetchRemoteConfig(): Promise<AppConfig | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from("app_config")
      .select("config")
      .eq("id", "main")
      .maybeSingle();

    if (error) {
      console.warn("Supabase fetch notice:", error.message);
      return null;
    }

    if (data && data.config) {
      const remoteConfig = data.config as AppConfig;
      saveConfigLocalOnly(remoteConfig);
      return remoteConfig;
    } else {
      // Database table exists but has no data -> Auto-seed DEFAULT_CONFIG to Supabase!
      console.log("Seeding DEFAULT_CONFIG into Supabase database...");
      await saveConfig(DEFAULT_CONFIG);
      return DEFAULT_CONFIG;
    }
  } catch (e) {
    console.warn("Supabase fetch failed:", e);
  }
  return null;
}

export function saveConfigLocalOnly(config: AppConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export async function saveConfig(config: AppConfig): Promise<void> {
  saveConfigLocalOnly(config);
  
  if (supabase) {
    try {
      const { error } = await supabase
        .from("app_config")
        .upsert({ id: "main", config: config, updated_at: new Date().toISOString() });
      if (error) console.warn("Supabase save error:", error.message);
    } catch (e) {
      console.warn("Supabase save failed:", e);
    }
  }
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
