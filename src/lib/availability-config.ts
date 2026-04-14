import fs from "fs";
import path from "path";

export interface AvailabilityConfig {
  meetingDuration: number; // duración de cada reunión en minutos
  slots: Record<string, string[]>; // "2026-03-24": ["09:00", "10:30", ...]
}

const CONFIG_PATH = path.join(process.cwd(), "data", "availability.json");

export function getAvailabilityConfig(): AvailabilityConfig {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
      return JSON.parse(raw) as AvailabilityConfig;
    }
  } catch {
    // devolver config por defecto
  }
  return { meetingDuration: 60, slots: {} };
}

export function saveAvailabilityConfig(config: AvailabilityConfig): void {
  try {
    const dir = path.dirname(CONFIG_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
  } catch (error) {
    console.error('Error saving availability config:', error);
    throw new Error(`Failed to save availability config: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
