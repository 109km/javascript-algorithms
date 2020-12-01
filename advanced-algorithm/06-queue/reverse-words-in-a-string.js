const Dequeue = require('./queue').Dequeue;

function reverseWords(str) {
  const q = new Dequeue();

  let left = 0;
  let right = str.length - 1;

  while (str.charAt(left) === ' ') left++;
  while (str.charAt(right) === ' ') right--;

  let word = '';
  while (left <= right) {
    let char = str.charAt(left);
    if (char !== ' ') {
      word += char;
    } else if (char === ' ' && word !== '') {
      q.addFront(word);
      word = '';
    }
    left++;
  }
  return q.elements.join(' ');
}

console.log(reverseWords("     Hello,   world!  Nice!     "));