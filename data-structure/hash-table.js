import SinglelyLinkedList from "./singlely-linked-list";

export default class HashTable {
  constructor(size = 32) {
    this.buckets = Array.from({ length: size }, (n) => { return new SinglelyLinkedList() });
    this.keys = {};
  }

  // 创建hash key
  hash(key) {

    if (typeof this.keys[key] !== 'undefined') {
      return this.keys[key];
    }

    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
      0,
    );
    return hash % this.buckets.length;
  }
  _getBaseInfoByKey(key) {
    const hashKey = this.hash(key);
    const brucketLinkedList = this.buckets[hashKey];
    const node = brucketLinkedList.find(null, node => { return node.data.key === key });
    return {
      hashKey,
      brucketLinkedList,
      node
    };
  }
  set(key, value) {
    const { hashKey, brucketLinkedList, node } = this._getBaseInfoByKey(key);
    if (node) {
      node.data.value = value;
    } else {
      this.keys[key] = hashKey;
      brucketLinkedList.append({
        key: key,
        value: value
      });
    }
  }
  get(key) {
    const { node } = this._getBaseInfoByKey(key);
    return node ? node.data.value : null;
  }
  remove(key) {
    const { node, brucketLinkedList } = this._getBaseInfoByKey(key);
    if (node) {
      return brucketLinkedList.remove(node.data);
    }
    return null;
  }
  has(key) {
    return this.keys.hasOwnProperty(key);
  }
  getKeys() {
    return Object.keys(this.keys);
  }

  print() {
    const keys = this.getKeys();
    let string = '';
    let hashs = {};

    keys.forEach((key) => {
      const hashKey = this.keys[key];
      if (!hashs[hashKey]) {
        hashs[hashKey] = [];
      }
      hashs[hashKey].push(key);
    });

    for (let key in hashs) {
      const arr = hashs[key];
      string += `Hash: ${key}\n`;
      string += arr.join(',');
      string += `\n====分割线=====\n`;
    }
    console.log(string);
  }

}

// const table = new HashTable();
// table.set('name', 'shao');
// table.set('range', '20-30');
// table.set('age', '20');

// table.print();