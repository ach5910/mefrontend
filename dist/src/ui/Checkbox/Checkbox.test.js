"use strict";

var _react = _interopRequireDefault(require("react"));

var _ = _interopRequireDefault(require("."));

var _testUtils = require("../../test-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

it('should only include one checkbox', function () {
  var handleChange = jest.fn();
  (0, _testUtils.render)( /*#__PURE__*/_react["default"].createElement(_["default"], {
    checked: false,
    id: "test",
    handleChange: handleChange
  }));
  expect(_testUtils.screen.queryAllByRole("checkbox").length).toEqual(1);
});

//# sourceMappingURL=Checkbox.test.js.map