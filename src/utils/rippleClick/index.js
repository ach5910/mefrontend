function getTransitionEvent(el) {
    const transitions = {
        transition: "transitionend",
        OTransition: "oTransitionEnd",
        MozTransition: "transitionend",
        WebkitTransition: "webkitTransitionEnd"
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const t in transitions) {
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
export function rippleColor(bg = "var(--ripple)") {
    return function rippleCallback(cb, {delayTime = 0, className = "", delay=false} = {}) {
        return function rippleAnimate(e) {
            if(e.preventDefault) e.preventDefault();

            // Transition end event listener callback
            const removeNode = (evt) => {
                const { target:_target } = evt;
                // Remove this listener
                console.log('remove listener')
                evt.target.removeEventListener(getTransitionEvent(_target), removeNode);

                // Remove appended className
                if (className && _target.parentElement) {
                    _target.parentElement.classList.toggle(className);
                }

                // Removed the ripple element from the dom
                _target.remove();

                // Invoke the click handler if delay was set
                if (delay) cb()
            };

            // Get the non svg target
            let { target } = e;
            while (target instanceof SVGElement) {
                target = target.parentElement;
            }

            // Append optional className
            if (className) {
                target.classList.toggle(className);
            }

            // Create ripple element and append it to target
            const ripple = document.createElement("div");
            ripple.classList.add("ripple");
            target.appendChild(ripple);

            // Set transition end event listener to removed the ripple element
            ripple.addEventListener(getTransitionEvent(target), removeNode);

            // Get the origin position of the ripple and the final scale value
            const { offsetX, offsetY } = e.nativeEvent;
            // const scale = `scale(${((target.clientWidth / 100) * 10)})`;
            const scale = `scale(${10})`;

            // Set the new styles to create the ripple effect
            ripple.setAttribute(
                "style",
                `background-color: ${bg}; top: ${offsetY}px; left: ${offsetX}px; transform: ${scale}; webkitTransform: ${scale}; msTransform: ${scale}; opacity: 0.3;`
            );

            // Determine when to trigger invoke the click handler
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
};

const rippleClick = rippleColor();
export default rippleClick;