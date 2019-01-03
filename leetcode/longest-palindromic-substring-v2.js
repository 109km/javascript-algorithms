let longestPalindrome = function(s) {
  if (s.length === 0) {
    return "";
  }
  if (s.length === 1) {
    return s;
  }

  // The longest palindromic string start position.
  let start = 0;
  // The longest palindromic
  let end = 0;

  // Move the circle's center
  for (let i = 0; i < s.length; i++) {
    let len1 = expandAroundCenter(s, i, i);
    let len2 = expandAroundCenter(s, i, i + 1);
    let len;
    if (len1 > len2) {
      len = len1;
    } else {
      len = len2;
    }

    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor( len / 2);
    }
  }
  return s.slice(start, end + 1);
}

// Test if is palindromic string and
// calculate the max length based on the coordinate `left` and `right`
let expandAroundCenter = function(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  // At last, right = rightPosition + 1
  // left = leftPosition - 1
  return right - left - 1;
}

let s = 'abacccaba';
console.log(longestPalindrome(s));