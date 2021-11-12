import React, {useCallback, useRef} from "react";
import PropTypes from "prop-types";
import bem from "bembo";
import {rippleClick} from "../../utils";
import styleShape from "../../propTypes/styleShape";

import "../../styles/partials/_button.scss";

const b = bem("btn");

const Button = ({onClick, label, throttle, disabled, className, style, round, secondary, variant}) => {
    const timeoutId = useRef(null);

    const handleClick = useCallback(
        (e) => {
            if (timeoutId.current === null) {
                rippleClick(onClick, {delayTime: 300})(e);
                timeoutId.current = setTimeout(() => {
                    timeoutId.current = null;
                }, throttle);
            }
        },
        [onClick, throttle]
    );

    return (
        <button
            style={style}
            type="button"
            onClick={handleClick}
            disabled={disabled}
            className={`${b.m({round, secondary}).m(variant)} ${className}`}
        >
            {label}
        </button>
    );
};

Button.defaultProps = {
    label: "",
    secondary: false,
    round: false,
    variant: undefined,
    disabled: false,
    throttle: 200,
    style: {},
    className: "",
};

Button.propTypes = {
    /**
     * Click handler
     */
    onClick: PropTypes.func.isRequired,
    /**
     * Rendered button text
     */
    label: PropTypes.string,
    /** Style the button using the global css secondary color */
    secondary: PropTypes.bool,
    /** Rounded sides on the left and right side */
    round: PropTypes.bool,
    /** Optional button variant */
    variant: PropTypes.oneOf(["", "text", "outline"]),
    /** Renders a disabled color and block onClick events */
    disabled: PropTypes.bool,
    /** Optional throttle time for onClick events */
    throttle: PropTypes.number,
    /** Style overrides */
    style: styleShape,
    /** CSS class  */
    className: PropTypes.string,
};

export default Button;
