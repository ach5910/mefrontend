"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes2 = require("../../propTypes");

var _utils = require("../../utils");

require("../../styles/styles.scss");

require("../../styles/partials/_input.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Input = function Input(_ref) {
  var label = _ref.label,
      name = _ref.name,
      pattern = _ref.pattern,
      required = _ref.required,
      className = _ref.className,
      handleChange = _ref.handleChange,
      value = _ref.value,
      editOnFocus = _ref.editOnFocus,
      placeholder = _ref.placeholder,
      handleKeyDown = _ref.handleKeyDown,
      readOnly = _ref.readOnly,
      bindInput = _ref.bindInput,
      tabIndex = _ref.tabIndex,
      type = _ref.type,
      min = _ref.min,
      max = _ref.max,
      step = _ref.step,
      error = _ref.error;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])("input", className, {
      "input--edit-on-focus": editOnFocus && value !== ""
    })
  }, /*#__PURE__*/_react["default"].createElement("input", _extends({
    name: name,
    type: type,
    tabIndex: tabIndex,
    readOnly: readOnly,
    pattern: pattern,
    onKeyDown: handleKeyDown,
    value: value,
    placeholder: placeholder,
    onChange: handleChange,
    required: required,
    autoComplete: "off",
    className: "input__value",
    "aria-describedby": "input__".concat(name, "--error"),
    id: "input__".concat(name),
    min: min,
    max: max,
    step: step
  }, bindInput)), label && /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "input__".concat(name),
    className: "input__label"
  }, label), /*#__PURE__*/_react["default"].createElement("span", {
    id: "input__".concat(name, "--error"),
    className: "input__error"
  }, error));
};

Input.defaultProps = {
  label: "",
  name: "",
  className: "",
  placeholder: undefined,
  editOnFocus: false,
  required: false,
  pattern: undefined,
  handleKeyDown: _utils.noop,
  readOnly: false,
  bindInput: {},
  tabIndex: "0",
  type: "text",
  min: "",
  max: "",
  step: "any",
  error: ""
};
Input.propTypes = {
  label: _propTypes["default"].string,
  name: _propTypes["default"].string,
  className: _propTypes["default"].string,
  placeholder: _propTypes["default"].string,
  handleChange: _propTypes["default"].func.isRequired,
  value: _propTypes2.alphaNumeric.isRequired,
  editOnFocus: _propTypes["default"].bool,
  required: _propTypes["default"].bool,
  pattern: _propTypes["default"].string,
  handleKeyDown: _propTypes["default"].func,
  readOnly: _propTypes["default"].bool,
  tabIndex: _propTypes2.numLike,
  type: _propTypes["default"].string,
  min: _propTypes2.numLike,
  max: _propTypes2.numLike,
  step: _propTypes2.alphaNumeric,
  error: _propTypes["default"].string,
  bindInput: _propTypes["default"].objectOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].func, _propTypes2.ref]))
};
var _default = Input;
exports["default"] = _default;

//# sourceMappingURL=index.jsx.map