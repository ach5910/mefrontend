"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Icons = require("../Icons");

var _propTypes2 = require("../../propTypes");

var _utils = require("../../utils");

require("../../styles/styles.scss");

require("../../styles/partials/_chip.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Chip = function Chip(_ref) {
  var text = _ref.text,
      onClick = _ref.onClick,
      throttle = _ref.throttle,
      avatar = _ref.avatar,
      selected = _ref.selected,
      style = _ref.style,
      disabled = _ref.disabled,
      remove = _ref.remove,
      activated = _ref.activated;
  var timeoutId = (0, _react.useRef)(null);
  var handleClick = (0, _react.useCallback)(function (e) {
    if (timeoutId.current === null) {
      (0, _utils.rippleClick)(onClick, {
        delayTime: 300,
        className: "chip--pressed"
      })(e);
      timeoutId.current = setTimeout(function () {
        timeoutId.current = null;
      }, throttle);
    }
  }, [onClick, throttle]);
  return /*#__PURE__*/_react["default"].createElement("button", {
    style: style,
    onClick: handleClick,
    disabled: disabled,
    tabIndex: "0",
    className: (0, _classnames["default"])("chip", {
      "chip--activated": activated
    })
  }, avatar && /*#__PURE__*/_react["default"].createElement("div", {
    className: "chip__avatar"
  }, /*#__PURE__*/_react["default"].createElement(_Icons.AddIcon, null)), selected && /*#__PURE__*/_react["default"].createElement("div", {
    className: "chip__selected"
  }, /*#__PURE__*/_react["default"].createElement(_Icons.CheckIcon, null)), /*#__PURE__*/_react["default"].createElement("span", {
    className: "chip__text"
  }, text), remove && /*#__PURE__*/_react["default"].createElement("div", {
    className: "chip__remove"
  }, /*#__PURE__*/_react["default"].createElement(_Icons.CloseIcon, null)));
};

Chip.defaultProps = {
  onClick: _utils.noop,
  avatar: false,
  disabled: false,
  remove: false,
  selected: false,
  activated: false,
  style: {},
  throttle: 300
};
Chip.propTypes = {
  text: _propTypes2.alphaNumeric.isRequired,
  onClick: _propTypes["default"].func,
  avatar: _propTypes["default"].node,
  disabled: _propTypes["default"].bool,
  selected: _propTypes["default"].bool,
  activated: _propTypes["default"].bool,
  remove: _propTypes["default"].bool,
  style: _propTypes2.styleShape,
  throttle: _propTypes["default"].number
};
var _default = Chip;
exports["default"] = _default;

//# sourceMappingURL=index.jsx.map