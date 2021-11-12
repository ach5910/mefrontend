"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../../utils");

require("../../styles/styles.scss");

require("../../styles/partials/_toggle.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Toggle = function Toggle(_ref) {
  var checked = _ref.checked,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? "Label" : _ref$label,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? "toggle" : _ref$id,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? "name" : _ref$name,
      handleChange = _ref.handleChange;

  var _useState = (0, _react.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      checkedClass = _useState2[0],
      setCheckedClass = _useState2[1];

  var handleCheckedClass = (0, _react.useCallback)(function (checked) {
    return function (e) {
      var className = checked ? "checkbox--unchecked" : "checkbox--checked";
      setCheckedClass(className);
    };
  }, [setCheckedClass]);
  var handleAnimationEnd = (0, _react.useCallback)(function (e) {
    if (/opacity-out/.test(e.animationName)) {
      setCheckedClass("");
    }
  }, [setCheckedClass]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    role: "group",
    "aria-owns": "".concat(id, "__track-container"),
    className: (0, _classnames["default"])("selection-wrapper")
  }, label && /*#__PURE__*/_react["default"].createElement("label", {
    className: "selection__label",
    onClick: function onClick(e) {
      (0, _utils.stopAllPropagation)(e);
      handleChange(e);
    },
    htmlFor: id
  }, label), /*#__PURE__*/_react["default"].createElement("div", {
    role: "group",
    id: "".concat(id, "__track-container"),
    className: "toggle__track-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])("toggle__track", {
      "toggle__track--checked": checked,
      "toggle__track--disabled": disabled
    })
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: id,
    name: name,
    disabled: disabled,
    checked: checked,
    onClick: handleCheckedClass(checked),
    onChange: handleChange,
    className: (0, _classnames["default"])("toggle", checkedClass),
    type: "checkbox",
    role: "switch"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    role: "button",
    "aria-pressed": checked,
    "aria-controls": id,
    onAnimationEnd: handleAnimationEnd,
    className: "selection__box selection__box--toggle"
  }))));
};

Toggle.defaultProps = {};
Toggle.propTypes = {};
var _default = Toggle;
exports["default"] = _default;

//# sourceMappingURL=index.jsx.map