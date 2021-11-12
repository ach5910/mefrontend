"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getLineHeight;

/**
 * Calculates the lineHeight of an element
 * @param {Node} element 
 * 
 * @returns {number} lineHeight
 */
function getLineHeight(element) {
  var temp = document.createElement(element.nodeName);
  temp.className = element.className;
  temp.setAttribute("style", "margin:0px;padding:0px;");
  if (temp.type == "textarea") temp.rows = 1;
  temp.innerHTML = "test";
  temp = element.parentNode.appendChild(temp);
  var ret = temp.clientHeight;
  temp.parentNode.removeChild(temp);
  return ret;
}

//# sourceMappingURL=index.js.map