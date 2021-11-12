"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = _interopRequireDefault(require("."));

var _Button = _interopRequireDefault(require("../Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Dialog = function Dialog(_ref) {
  var handleClose = _ref.handleClose,
      handleOpen = _ref.handleOpen;
  return /*#__PURE__*/_react["default"].createElement(_["default"], {
    handleClose: handleClose
  }, /*#__PURE__*/_react["default"].createElement("h6", {
    className: "modal__header"
  }, "Dialog Header"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "modal__content"
  }, "LoremLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quod eius aperiam eligendi odio quo ea, explicabo alias officiis itaque accusantium quaerat earum culpa, a non velit reiciendis, rem dolorem."), /*#__PURE__*/_react["default"].createElement("div", {
    className: "btn-container"
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    label: "Cancel",
    onClick: handleClose,
    className: "btn--outline"
  }), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    label: "Submit",
    onClick: handleOpen
  })));
};

Dialog.defaultProps = {};
Dialog.propTypes = {};
var _default = Dialog;
exports["default"] = _default;

//# sourceMappingURL=Dialog.jsx.map