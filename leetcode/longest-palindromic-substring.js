/** 
 * 
Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

Example 1:

Input: "babad"
Output: "bab"
Note: "aba" is also a valid answer.
Example 2:

Input: "cbbd"
Output: "bb"

 * 
*/

/**
 * @param {string} s
 * @return {string}
 */
let longestPalindrome = function(s) {

  if (s.length < 1) {
    return '';
  }

  let maxString = '';

  for (let i = 0; i < s.length; i++) {
    let currentChar = s[i];
    // Find the last char's index which is equal to `currentChar`.
    // And then test if the string is a palindromic string.
    // If not, find the next.
    let j = s.lastIndexOf(currentChar);

    if (i === j && maxString.length === 0) {
      maxString = currentChar;
    }
    while (j > i) {
      // Find the substring.
      let substring = s.slice(i, j + 1);
      // Judge if this is a palindromic string.
      // Once we find the palindromic string, the circulation
      // can break.
      if (testPalindromicString(substring)) {
        if (substring.length > maxString.length) {
          maxString = substring;
        }
        break;
      } else {
        j = s.lastIndexOf(currentChar, j - 1);
      }
    }
    // If the length is long enough 
    // then we don't need to search any more
    if (maxString.length >= s.length - i) {
      break;
    }
  }
  return maxString;
};

let testPalindromicString = function(s) {
  let sArray = s.split('');
  let reversedArray = s.split('').reverse();
  let i = 0;
  let isPalindromic = true;

  while (i < sArray.length) {
    if (sArray[i] !== reversedArray[i]) {
      isPalindromic = false;
      break;
    }
    i++;
  }
  return isPalindromic;
}
let s = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

console.time('start');
console.log(longestPalindrome(s));
console.timeEnd('start');