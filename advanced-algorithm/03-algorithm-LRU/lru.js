export default class LRUCache {
  constructor(max) {
    this.max = max;
    this.cache = {};
    this.currentSize = 0;
  }
  get(key) {
    return this.cache[key] || -1;
  }
  put(key, value) {

    if (this.currentSize === this.max) {

    }

    this.cache[key] = value;
    this.currentSize += 1;
  }
}