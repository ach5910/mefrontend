import React, {useRef, useCallback} from "react";
import PropTypes from "prop-types";
import bem from "bembo";
import {CloseIcon, CheckIcon}  from "../Icons";
import {alphaNumeric, styleShape} from "../../propTypes";
import {noop, rippleClick, stopAllPropagation} from "../../utils";
// import "../../styles/styles.scss";
import "../../styles/partials/_chip.scss";

const b = bem("chip")

const Chip = ({label, onClick, throttle, Avatar, selected, style, disabled, remove, activated}) => {
    const timeoutId = useRef(null);

    const handleClick = useCallback(
        (e) => {
            stopAllPropagation(e);
            if (timeoutId.current === null) {
                rippleClick(onClick, {delayTime: 300, className: "chip--pressed"})(e);
                timeoutId.current = setTimeout(() => {
                    timeoutId.current = null;
                }, throttle);
            }
        },
        [onClick, throttle]
    );

    return (
        <button style={style} onClick={handleClick} disabled={disabled} tabIndex="0" className={b.m({activated})}>
            {Avatar && (
                <div className={b.e("avatar")}>
                    <Avatar />
                </div>
            )}
            {selected && (
                <div className={b.e("selected")}>
                    <CheckIcon />
                </div>
            )}
            <span className={b.e("text")}>{label}</span>
            {remove && (
                <div className={b.e("remove")}>
                    <CloseIcon />
                </div>
            )}
        </button>
    );
};

Chip.defaultProps = {
    onClick: noop,
    Avatar: null,
    disabled: false,
    remove: false,
    selected: false,
    activated: false,
    style: {},
    throttle: 300,
};

Chip.propTypes = {
    /** Required text render on the chip */
    label: alphaNumeric.isRequired,
    /** Handler for click events */
    onClick: PropTypes.func,
    /** Optional avatar render on the left side of the chip */
    Avatar: PropTypes.node,
    /** Makes the chip inactive when true and renders a disabled state */
    disabled: PropTypes.bool,
    /** Indicates that the chip has been selected and render a check mark on the left side of the chip */
    selected: PropTypes.bool,
    /** Indicated that the chip is the active choice and render a activated state */
    activated: PropTypes.bool,
    /** Renders a remove(x) icon on the right side of the chip */
    remove: PropTypes.bool,
    /** Optional throttle time for onClick events */
    throttle: PropTypes.number,
    /** Style overrides */
    style: styleShape,
};

export default Chip;