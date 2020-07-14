"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes2 = require("../../propTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Icon = function Icon(_ref) {
  var className = _ref.className,
      style = _ref.style,
      viewBox = _ref.viewBox,
      children = _ref.children;
  return /*#__PURE__*/_react.default.createElement("svg", {
    style: style,
    viewBox: viewBox,
    className: (0, _classnames.default)(_defineProperty({}, className, className))
  }, children);
};

Icon.defaultProps = {
  className: '',
  style: {},
  viewBox: "0 0 512 512",
  children: null
};
Icon.propTypes = {
  className: _propTypes.default.string,
  style: _propTypes2.styleShape,
  viewBox: _propTypes.default.string,
  children: _propTypes.default.node
};
var _default = Icon;
exports.default = _default;

//# sourceMappingURL=Icon.jsx.map