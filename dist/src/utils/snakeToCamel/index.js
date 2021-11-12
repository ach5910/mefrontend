"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidTypeException = InvalidTypeException;
exports.underscoresToCamelCase = underscoresToCamelCase;
exports["default"] = transformPythonResponse;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function InvalidTypeException(expectedType) {
  this.message = "Invalid type, expected ".concat(expectedType);
  this.name = "InvalidTypeException";
}
/**
 * @param {string} variableName snake-cased string
 *
 * @returns {string} string formatted to camel-case
 */


function underscoresToCamelCase(variableName) {
  if (typeof variableName !== "string") {
    throw new InvalidTypeException("string");
  }

  var variableNameChunks = variableName.split("_");

  if (variableNameChunks.length > 1) {
    return variableNameChunks.reduce(function (newVariableName, nameChunk, index) {
      return newVariableName + (index === 0 ? nameChunk.toLowerCase() : nameChunk[0].toUpperCase() + nameChunk.slice(1));
    });
  }

  return variableName;
}
/**
 * @param {Object} responseData snake-cased object
 *
 * @return {Object} object formatted to camel-case
 */


function transformPythonResponse(responseData) {
  if (Array.isArray(responseData)) {
    return responseData.map(function (item) {
      return _typeof(item) === "object" && item !== null ? transformPythonResponse(item) : item;
    }, []);
  }

  if (_typeof(responseData) === "object" && responseData !== null) {
    var newObject = {};
    Object.keys(responseData).forEach(function (oldKey) {
      var newKey = underscoresToCamelCase(oldKey);
      var newVal = transformPythonResponse(responseData[oldKey]);
      newObject[newKey] = newVal;
    });
    return newObject;
  }

  return responseData;
}

//# sourceMappingURL=index.js.map