"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  render: true
};
exports.render = render;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

Object.keys(_react2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _react2[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  return (0, _react2.render)(ui, {
    wrapper: Wrapper
  });
} // re-export everything

//# sourceMappingURL=test-utils.jsx.map