"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// Rabin Karp text matching algorithm
// Return both boolean if the pattern (pat) and txt (text) are a match or not
var rabinKarp = function rabinKarp(pat, txt) {
  var M = pat.length;
  var N = txt.length;
  var q = 31;
  var d = 256;
  var i;
  var j;
  var p = 0; // hash value for pattern

  var t = 0; // hash value for txt

  var h = 1; // The value of h would be "pow(d, M-1)%q"

  for (i = 0; i < M - 1; i += 1) {
    h = h * d % q;
  } // Calculate the hash value of pattern and first
  // window of text


  for (i = 0; i < M; i += 1) {
    p = (d * p + pat.charCodeAt(i)) % q;
    t = (d * t + txt.charCodeAt(i)) % q;
  } // Slide the pattern over text one by one


  for (i = 0; i <= N - M; i += 1) {
    // Check the hash values of current window of text
    // and pattern. If the hash values match then only
    // check for characters on by one
    if (p === t) {
      /* Check for characters one by one */
      for (j = 0; j < M; j += 1) {
        if (txt[i + j] !== pat[j]) break;
      } // if p == t and pat[0...M-1] = txt[i, i+1, ...i+M-1]


      if (j === M) {
        return true;
      }
    } // Calculate hash value for next window of text: Remove
    // leading digit, add trailing digit


    if (i < N - M) {
      t = (d * (t - txt.charCodeAt(i) * h) + txt.charCodeAt(i + M)) % q; // We might get negative value of t, converting it
      // to positive

      if (t < 0) t += q;
    }
  }

  return false;
};

var _default = rabinKarp;
exports["default"] = _default;

//# sourceMappingURL=index.js.map