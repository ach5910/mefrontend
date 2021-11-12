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

var _utils = require("../../utils");

require("../../styles/styles.scss");

require("../../styles/partials/_search.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var SearchInput = function SearchInput(_ref) {
  var handleChange = _ref.handleChange,
      handleKeyDown = _ref.handleKeyDown,
      value = _ref.value,
      placeholder = _ref.placeholder;
  var inputRef = (0, _react.useRef)(null);

  var handleClear = function handleClear() {
    (0, _utils.triggerInputChange)(inputRef.current);
    inputRef.current.focus();
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "search"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "search__icon"
  }, /*#__PURE__*/_react["default"].createElement(_Icons.SearchIcon, null)), /*#__PURE__*/_react["default"].createElement("input", {
    className: "search__input",
    ref: inputRef,
    handleKeyDown: handleKeyDown,
    type: "search",
    value: value,
    onChange: handleChange,
    placeholder: placeholder,
    autoComplete: "off"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    onClick: handleClear,
    tabIndex: "-1",
    role: "button",
    className: (0, _classnames["default"])("search__clear", {
      "search__clear--visible": value != ""
    })
  }, /*#__PURE__*/_react["default"].createElement(_Icons.CloseIcon, null)));
};

SearchInput.defaultProps = {
  placeholder: "",
  handleKeyDown: _utils.noop
};
SearchInput.propTypes = {
  handleSearch: _propTypes["default"].func.isRequired,
  value: _propTypes["default"].string.isRequired,
  placeholder: _propTypes["default"].string,
  handleKeyDown: _propTypes["default"].func
};
var _default = SearchInput;
exports["default"] = _default;

//# sourceMappingURL=index.jsx.map