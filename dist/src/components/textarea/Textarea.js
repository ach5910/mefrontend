"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes2 = require("../../propTypes");

var _utils = require("../../utils");

require("../Input/_input.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Textarea = function Textarea(_ref) {
  var label = _ref.label,
      name = _ref.name,
      required = _ref.required,
      className = _ref.className,
      handleChange = _ref.handleChange,
      value = _ref.value,
      editOnFocus = _ref.editOnFocus,
      placeholder = _ref.placeholder,
      handleKeyDown = _ref.handleKeyDown,
      readOnly = _ref.readOnly,
      minRows = _ref.minRows,
      error = _ref.error;
  var inputRef = (0, _react.useRef)(null);
  var baseScrollHeight = (0, _react.useRef)(0);
  var lineHeight = (0, _react.useRef)(0);
  (0, _react.useEffect)(function () {
    var savedValue = inputRef.current.value;
    inputRef.current.value = "";
    inputRef.current.rows = minRows;
    baseScrollHeight.current = inputRef.current.scrollHeight;
    inputRef.current.value = savedValue;
    lineHeight.current = (0, _utils.getLineHeight)(inputRef.current);
    setTimeout(function () {
      if (inputRef.current) {
        inputRef.current.rows = minRows;
        var rows = Math.ceil((inputRef.current.scrollHeight - baseScrollHeight.current) / lineHeight.current);
        inputRef.current.rows = rows + minRows;
      }
    }, 200);
  }, []); // Logic for auto auto-sizing the textarea's height base on it's content

  (0, _utils.useUpdateEffect)(function () {
    inputRef.current.rows = minRows;
    var rows = Math.ceil((inputRef.current.scrollHeight - baseScrollHeight.current) / lineHeight.current);
    inputRef.current.rows = rows + minRows;
  }, [value]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)("input", className, {
      "input--active-on-focus": editOnFocus && value !== ""
    })
  }, /*#__PURE__*/_react.default.createElement("textarea", {
    ref: inputRef,
    name: "textarea--".concat(name),
    tabIndex: "0",
    readOnly: readOnly,
    onKeyDown: handleKeyDown,
    value: value,
    placeholder: placeholder,
    onChange: handleChange,
    required: required,
    "aria-describedby": "input__".concat(name, "--error"),
    autoComplete: "off",
    spellCheck: "false",
    className: "input__value"
  }), label && /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "textarea__".concat(name),
    className: "input__label"
  }, label), /*#__PURE__*/_react.default.createElement("span", {
    id: "input__".concat(name, "--error"),
    className: "input__error"
  }, error));
};

Textarea.defaultProps = {
  label: "",
  name: "",
  className: "",
  placeholder: "",
  editOnFocus: false,
  required: false,
  handleKeyDown: _utils.noop,
  readOnly: false,
  minRows: 1,
  error: ""
};
Textarea.propTypes = {
  label: _propTypes.default.string,
  name: _propTypes.default.string,
  className: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  handleChange: _propTypes.default.func.isRequired,
  value: _propTypes2.alphaNumeric.isRequired,
  editOnFocus: _propTypes.default.bool,
  required: _propTypes.default.bool,
  handleKeyDown: _propTypes.default.func,
  readOnly: _propTypes.default.bool,
  minRows: _propTypes2.numLike,
  error: _propTypes.default.string
};
var _default = Textarea;
exports.default = _default;

//# sourceMappingURL=Textarea.jsx.map