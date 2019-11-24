/**
 * 贪心算法的基本思路是从问题的某一个初始解出发一步一步地进行，
 * 根据某个优化测度，每一步都要确保能获得局部最优解。
 * 每一步只考虑一个数据，他的选取应该满足局部优化的条件。
 * 若下一个数据和部分最优解连在一起不再是可行解时，就不把该数据添加到部分解中，
 * 直到把所有数据枚举完，或者不能再添加算法停止 
 */

/**
 * 有一个背包，背包容量是M=150kg。有7个物品，物品不可以分割成任意大小。要求尽可能让装入背包中的物品总价值最大，但不能超过总容量。
 * 物品 A B C D E F G
 * 重量 35kg 30kg 6kg 50kg 40kg 10kg 25kg
 * 价值 10$ 40$ 30$ 50$ 35$ 40$ 30$
 * 
 */


function bagProblemInGreedy() {

  // 1. 子问题的最优解是单位重量价值最高。
  // 2. 串行解决
  let currentWeight = 0;
  const res = [];
  let products = [
    {
      name: "A",
      weight: 35,
      value: 10
    },
    {
      name: "B",
      weight: 30,
      value: 40
    },
    {
      name: "C",
      weight: 6,
      value: 30
    },
    {
      name: "D",
      weight: 50,
      value: 50
    },
    {
      name: "E",
      weight: 40,
      value: 35
    },
    {
      name: "F",
      weight: 10,
      value: 40
    },
    {
      name: "G",
      weight: 25,
      value: 30
    }
  ];

  function calPerVal(product) {
    return product.value / product.weight;
  }

  function findTheMostValuableProduct(arr) {
    let mostValueProduct = null;
    let currentIndex = 0;
    arr.map((item, index) => {
      if (mostValueProduct) {
        if (calPerVal(item) > calPerVal(mostValueProduct)) {
          mostValueProduct = item;
          currentIndex = index;
        }
      } else {
        mostValueProduct = item;
        currentIndex = index;
      }
    });
    return { mostValueProduct, currentIndex };
  }

  while (true) {
    let { mostValueProduct, currentIndex } = findTheMostValuableProduct(products);
    if (mostValueProduct) {
      if (currentWeight + mostValueProduct.weight > 150) {
        break;
      } else {
        products.splice(currentIndex, 1);
        res.push(mostValueProduct.name);
        currentWeight = currentWeight + mostValueProduct.weight;
      }
    } else {
      break;
    }
  }

  return res;

}

console.log(bagProblemInGreedy());