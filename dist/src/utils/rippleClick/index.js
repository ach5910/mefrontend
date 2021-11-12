"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rippleColor = rippleColor;
exports["default"] = void 0;

function getTransitionEvent(el) {
  var transitions = {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd"
  }; // eslint-disable-next-line no-restricted-syntax

  for (var t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }

  return "transitionend";
}
/**
 * Creates a ripple animation effect for user clicks and touches
 *
 * @param {func} cb The onClick function for the element
 */


function rippleColor() {
  var bg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "var(--ripple)";
  return function rippleCallback(cb) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$delayTime = _ref.delayTime,
        delayTime = _ref$delayTime === void 0 ? 0 : _ref$delayTime,
        _ref$className = _ref.className,
        className = _ref$className === void 0 ? "" : _ref$className,
        _ref$delay = _ref.delay,
        delay = _ref$delay === void 0 ? false : _ref$delay;

    return function rippleAnimate(e) {
      if (e.preventDefault) e.preventDefault(); // Transition end event listener callback

      var removeNode = function removeNode(evt) {
        var _target = evt.target; // Remove this listener

        console.log('remove listener');
        evt.target.removeEventListener(getTransitionEvent(_target), removeNode); // Remove appended className

        if (className && _target.parentElement) {
          _target.parentElement.classList.toggle(className);
        } // Removed the ripple element from the dom


        _target.remove(); // Invoke the click handler if delay was set


        if (delay) cb();
      }; // Get the non svg target


      var target = e.target;

      while (target instanceof SVGElement) {
        target = target.parentElement;
      } // Append optional className


      if (className) {
        target.classList.toggle(className);
      } // Create ripple element and append it to target


      var ripple = document.createElement("div");
      ripple.classList.add("ripple");
      target.appendChild(ripple); // Set transition end event listener to removed the ripple element

      ripple.addEventListener(getTransitionEvent(target), removeNode); // Get the origin position of the ripple and the final scale value

      var _e$nativeEvent = e.nativeEvent,
          offsetX = _e$nativeEvent.offsetX,
          offsetY = _e$nativeEvent.offsetY; // const scale = `scale(${((target.clientWidth / 100) * 10)})`;

      var scale = "scale(".concat(10, ")"); // Set the new styles to create the ripple effect

      ripple.setAttribute("style", "background-color: ".concat(bg, "; top: ").concat(offsetY, "px; left: ").concat(offsetX, "px; transform: ").concat(scale, "; webkitTransform: ").concat(scale, "; msTransform: ").concat(scale, "; opacity: 0.3;")); // Determine when to trigger invoke the click handler

      if (delayTime && typeof delayTime == "number" && !Number.isNaN(delayTime)) {
        setTimeout(function rippleTimeout() {
          cb();
        }, delayTime);
      } else if (!delay) {
        setTimeout(function zeroRippleTimeout() {
          cb();
        }, 0);
      }
    };
  };
}

;
var rippleClick = rippleColor();
var _default = rippleClick;
exports["default"] = _default;

//# sourceMappingURL=index.js.map