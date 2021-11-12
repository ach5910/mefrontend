"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useInterval;

var _react = require("react");

/**
 * Custom hook that sets up an interval and clears it after unmounting.
 * It’s a combo of setInterval and clearInterval tied to the component lifecycle.
 * 
 * @param {function} callback
 * @param {int} delay
 */
function useInterval(callback, delay) {
  var savedCallback = (0, _react.useRef)(); // Remember the latest callback.

  (0, _react.useEffect)(function () {
    savedCallback.current = callback;
  }, [callback]); // Set up the interval.
  // eslint-disable-next-line consistent-return

  (0, _react.useEffect)(function () {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      var id = setInterval(tick, delay);
      return function () {
        return clearInterval(id);
      };
    }
  }, [delay]);
}

//# sourceMappingURL=index.js.map