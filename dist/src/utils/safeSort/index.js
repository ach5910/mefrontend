"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = safeSort;

// The go-to sort((a, b) => return a-b) works almost everywhere but is still inconsistent
// in some browsers/environments. This method is implicit and eradicates the inconsistency
function safeSort(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

//# sourceMappingURL=index.js.map