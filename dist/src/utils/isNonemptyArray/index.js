"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isNonemptyArray;

/**
 * @param {*} arr
 *
 * @returns {boolean}
 */
function isNonemptyArray(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

//# sourceMappingURL=index.js.map