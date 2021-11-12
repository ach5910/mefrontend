"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useKeys;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * A hook used for key binding and keyboard short cuts. The keyMap is an object containing
 * keys combinations that have custom functions as their corresponding values.
 * 
 * @param {Object.<string,Function>} keyMap 
 * @param {[any]} deps 
 */
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

//# sourceMappingURL=index.js.map