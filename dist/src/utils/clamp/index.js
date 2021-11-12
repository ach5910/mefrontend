"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = clamp;

/**
 * Returns a number bounds to an inclusive upper and lower limit
 *
 * @param {number} val
 * @param {number} min lower bound
 * @param {number} max upper bound
 *
 * @returns {number}
 */
function clamp(val) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
  return Math.min(Math.max(val, min), max);
}

//# sourceMappingURL=index.js.map