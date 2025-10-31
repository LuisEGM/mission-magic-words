import { Howl } from "howler";

/**
 * AudioService - Centralized audio management using Howler.js
 * Handles all game sounds with volume control and mute functionality
 */

export type SoundType =
  | "correct"
  | "wrong"
  | "unlock"
  | "star"
  | "levelComplete"
  | "levelFailed"
  | "finalVictory"
  | "click"
  | "backgroundMusic";

interface SoundConfig {
  src: string[];
  volume: number;
  loop?: boolean;
  sprite?: Record<string, [number, number]>;
}

class AudioManager {
  private sounds: Map<SoundType, Howl> = new Map();
  private enabled: boolean = true;
  private musicVolume: number = 0.3;
  private sfxVolume: number = 0.5;
  private musicStarted: boolean = false;

  constructor() {
    this.loadFromLocalStorage();
    this.initializeSounds();
    this.setupGlobalMusicTrigger();
  }

  /**
   * Initialize all game sounds
   */
  private initializeSounds() {
    const soundConfigs: Record<SoundType, SoundConfig> = {
      // UI click - subtle
      click: {
        src: [
          "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
        ],
        volume: this.sfxVolume * 0.4,
      },

      // Correct answer sound - positive, rewarding
      correct: {
        src: [
          "https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3",
        ],
        volume: this.sfxVolume,
      },

      // Wrong answer sound - gentle, not harsh
      wrong: {
        src: [
          "https://assets.mixkit.co/active_storage/sfx/946/946-preview.mp3",
        ],
        volume: this.sfxVolume * 0.7,
      },

      // Unlock magic word - magical, triumphant
      unlock: {
        src: [
          "https://assets.mixkit.co/active_storage/sfx/2638/2638-preview.mp3",
        ],
        volume: this.sfxVolume * 0.8,
      },

      // Star collection - quick, satisfying
      star: {
        src: [
          "https://assets.mixkit.co/active_storage/sfx/1434/1434-preview.mp3",
        ],
        volume: this.sfxVolume * 0.6,
      },

      // Level complete - celebratory
      levelComplete: {
        src: [
          "https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3",
        ],
        volume: this.sfxVolume,
      },

      // Level failed - disheartening
      levelFailed: {
        src: [
          "https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3",
        ],
        volume: this.sfxVolume,
      },

      // Final victory - epic, triumphant
      finalVictory: {
        src: [
          "https://assets.mixkit.co/active_storage/sfx/1466/1466-preview.mp3",
        ],
        volume: this.sfxVolume,
      },

      // Background music - ambient, magical
      backgroundMusic: {
        // https://freesound.org/people/Setuniman/sounds/165046/
        src: ["https://cdn.freesound.org/previews/165/165046_2244250-lq.mp3"],
        volume: this.musicVolume,
        loop: true,
      },
    };

    // Initialize all sounds
    Object.entries(soundConfigs).forEach(([key, config]) => {
      const sound = new Howl({
        src: config.src,
        volume: config.volume,
        loop: config.loop || false,
        preload: true,
        html5: key === "backgroundMusic", // Use HTML5 Audio for music to save memory
      });

      this.sounds.set(key as SoundType, sound);
    });
  }

  /**
   * Setup global music trigger on first user interaction
   */
  private setupGlobalMusicTrigger() {
    const startMusic = () => {
      if (!this.musicStarted && this.enabled) {
        this.play("backgroundMusic");
        this.musicStarted = true;
      }
    };

    // Listen for first click anywhere on the page
    document.addEventListener("click", startMusic, { once: true });
    // Also listen for first keypress
    document.addEventListener("keydown", startMusic, { once: true });
  }

  /**
   * Play a sound effect
   */
  play(soundType: SoundType) {
    if (!this.enabled) return;

    const sound = this.sounds.get(soundType);
    if (sound) {
      // Don't restart background music if already playing
      if (soundType === "backgroundMusic" && sound.playing()) {
        return;
      }
      sound.play();

      // Mark music as started if we're playing background music
      if (soundType === "backgroundMusic") {
        this.musicStarted = true;
      }
    }
  }

  /**
   * Stop a specific sound
   */
  stop(soundType: SoundType) {
    const sound = this.sounds.get(soundType);
    if (sound) {
      sound.stop();
    }
  }

  /**
   * Stop all sounds
   */
  stopAll() {
    this.sounds.forEach((sound) => sound.stop());
  }

  /**
   * Toggle audio on/off
   */
  toggle() {
    this.enabled = !this.enabled;
    this.saveToLocalStorage();

    if (!this.enabled) {
      this.stopAll();
    } else if (this.musicStarted) {
      // Resume background music if it was already started
      this.play("backgroundMusic");
    }

    return this.enabled;
  }

  /**
   * Set audio enabled state
   */
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    this.saveToLocalStorage();

    if (!this.enabled) {
      this.stopAll();
    } else if (this.musicStarted) {
      // Resume background music if it was already started
      this.play("backgroundMusic");
    }
  }

  /**
   * Get current enabled state
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Set music volume (0-1)
   */
  setMusicVolume(volume: number) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    const music = this.sounds.get("backgroundMusic");
    if (music) {
      music.volume(this.musicVolume);
    }
    this.saveToLocalStorage();
  }

  /**
   * Set sound effects volume (0-1)
   */
  setSfxVolume(volume: number) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));

    // Update all non-music sounds
    this.sounds.forEach((sound, key) => {
      if (key !== "backgroundMusic") {
        sound.volume(this.sfxVolume);
      }
    });

    this.saveToLocalStorage();
  }

  /**
   * Get current music volume
   */
  getMusicVolume(): number {
    return this.musicVolume;
  }

  /**
   * Get current SFX volume
   */
  getSfxVolume(): number {
    return this.sfxVolume;
  }

  /**
   * Save audio settings to localStorage
   */
  private saveToLocalStorage() {
    try {
      localStorage.setItem(
        "audioSettings",
        JSON.stringify({
          enabled: this.enabled,
          musicVolume: this.musicVolume,
          sfxVolume: this.sfxVolume,
        })
      );
    } catch (error) {
      console.warn("Failed to save audio settings:", error);
    }
  }

  /**
   * Load audio settings from localStorage
   */
  private loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem("audioSettings");
      if (saved) {
        const settings = JSON.parse(saved);
        this.enabled = settings.enabled ?? true;
        this.musicVolume = settings.musicVolume ?? 0.3;
        this.sfxVolume = settings.sfxVolume ?? 0.5;
      }
    } catch (error) {
      console.warn("Failed to load audio settings:", error);
    }
  }

  /**
   * Preload all sounds (call this on app start)
   */
  preload() {
    this.sounds.forEach((sound) => {
      sound.load();
    });
  }

  /**
   * Cleanup - unload all sounds
   */
  cleanup() {
    this.sounds.forEach((sound) => {
      sound.unload();
    });
    this.sounds.clear();
  }
}

// Export singleton instance
export const audioService = new AudioManager();

// Preload sounds when module is imported
audioService.preload();
