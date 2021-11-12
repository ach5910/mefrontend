"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useUpdateEffect;

var _react = require("react");

/**
 * Custom hooks that doesn't fire the callback when the component mounts.
 * Replicates the React class componentDidUpdate life cycle method.
 * @param {function} fn
 * @param {any[]} deps Dependencies
 */
function useUpdateEffect(fn, deps) {
  var isMounted = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    if (isMounted.current) {
      fn();
    } else {
      isMounted.current = true;
    }
  }, deps);
}

//# sourceMappingURL=index.js.map