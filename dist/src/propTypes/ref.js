"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = require("prop-types");

/**
 *
 * Represents a React ref of an element
 *
 */
var _default = (0, _propTypes.oneOfType)([_propTypes.func, (0, _propTypes.shape)({
  current: (0, _propTypes.instanceOf)(Element)
})]);

exports["default"] = _default;

//# sourceMappingURL=ref.js.map