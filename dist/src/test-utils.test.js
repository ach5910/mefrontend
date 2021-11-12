"use strict";

var _react = _interopRequireDefault(require("react"));

var _testUtils = require("./test-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

it('renders a div', function () {
  (0, _testUtils.render)( /*#__PURE__*/_react["default"].createElement("div", null, "Hey"));
  expect(_testUtils.screen.getByText("Hey")).toBeInTheDocument();
});

//# sourceMappingURL=test-utils.test.jsx.map