"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var inputTypes = [window.HTMLInputElement, window.HTMLSelectElement, window.HTMLTextAreaElement];
/**
 * Programmatically trigger React's onChange handler
 * 
 * @param {Node} node 
 * @param {string} value 
 */

var triggerInputChange = function triggerInputChange(node) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  // only process the change on elements we know have a value setter in their constructor
  if (inputTypes.indexOf(node.__proto__.constructor) > -1) {
    // Get reference to the node's value setter
    var setValue = Object.getOwnPropertyDescriptor(node.__proto__, 'value').set;
    var event = new Event('input', {
      bubbles: true
    }); // Update node.value then dispatch an event

    setValue.call(node, value);
    node.dispatchEvent(event);
  }
};

var _default = triggerInputChange;
exports["default"] = _default;

//# sourceMappingURL=index.js.map