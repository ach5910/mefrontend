"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useMeasure;

var _react = require("react");

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Hook that's used to observe changes to a components bounding client rect
 *
 * @return {Object:bind, Object:rect}
 */
function useMeasure() {
  var connect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var ref = (0, _react.useRef)();

  var _useState = (0, _react.useState)({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      bounds = _useState2[0],
      set = _useState2[1];

  var _useState3 = (0, _react.useState)(function () {
    return new _resizeObserverPolyfill["default"](function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          entry = _ref2[0];

      set(entry.contentRect);
    });
  }),
      _useState4 = _slicedToArray(_useState3, 1),
      ro = _useState4[0];

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

//# sourceMappingURL=index.js.map