class LinkedNode {
  data: any
  next: LinkedNode | null

  constructor(data: any) {
    this.data = data;
    this.next = null;
  }
}

class HashTableForCityNumber {

  buckets: LinkedNode[];

  private bucketSize: number = 20;

  // Treat the number as a 6-digit int.
  private hash(key: number): number {
    let bucketNum = Math.floor(key / this.bucketSize);
    return bucketNum;
  }

  private loopLinkList(head: LinkedNode): void {
    let current = head;
    while (current.next !== null) {

    }
  }

  put(key: string | number, value: any): void {
    const bucketNum: number = this.hash(parseInt(key.toString()));
    this.buckets[bucketNum]
  }
  get(key: string | number): any {

  }
  remove(key: string | number): void {

  }
}