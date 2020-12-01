const { Dequeue } = require("./queue");

function maxNoneRepeatSubstring(str) {
  let win = new Dequeue();
  let max = 0;

  let left = 0;
  let right = 0;

  while (left < str.length) {
    let char = str.charAt(right);
    // Find the char in current queue,
    // or reached the right end.
    if (win.elements.indexOf(char) >= 0 || right === str.length - 1) {
      left++;
      right = left;
      max = win.size > max ? win.size : max;
      win.clear();
    }
    // Can't find repeated char
    else if (char) {
      win.addEnd(char);
      right++;
    }
  }
  return max;
}

const maxLength = maxNoneRepeatSubstring("abcba");
console.log(maxLength);
