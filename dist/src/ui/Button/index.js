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

require("../../styles/partials/_button.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Button = function Button(_ref) {
  var onClick = _ref.onClick,
      label = _ref.label,
      throttle = _ref.throttle,
      disabled = _ref.disabled,
      className = _ref.className,
      style = _ref.style;
  var timeoutId = (0, _react.useRef)(null);
  var handleClick = (0, _react.useCallback)(function (e) {
    if (timeoutId.current === null) {
      (0, _utils.rippleClick)(onClick, {
        delayTime: 300
      })(e);
      timeoutId.current = setTimeout(function () {
        timeoutId.current = null;
      }, throttle);
    }
  }, [onClick, throttle]);
  return /*#__PURE__*/_react["default"].createElement("button", {
    style: style,
    type: "button",
    onClick: handleClick,
    disabled: disabled,
    className: (0, _classnames["default"])("btn", _defineProperty({}, className, className))
  }, label);
};

Button.defaultProps = {
  label: "",
  throttle: 200,
  disabled: false,
  isOnline: true,
  style: {}
};
Button.propTypes = {
  onClick: _propTypes["default"].func.isRequired,
  label: _propTypes["default"].string,
  throttle: _propTypes["default"].number,
  disabled: _propTypes["default"].bool,
  isOnline: _propTypes["default"].bool,
  style: _propTypes["default"].objectOf([_propTypes["default"].string, _propTypes["default"].number])
};
var _default = Button;
exports["default"] = _default;

//# sourceMappingURL=index.jsx.map