"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = stopAllPropagation;

function stopAllPropagation(e) {
  if (!e) return;
  if (e.preventDefault) e.preventDefault();
  if (e.stopPropagation) e.stopPropagation();
  if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) e.nativeEvent.stopImmediatePropagation();
}

//# sourceMappingURL=index.js.map