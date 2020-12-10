/**
 * Use an `object` as a hash table.
 **/

const findCommonArray = (arr1: number[], arr2: number[]): number[] => {
  const map: object = {};
  const res: number[] = [];
  arr1.forEach((num, index) => {
    map[num] = 1;
  });
  arr2.forEach((num, index) => {
    if (map[num] === 1) {
      res.push(num);
      // This number is consumed.
      map[num] = 0;
    }
  });
  return res;
}

const arr1 = [1, 1, 1, 5, 2, 4, 9];
const arr2 = [5, 8, 5, 9, 1, 1];
console.log(findCommonArray(arr1, arr2));