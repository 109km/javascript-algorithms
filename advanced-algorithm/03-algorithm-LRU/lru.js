export default class LRUCache {
  constructor(max) {
    this.max = max;
    this.cache = new Map();
  }
  get(key) {
    const value = this.cache.get(key);
    if (!value) return -1;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  put(key, value) {
    if (cache.size > this.max) {
      const oldestKey = this.cache.keys().next().value;
      cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}