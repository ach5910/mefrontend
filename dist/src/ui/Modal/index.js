"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../../utils");

var _propTypes2 = require("../../propTypes");

require("../../styles/styles.scss");

require("../../styles/partials/_modal.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Modal = function Modal(_ref) {
  var className = _ref.className,
      children = _ref.children,
      handleClose = _ref.handleClose,
      anchorRef = _ref.anchorRef;
  var modalRef = (0, _react.useRef)(null);
  (0, _utils.useOnClickOutside)(modalRef, handleClose);
  return (0, _reactDom.createPortal)( /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-backdrop"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    ref: modalRef,
    className: (0, _classnames["default"])("modal", _defineProperty({}, className, className))
  }, children)), anchorRef);
};

Modal.defaultProps = {
  className: "",
  anchorRef: document.body
};
Modal.propTypes = {
  anchorRef: _propTypes2.ref,
  handleClose: _propTypes["default"].func.isRequired,
  children: _propTypes["default"].node.isRequired,
  className: _propTypes["default"].string
};
var _default = Modal;
exports["default"] = _default;

//# sourceMappingURL=index.jsx.map