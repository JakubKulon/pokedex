import { clearInterval } from "node:timers";

type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(num: number) {
    this.#interval = num;

    this.#startReapLoop();
  }

  add<T>(key: string, val: CacheEntry<T>) {
    this.#cache.set(key, val);
  }

  get<T>(key: string): CacheEntry<T> | undefined {
    return this.#cache.get(key);
  }

  #reap() {
    this.#cache.forEach((cache, key) => {
      if (cache.createdAt > Date.now() - this.#interval) {
        this.#cache.delete(key);
      }
    });
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}

export const globalLocationCache = new Cache(5000);
