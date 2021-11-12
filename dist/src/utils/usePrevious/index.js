"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = usePrevious;

var _react = require("react");

/**
 * Creates a reference to a variables previous value.
 * @param {any} value 
 * 
 * @returns {any} Previous value
 */
function usePrevious(value) {
  var ref = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
}

//# sourceMappingURL=index.js.map