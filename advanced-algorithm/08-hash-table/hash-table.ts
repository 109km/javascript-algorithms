class HashLinkedNode {
  value: any;
  key: string;
  next: HashLinkedNode | null;

  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTableForCityNumber {

  buckets: HashLinkedNode[];

  private bucketSize: number = 1000;

  constructor() {
    this.buckets = [];
  }

  // Treat the number as a 6-digit int.
  private hash(key: number): number {
    let bucketNum = Math.floor(key / this.bucketSize);
    return bucketNum;
  }

  // Loop the link list to find the node.
  private findNodeByKeyInBucket(head: HashLinkedNode, key: string): any {
    let current = head;
    let prev = null;
    let node: HashLinkedNode = null;

    while (current !== null) {
      if (current.key === key) {
        node = current;
        break;
      }
      prev = current;
      current = current.next;
    }
    return {
      current: node,
      prev: prev
    };
  }

  put(key: string, value: any): void {
    const bucketNum: number = this.hash(parseInt(key));
    const bucketHead: HashLinkedNode = this.buckets[bucketNum];

    // First node
    if (typeof bucketHead === 'undefined') {
      this.buckets[bucketNum] = new HashLinkedNode(key, value);
    }
    else {
      const targetNode = this.findNodeByKeyInBucket(bucketHead, key);
      // Insert the new node to head
      if (targetNode.current === null) {
        const insertNode = new HashLinkedNode(key, value);
        insertNode.next = bucketHead;
        this.buckets[bucketNum] = insertNode;
      }
      // Replace current value
      else {
        targetNode.current.value = value;
      }
    }
  }
  get(key: string): HashLinkedNode {
    const bucketNum: number = this.hash(parseInt(key));
    const bucketHead: HashLinkedNode = this.buckets[bucketNum];
    const targetNode = this.findNodeByKeyInBucket(bucketHead, key).current;
    return targetNode ? targetNode.value : null;
  }
  remove(key: string): HashLinkedNode {
    const bucketNum: number = this.hash(parseInt(key));
    const bucketHead: HashLinkedNode = this.buckets[bucketNum];
    const targetNode = this.findNodeByKeyInBucket(bucketHead, key);

    if (targetNode.current === null) {
      throw new TypeError(`Can't remove a node which doesn't exist.`);
    }
    // Remove the head
    else if (targetNode.prev === null) {
      this.buckets[bucketNum] = targetNode.current.next;
    }
    // Remove node in the middle
    else {
      targetNode.prev.next = targetNode.current.next;
    }
    return targetNode.current;
  }
}


const cityHashTable = new HashTableForCityNumber();

cityHashTable.put('110011', 'hello');
cityHashTable.put('123116', 'world');

console.log(cityHashTable.get('110011'));
cityHashTable.remove('123116');
cityHashTable.put('110011', 'hello2');
console.log(cityHashTable.get('110011'));