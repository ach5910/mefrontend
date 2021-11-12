"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  render: true,
  userEvent: true
};
exports.render = render;
Object.defineProperty(exports, "userEvent", {
  enumerable: true,
  get: function get() {
    return _ach5910Mefrontend2["default"];
  }
});

var _react = _interopRequireDefault(require("react"));

require("react-dom");

require("@bit/ach5910.mefrontend.dom-testing-library");

require("@testing-library/jest-dom/extend-expect");

var _ach5910Mefrontend2 = _interopRequireDefault(require("@bit/ach5910.mefrontend.user-event"));

var _ach5910Mefrontend3 = require("@bit/ach5910.mefrontend.react-testing-library");

Object.keys(_ach5910Mefrontend3).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ach5910Mefrontend3[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint react/prop-types: 0 */

/**
 * Extends `@testing-library/react` to add a
 * react-redux `<Provider/>` wrapper
 * @param {React.ReactNode} ui The node to be rendered
 * @param {object} options Render options
 */
function render(ui) {
  function Wrapper(_ref) {
    var children = _ref.children;
    return children;
  }

  return (0, _ach5910Mefrontend3.render)(ui, {
    wrapper: Wrapper
  });
} // re-export everything

//# sourceMappingURL=test-utils.jsx.map