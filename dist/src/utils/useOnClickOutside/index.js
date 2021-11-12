"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useOnClickOutside;

var _react = require("react");

/**
 * Check's all click events and invokes the handler when a click that originated
 * outside of the ref's container is found
 * 
 * @param {{current: Node}} ref 
 * @param {Function} handler 
 * 
 * @returns {Function} Wrapped function that will remove the click listener when invoked
 */
function useOnClickOutside(ref, handler) {
  (0, _react.useEffect)(function () {
    var listener = function listener(event) {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("click", listener);
    return function () {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}

//# sourceMappingURL=index.js.map