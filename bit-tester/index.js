"use strict"; // Do this as the first thing so that any code reading it knows the right env.

process.env.BABEL_ENV = "test";
process.env.NODE_ENV = "test";
process.env.PUBLIC_URL = ""; // Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.

process.on("unhandledRejection", function (err) {
  throw err;
}); // Ensure environment variables are read.
// require("../config/env");

var jsdomFourteen = require("jest-environment-jsdom-fourteen");

// var idenityObjProxy = require("identity-obj-proxy");

// var reactAppPolyfillJsdom = require("react-app-polyfill/jsdom");
// var reactAppPolyfillStable = require("react-app-polyfill/stable");

var readResults = require("./readResults");

var resultsAdapter = require("./resultsAdapter");

var jest = require("jest");

function run(specfile) {
  return new Promise(function (resolve, reject) {
    var argv = [specfile];

    if (process.env.CI) {
      argv.push("--passWithNoTests");
      argv.push("--reporters=default");
      argv.push("--reporters=jest-junit");
    }

    argv.push("--config='" + __dirname + "/bitJest.config.js'");
    argv.push("--rootDir=" + require('path').dirname(specfile));
    argv.push("--silent");
    argv.push("--json");
    argv.push("--outputFile='results.json'");
    argv.push("--detectOpenHandles");
    jest.run(argv).then(function (res) {
      var parsedResults = readResults("results.json");
      var adapted = resultsAdapter(parsedResults);
      resolve(adapted);
    })["catch"](function (err) {
      resolve(err);
    });
  });
}

exports["default"] = {
  run: run,
  globals: {
    jest: jest
  },
  modules: {
    jest: jest
  }
};
module.exports = exports['default'];