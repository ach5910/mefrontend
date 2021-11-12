"use strict";

var _react = _interopRequireDefault(require("react"));

var _testUtils = require("../../test-utils");

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var value;
var handleChange = jest.fn(function (e) {
  e.persist();
  value = e.target.value;
});
afterEach(function () {
  value = null;
  jest.clearAllMocks();
});

var getTextArea = function getTextArea(screen) {
  return screen.getByRole("textbox");
};

it('renders an input with a label', function () {
  (0, _testUtils.render)( /*#__PURE__*/_react["default"].createElement(_["default"], {
    handleChange: handleChange,
    label: "Test Label",
    value: ""
  }));
  expect(getTextArea(_testUtils.screen)).toBeInTheDocument();
});
it('defaults to one row', function () {
  (0, _testUtils.render)( /*#__PURE__*/_react["default"].createElement(_["default"], {
    handleChange: handleChange,
    label: "Test Label",
    value: "test value"
  }));
  expect(getTextArea(_testUtils.screen).rows).toEqual(1);
});
it('displays error messages', function () {
  (0, _testUtils.render)( /*#__PURE__*/_react["default"].createElement(_["default"], {
    handleChange: handleChange,
    label: "Test Label",
    value: "",
    error: "Test Error"
  }));
  expect(_testUtils.screen.getByRole("textbox")).toHaveDescription("Test Error");
});
it('sets an input as required', function () {
  (0, _testUtils.render)( /*#__PURE__*/_react["default"].createElement(_["default"], {
    handleChange: handleChange,
    label: "Test Label",
    value: "",
    required: true
  }));
  expect(_testUtils.screen.getByRole("textbox")).toBeRequired();
});
it('blocks input when readOnly prop is true', function () {
  (0, _testUtils.render)( /*#__PURE__*/_react["default"].createElement(_["default"], {
    handleChange: handleChange,
    label: "Test Label",
    value: "",
    readOnly: true
  }));

  _testUtils.userEvent.type(_testUtils.screen.getByRole("textbox"), "test value");

  expect(handleChange).not.toHaveBeenCalled();
});
it('allows input when readOnly prop is false', function () {
  (0, _testUtils.render)( /*#__PURE__*/_react["default"].createElement(_["default"], {
    handleChange: handleChange,
    label: "Test Label",
    value: "",
    readOnly: false
  }));

  _testUtils.userEvent.type(_testUtils.screen.getByRole("textbox"), "test value");

  expect(handleChange).toHaveBeenCalled();
});
it('calls handleChange with the change event', function () {
  (0, _testUtils.render)( /*#__PURE__*/_react["default"].createElement(_["default"], {
    handleChange: handleChange,
    label: "Test Label",
    value: ""
  }));

  _testUtils.userEvent.type(_testUtils.screen.getByRole("textbox"), "test value");

  expect(handleChange).toHaveBeenCalled();
  expect(handleChange).toHaveBeenCalledTimes(10);
  expect(value).toBe("e");
});

//# sourceMappingURL=Textarea.test.jsx.map