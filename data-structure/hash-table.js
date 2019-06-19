
class HashTable {
  constructor(size = 32) {
    this.buckets = {};
    this.size = size;
    this.numberOfValues = 0;
  }

  // 创建hash key
  hash(key) {
    return key.toString().length % this.size;
  }

  add(key, value) {
    const hash = this.hash(key);
    if (!this.buckets.hasOwnProperty(hash)) {
      this.buckets[hash] = {};
    }

    let hashBucket = this.buckets[hash];
    if (!hashBucket.hasOwnProperty(key)) {
      hashBucket[key] = value;
      this.numberOfValues++;
    } else {
      console.log(`${key} in bucket - ${hash} already has value.`);
    }

  }

  remove(key) {
    const hash = this.hash(key);
    if (this.buckets.hasOwnProperty(hash) && this.buckets[hash].hasOwnProperty(key)) {
      delete this.buckets[hash][key];
      this.numberOfValues--;
    }
  }

  find(key) {
    const hash = this.hash(key);
    if (this.buckets.hasOwnProperty(hash) && this.buckets[hash].hasOwnProperty(key)) {
      return this.buckets[hash][key];
    } else {
      return null;
    }
  }

  print() {
    const hashKeys = Object.keys(this.buckets);
    let string = '';
    hashKeys.forEach((hash) => {
      string += `Hash: ${hash}\n`;
      const hashBucket = this.buckets[hash];
      for (let key in hashBucket) {
        string += `${key}:${hashBucket[key]} | `;
      }
      string += `\n====分割线=====\n`;
    });
    console.log(string);
  }

}

const table = new HashTable();
table.add('name', 'shao');
table.add('age', '20');
table.add('sex', '1');

table.print();