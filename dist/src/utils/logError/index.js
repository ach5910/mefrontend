"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = logError;

function logError(msg) {
  return function catchError(err) {
    console.log(msg, err);
  };
}

//# sourceMappingURL=index.js.map