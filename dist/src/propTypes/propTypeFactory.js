"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Creates a PropType shape from the propObj and the requested optional
 * and requested props to apply
 *
 * @param {Object} propObj The custom propType's props object wrapped in a object so the name can be used
 *
 * @returns PropType.shape
 */
var propTypeFactory = function propTypeFactory(propObj) {
  return function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        optional = _ref.optional,
        required = _ref.required;

    var propTypeObject = {};

    var _Object$entries = Object.entries(propObj),
        _Object$entries2 = _slicedToArray(_Object$entries, 1),
        _Object$entries2$ = _slicedToArray(_Object$entries2[0], 2),
        propTypeName = _Object$entries2$[0],
        propType = _Object$entries2$[1];
    /**
     * Throws an error when a prop couldn't be accessed on a propType
     *
     * @param {string} prop
     */


    function logError(prop) {
      throw new Error("Invalid prop value for ".concat(propTypeName, "\n            \n").concat(propTypeName, ": [").concat(Object.keys(propType), "]\n            \nRecieved prop: ").concat(prop, "\n"));
    }
    /**
     * Adds the required PropTypes
     *
     * @param {string} prop
     */


    function requiredForEach(prop) {
      if (Object.prototype.hasOwnProperty.call(propType, prop)) {
        propTypeObject[prop] = propType[prop].isRequired;
      } else {
        logError(prop);
      }
    }
    /**
     * Adds the optional PropTypes
     *
     * @param {string} prop
     */


    function optionalForEach(prop) {
      if (Object.prototype.hasOwnProperty.call(propType, prop)) {
        propTypeObject[prop] = propType[prop];
      } else {
        logError(prop);
      }
    }

    if (Array.isArray(optional)) optional.forEach(optionalForEach);
    if (Array.isArray(required)) required.forEach(requiredForEach);
    if (Object.keys(propTypeObject).length == 0) return _propTypes["default"].shape(propType);
    return _propTypes["default"].shape(propTypeObject);
  };
};

var _default = propTypeFactory;
exports["default"] = _default;

//# sourceMappingURL=propTypeFactory.js.map