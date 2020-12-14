# HashTable introductions

## HashTable

It's easy to find this structure around us, like the ID card's number is a kind of hash table:

![](./id-structure.drawio.svg)

Different digit indicates different message. We have to convert the whole string of numbers to its real meanings.

Like if `61` shows in position of province, it means `ShaanXi Province`, and in this case the city's number `01` means `Xi'an`.

But when province's number is `11`, city's number `01` means `Beijing`. The 8-digit birth's number has no relations with other numbers.

This example tells us sometimes there is a relationship between them, yet sometimes there isn't.

The way of conversion is called `hash function` in computer science.

![](./hash-table.drawio.svg)

This picture shows the process of the hash table.


## Hash function

A hash function can convert the `key` to a `hash value` that represents the address of the real value.

And it has 3 requirements:

1. A hash value can't be a negative number.
2. Same key, same hash value.
3. Different key, the key may be the same.

Let's use the 6-digit city's number as an example:

If each key has a unique hash value, that means 6-digit number must have 1 million hash values to store.

Of course this solution can solve the problem, but it will waste a lot of space. And search's time complexity is O(n).

Is there any other better solutions?

Yes! One of the solutions is we imagine each `hash value` as a linked list.

So each `hash value` is the address of a linked list!

![](./hash-value-linked-list.drawio.svg)


Here is another problem sometims the keys are different, but the `hash value` is the same, how to solve this confict?


## Conflict resolution

One of the most commonly used method is **chaining**.

The picture above shows this method:

* Each hash value is the address of the head of a linked list.
* Same hash values are stored in a linked list.

In this way, a million numbers can be put into 1000 linked lists, and also we can think each linked list as a `bucket`, and the `hash value` is the number of a `bucket`.

When searching a value, 2 steps are needed:

1. Calculate the hash value which also means the number of a bucket. This action's time complexity is O(1).
2. Loop the bucket and find the matched node according to the key. This action's time complexity is O(1) at best, O(n) at worst.

## Implementation

Here is a sample implementation of the 6-digit city's hash table.

```js
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
```


## Exercises

### Find the common part of two arrays(only contain numbers). Each number can only be consumed once.

```
Input: nums1=[1,3,5,2] nums2=[5,1,1,6,9]
Output: [1,5]
```

An example answer: 

```ts
/**
 * Use an `object` as a hash table.
 **/

const findCommonArray = (nums1: number[], nums2: number[]): number[] => {
  const map: object = {};
  const res: number[] = [];
  nums1.forEach((num, index) => {
    map[num] = 1;
  });
  nums2.forEach((num, index) => {
    if (map[num] === 1) {
      res.push(num);
      // This number is consumed.
      map[num] = 0;
    }
  });
  return res;
}

const nums1 = [1, 1, 1, 5, 2, 4, 9];
const nums2 = [5, 8, 5, 9, 1, 1];
console.log(findCommonArray(nums1, nums2)); // [5,9,1]
```

### Given an array `nums` and a target number `target`, find two numbers' sum equals `target`. And each number can only be used once. And a pair of numbers are enough.

```ts

/**
 * Here is an prerequisite:
 * Each number in `nums` are unique.
*/
const findTwoNumbersByTarget = (nums: number[], target: number): number[] => {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    map.set(num, i);
    const d = target - num;
    if (map.has(d)) {
      return [i, map.get(d)];
    }
  }
  return null;
}

const nums = [1, 6, 9, 5];
const target = 14;
console.log(findTwoNumbersByTarget(nums, target)); // [3,2]
```

### Given an array `nums` and a target number `target`, find all matched combinations of three numbers' sum equals `target`. And each combination can only be used once.

```ts

const findThreeNumbersByTarget = (nums: number[], target: number): number[][] => {
  const res: number[][] = [];
  const map = new Map();
  const len = nums.length;
  let left = 0;
  let mid = 1;

  // Sort the numbers from min to max
  nums.sort((a, b) => (a - b));

  // Put all nums into a set
  // Time complexity is O(n)
  for (let i = 0; i < len; i++) {
    const num = nums[i];
    if (typeof map.get(num) === 'undefined') {
      map.set(num, [i]);
    } else {
      const indexs = map.get(num);
      indexs.push(i);
      map.set(num, indexs);
    }
  }

  // Find the matched number by moving the two pointers,
  // three numbers' sum can be seen as finding the match number
  // equals target - num1 - num2.
  while (left < len - 2) {
    // Minimum number is still bigger than target
    if (nums[left] > target) {
      break;
    }
    // mid number reach the end
    if (mid === len - 2) {
      left++;
      mid = left + 1;
      continue;
    }

    let lastNum = target - nums[left] - nums[mid];
    const matchedNums: number[] = map.get(lastNum);
    // Can't find the match number,
    // move the pointer.
    if (typeof matchedNums === 'undefined') {
      mid++;
    }
    // find the matched number
    else {
      matchedNums.forEach((matchNum: number) => {
        // Don't add repeated combination
        if (
          left !== matchNum &&
          mid !== matchNum &&
          nums[left] !== nums[left - 1] &&
          nums[mid] !== nums[mid - 1]
        ) {
          const combination = [nums[left], nums[mid], nums[matchNum]];
          res.push(combination);
        }
      });
      mid++;
    }
  }
  return res;
}

const nums: number[] = [1, 0, -1, 5, 9, 7, 7, 6, 0, -1];
console.log(findThreeNumbersByTarget(nums, 15)); // [ [ -1, 7, 9 ], [ 0, 6, 9 ], [ 1, 5, 9 ], [ 1, 7, 7 ] ]
```