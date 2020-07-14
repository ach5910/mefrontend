"use strict";

var _react = _interopRequireDefault(require("react"));

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

var _testUtils = require("../../test-utils");

var _Input = _interopRequireDefault(require("./Input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var value;
var handleChange = jest.fn(function (e) {
  e.persist();
  value = e.target.value;
});
afterEach(function () {
  value = null;
  jest.clearAllMocks();
});
it('renders an input with a label', function () {
  (0, _testUtils.render)( /*#__PURE__*/_react.default.createElement(_Input.default, {
    type: "text",
    handleChange: handleChange,
    label: "Test Label",
    value: ""
  }));
  expect(_testUtils.screen.getByLabelText("Test Label")).toBeInTheDocument();
});
it('displays error messages', function () {
  (0, _testUtils.render)( /*#__PURE__*/_react.default.createElement(_Input.default, {
    type: "text",
    handleChange: handleChange,
    label: "Test Label",
    value: "",
    error: "Test Error"
  }));
  expect(_testUtils.screen.getByLabelText("Test Label")).toHaveDescription("Test Error");
});
it('sets an input as required', function () {
  (0, _testUtils.render)( /*#__PURE__*/_react.default.createElement(_Input.default, {
    type: "text",
    handleChange: handleChange,
    label: "Test Label",
    value: "",
    required: true
  }));
  expect(_testUtils.screen.getByLabelText("Test Label")).toBeRequired();
});
it('blocks input when readOnly prop is true', function () {
  (0, _testUtils.render)( /*#__PURE__*/_react.default.createElement(_Input.default, {
    type: "text",
    handleChange: handleChange,
    label: "Test Label",
    value: "",
    readOnly: true
  }));

  _userEvent.default.type(_testUtils.screen.getByRole("textbox"), "test value");

  expect(handleChange).not.toHaveBeenCalled();
});
it('allows input when readOnly prop is false', function () {
  (0, _testUtils.render)( /*#__PURE__*/_react.default.createElement(_Input.default, {
    type: "text",
    handleChange: handleChange,
    label: "Test Label",
    value: "",
    readOnly: false
  }));

  _userEvent.default.type(_testUtils.screen.getByRole("textbox"), "test value");

  expect(handleChange).toHaveBeenCalled();
});
it('calls handleChange with the change event', function () {
  (0, _testUtils.render)( /*#__PURE__*/_react.default.createElement(_Input.default, {
    type: "text",
    handleChange: handleChange,
    label: "Test Label",
    value: ""
  }));

  _userEvent.default.type(_testUtils.screen.getByRole("textbox"), "test value");

  expect(handleChange).toHaveBeenCalled();
  expect(handleChange).toHaveBeenCalledTimes(10);
  expect(value).toBe("e");
});
it('blocks text input on a number input', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var valid, handleNumber;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          handleNumber = jest.fn(function (e) {
            value = e.target.value;
            valid = e.target.validity.valid;
          });
          (0, _testUtils.render)( /*#__PURE__*/_react.default.createElement(_Input.default, {
            type: "number",
            handleChange: handleNumber,
            label: "Test Label",
            value: "0",
            min: "0",
            max: "10",
            step: "1"
          }));

          _userEvent.default.type(_testUtils.screen.getByLabelText("Test Label"), "invalid");

          _context.next = 5;
          return (0, _testUtils.waitFor)(function () {
            expect(handleNumber).toHaveBeenCalled();
          });

        case 5:
          expect(Number.isNaN(+value)).toBe(false);
          expect(valid).toBe(true);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
it('sets the number input to invalid when value is outside of range', function () {
  var _render = (0, _testUtils.render)( /*#__PURE__*/_react.default.createElement(_Input.default, {
    type: "number",
    handleChange: handleChange,
    label: "Test Label",
    value: "0",
    min: "0",
    max: "10",
    step: "1"
  })),
      rerender = _render.rerender;

  var input = _testUtils.screen.getByLabelText("Test Label");

  expect(input).toBeValid();
  rerender( /*#__PURE__*/_react.default.createElement(_Input.default, {
    type: "number",
    handleChange: handleChange,
    label: "Test Label",
    value: "11",
    min: "0",
    max: "10",
    step: "1"
  }));
  expect(input).toBeInvalid();
  rerender( /*#__PURE__*/_react.default.createElement(_Input.default, {
    type: "number",
    handleChange: handleChange,
    label: "Test Label",
    value: "-1",
    min: "0",
    max: "10",
    step: "1"
  }));
  expect(input).toBeInvalid();
});

//# sourceMappingURL=Input.test.jsx.map