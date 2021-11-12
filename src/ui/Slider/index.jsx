/* eslint-disable no-shadow */
/* eslint-disable no-fallthrough */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {useCallback, useRef, useEffect} from "react";
import {number, func} from "prop-types";
import {useSpring, a} from "react-spring";
import {useDrag} from "react-use-gesture";
import bem from "bembo";

import {
    useMeasure,
    stopAllPropagation,
    clamp,
    usePrevious,
} from "../../utils";

import "../../styles/partials/_slider.scss";

const b = bem("slider");

const thumbSpringSettings = {
    immediate: true,
    config: {clamp: true},
};

const Slider = ({value, min, max, step, handleChange}) => {
    const range = max - min;
    const prevValue = usePrevious(value);
    const thumbRef = useRef(null);
    const [bind, {width}] = useMeasure();

    const getValue = useCallback(
        (mx) => {
            const rawValue = (mx / width) * range + min;
            const stepOverflow = rawValue % step;
            const baseStepValue = rawValue - stepOverflow;
            const stepOverflowValue = Math.round(stepOverflow / step) * step;
            return clamp(baseStepValue + stepOverflowValue, min, max);
        },
        [range, min, max, width, step]
    );

    const getX = useCallback((val) => ((val - min) / range) * width, [min, width, range]);

    const [thumbSpring, setThumb] = useSpring(() => ({
        x: getX(value),
        config: {clamp: true},
        immediate: true,
    }));

    useEffect(() => {
        if (value != prevValue) {
            setThumb({x: getX(value), ...thumbSpringSettings});
        }
    }, [setThumb, prevValue, getX, value, min, width, range]);


    const bindThumb = useDrag(
        ({down, memo, movement: [mx], event}) => {
            stopAllPropagation(event);
            if (down && memo != mx) {
                const val = getValue(mx);
                if (val !== value) {
                    handleChange(event, val);
                }
            }
            return mx;
        },
        {
            axis: "x", // Only allow x axis dragging
            domTarget: thumbRef,
            filterTaps: true,
            eventOptions: {passive: false}, // Allows bubbling to be canceled
            bounds: {left: 0, right: width},
            initial: () => [thumbSpring.x.get(), 0],
        }
    );

    // Alternative for binding a spring to component
    useEffect(bindThumb, [bindThumb]);

    const handleClick = useCallback(
        (e) => {
            const {clientX, target} = e;
            handleChange(e, getValue(clientX - target.getBoundingClientRect().left));
        },
        [handleChange, getValue]
    );

    console.log(Slider.__docgenInfo);
    return (
        <div className={b}>
            <div {...bind} className={b.e("track")} tabIndex="-1" role="button" onClick={handleClick} />
            <a.div style={thumbSpring} className={b.e("thumb")}>
                <div className={b.e("thumb-label")}>
                    <span>{value}</span>
                </div>
                <span ref={thumbRef} draggable="false" className={b.e("thumb-overlay")} />
            </a.div>
        </div>
    );
};

Slider.defaultProps = {
    step: 1,
};

Slider.propTypes = {
    /** Lower limit for the slider's range */
    min: number.isRequired,
    /** Upper limit for the slider's range */
    max: number.isRequired,
    /** Slider input value, updated via handleChange callback */
    value: number.isRequired,
    /** Smallest valid increment to between neighboring positions */
    step: number,
    /** Handler for when the value changes */
    handleChange: func.isRequired,
};

export default Slider;
