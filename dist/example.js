Object.defineProperty(exports, "__esModule", {
    value: true,
});

// var _fs = require("fs");
var tester = require("./bit-tester/index");


// var _tester = _interopRequireDefault(tester);

// function _interopRequireDefault(obj) {
//     return obj && obj.__esModule
//         ? obj
//         : {
//               default: obj,
//           };
// }

tester.run("src/ui/Input/Input.test.js");
tester.run("src/ui/Textarea/Textarea.test.js");
tester.run("src/ui/Checkbox/Checkbox.test.js");
tester.run("src/test-utils.test.js");