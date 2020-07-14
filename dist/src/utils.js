"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;
exports.clamp = clamp;
exports.InvalidTypeException = InvalidTypeException;
exports.underscoresToCamelCase = underscoresToCamelCase;
exports.transformPythonResponse = transformPythonResponse;
exports.logError = logError;
exports.isNonemptyArray = isNonemptyArray;
exports.safeSort = safeSort;
exports.useOnClickOutside = useOnClickOutside;
exports.useFocus = useFocus;
exports.usePrevious = usePrevious;
exports.useMeasure = useMeasure;
exports.useUpdateEffect = useUpdateEffect;
exports.useInterval = useInterval;
exports.useStateObject = useStateObject;
exports.useKeys = useKeys;
exports.getLineHeight = getLineHeight;
exports.stopAllPropagation = stopAllPropagation;
exports.triggerInputChange = exports.rabinKarp = void 0;

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function noop() {}
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
  return Math.min(Math.max(Number.parseInt(val, 10), min), max);
}

function InvalidTypeException(expectedType) {
  this.message = "Invalid type, expected ".concat(expectedType);
  this.name = "InvalidTypeException";
}
/**
 * @param {string} variableName snake-cased string
 *
 * @returns {string} string formatted to camel-case
 */


function underscoresToCamelCase(variableName) {
  if (typeof variableName !== "string") {
    throw new InvalidTypeException("string");
  }

  var variableNameChunks = variableName.split("_");

  if (variableNameChunks.length > 1) {
    return variableNameChunks.reduce(function (newVariableName, nameChunk, index) {
      return newVariableName + (index === 0 ? nameChunk.toLowerCase() : nameChunk[0].toUpperCase() + nameChunk.slice(1));
    });
  }

  return variableName;
}
/**
 * @param {Object} responseData snake-cased object
 *
 * @return {Object} object formatted to camel-case
 */


function transformPythonResponse(responseData) {
  if (Array.isArray(responseData)) {
    return responseData.map(function (item) {
      return _typeof(item) === "object" && item !== null ? transformPythonResponse(item) : item;
    }, []);
  }

  if (_typeof(responseData) === "object" && responseData !== null) {
    var newObject = {};
    Object.keys(responseData).forEach(function (oldKey) {
      var newKey = underscoresToCamelCase(oldKey);
      var newVal = transformPythonResponse(responseData[oldKey]);
      newObject[newKey] = newVal;
    });
    return newObject;
  }

  return responseData;
}

function logError(msg) {
  return function catchError(err) {
    console.log(msg, err);
  };
}
/**
 * @param {*} arr
 *
 * @returns {boolean}
 */


function isNonemptyArray(arr) {
  return Array.isArray(arr) && arr.length > 0;
} // The go-to sort((a, b) => return a-b) works almost everywhere but is still inconsistent
// in some browsers/environments. This method is implicit and eradicates the inconsistency


function safeSort(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

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

function useFocus() {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      focused = _useState2[0],
      set = _useState2[1];

  return {
    focused: focused,
    bind: {
      onFocus: function onFocus() {
        return set(true);
      },
      onBlur: function onBlur() {
        return set(false);
      }
    }
  };
}

function usePrevious(value) {
  var ref = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
}
/**
 * Hook that's used to observe changes to a components bounding client rect
 *
 * @return {Object:bind, Object:rect}
 */


function useMeasure() {
  var connect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var ref = (0, _react.useRef)();

  var _useState3 = (0, _react.useState)({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      bounds = _useState4[0],
      set = _useState4[1];

  var _useState5 = (0, _react.useState)(function () {
    return new _resizeObserverPolyfill.default(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          entry = _ref2[0];

      set(entry.contentRect);
    });
  }),
      _useState6 = _slicedToArray(_useState5, 1),
      ro = _useState6[0];

  (0, _react.useEffect)(function () {
    if (connect) {
      ro.observe(ref.current);
    } else if (ro && ro.disconnect) {
      ro.disconnect();
    }

    return function () {
      if (ro && ro.disconnect) {
        ro.disconnect();
      }
    };
  }, [connect]);
  return [{
    ref: ref
  }, bounds];
}
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

function useStateObject(initState) {
  return (0, _react.useReducer)(function (state, newState) {
    return _objectSpread({}, state, {}, newState);
  }, initState);
}

function useKeys(keyMap) {
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var handleKey = (0, _react.useCallback)(function (e) {
    if (["INPUT", "TEXTAREA"].includes(e.target.nodeName)) return; // Check for macro keys

    var keyStr = ["shift", "ctrl", "alt", "meta"].reduce(function (acc, key) {
      if (e["".concat(key, "Key")]) {
        return "".concat(acc).concat(key, "+");
      }

      return acc;
    }, "");
    keyStr = "".concat(keyStr).concat(e.key);

    if (keyMap[keyStr]) {
      document.activeElement.blur();
      keyMap[keyStr](); // Check if a capital letter was given as 'shift+<letter>'
    } else if (keyStr.indexOf("+") > -1) {
      var _keyStr$split = keyStr.split("+"),
          _keyStr$split2 = _slicedToArray(_keyStr$split, 2),
          macro = _keyStr$split2[0],
          letter = _keyStr$split2[1];

      if (macro == "shift" && keyMap[letter]) {
        document.activeElement.blur();
        keyMap[letter]();
      }
    }
  }, deps);
  (0, _react.useEffect)(function () {
    document.addEventListener("keydown", handleKey);
    return function () {
      return document.removeEventListener("keydown", handleKey);
    };
  }, deps);
}

function getLineHeight(element) {
  var temp = document.createElement(element.nodeName);
  temp.className = element.className;
  temp.setAttribute("style", "margin:0px;padding:0px;");
  if (temp.type == "textarea") temp.rows = 1;
  temp.innerHTML = "test";
  temp = element.parentNode.appendChild(temp);
  var ret = temp.clientHeight;
  temp.parentNode.removeChild(temp);
  return ret;
}

function stopAllPropagation(e) {
  if (!e) return;
  if (e.preventDefault) e.preventDefault();
  if (e.stopPropagation) e.stopPropagation();
  if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) e.nativeEvent.stopImmediatePropagation();
} // Rabin Karp text matching algorithm
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

exports.rabinKarp = rabinKarp;
var inputTypes = [window.HTMLInputElement, window.HTMLSelectElement, window.HTMLTextAreaElement];
/**
 * Programmatically trigger React's onChange handler
 * 
 * @param {Node} node 
 * @param {string} value 
 */

var triggerInputChange = function triggerInputChange(node) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  // only process the change on elements we know have a value setter in their constructor
  if (inputTypes.indexOf(node.__proto__.constructor) > -1) {
    // Get reference to the node's value setter
    var setValue = Object.getOwnPropertyDescriptor(node.__proto__, 'value').set;
    var event = new Event('input', {
      bubbles: true
    }); // Update node.value then dispatch an event

    setValue.call(node, value);
    node.dispatchEvent(event);
  }
};

exports.triggerInputChange = triggerInputChange;

//# sourceMappingURL=utils.js.map