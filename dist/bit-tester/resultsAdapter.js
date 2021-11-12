"use strict";

var isEmpty = require("./empty");

var convertJestFormatToBitFormat = function convertJestFormatToBitFormat(results) {
  var testResults = results.testResults;
  var failures = [];
  var testProps = [];
  var res = testResults.map(function (test) {
    var duration = test.endTime - test.startTime;

    if ((0, isEmpty)(test.assertionResults)) {
      failures.push({
        title: "Test suite failed to run",
        err: {
          message: test.message
        },
        duration: duration
      });
    } else {
      testProps = test.assertionResults.map(function (assertionRes) {
        var title = assertionRes.title;
        var pass = assertionRes.status === "passed" ? true : false;
        var err = !pass ? {
          message: assertionRes.failureMessages[0],
          stack: assertionRes.failureMessages[0]
        } : undefined;
        if (err) return {
          title: title,
          pass: pass,
          duration: duration,
          err: err
        };
        return {
          title: title,
          pass: pass,
          duration: duration
        };
      });
    }

    var StatsProps = {
      start: test.startTime,
      end: test.endTime,
      duration: duration
    };
    var pass = test.status === "passed" ? true : false;
    return {
      tests: testProps,
      stats: StatsProps,
      pass: pass,
      failures: failures
    };
  });
  return res[0];
}; // var getJestFailure = (exports.getJestFailure = function getJestFailure(message) {
//     return {
//         tests: [],
//         pass: false,
//         stats: {
//             start: null,
//             end: null,
//         },
//         failures: [
//             {
//                 title: "Jest failure",
//                 err: {
//                     message: message,
//                 },
//             },
//         ],
//     };
// });


exports.default = convertJestFormatToBitFormat;
module.exports = exports["default"];

//# sourceMappingURL=resultsAdapter.js.map