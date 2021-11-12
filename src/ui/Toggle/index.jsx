import React, {useState, useCallback} from "react";
import {bool, string, func, oneOf} from "prop-types";
import bem from "bembo";
import {stopAllPropagation} from "../../utils";
import "../../styles/partials/_toggle.scss";

const b = bem("toggle");
const sB = bem("selection");
const wB = bem("selection-wrapper");

const Toggle = ({checked, label, value, id: _id, disabled, name, labelPosition, onChange}) => {
    const id = _id || value  || name || label
    const [checkedClass, setCheckedClass] = useState("");

    const handleClickLabel = useCallback(
        (e) => {
            stopAllPropagation(e);
            e.target = e.target.control;
            onChange(e);
        },
        [onChange]
    );

    const handleCheckedClass = useCallback(
        (checked) => (e) => {
            const className = checked ? "unchecked" : "checked";
            setCheckedClass(className);
        },
        [setCheckedClass]
    );

    const handleAnimationEnd = useCallback(
        (e) => {
            if (/opacity-out/.test(e.animationName)) {
                setCheckedClass("");
            }
        },
        [setCheckedClass]
    );

    return (
        <div role="group" aria-owns={`${id}__track-container`}  className={wB.m({[`label-${labelPosition}`]: !!label})}>
            {label && (
                <label
                    className={sB.e("label")}
                    onClick={handleClickLabel}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <div role="group" id={`${id}__track-container`} className={b.e("track-container")}>
                <div
                    className={b.e("track", {checked, disabled})}
                >
                </div>
                    <input
                        id={id}
                        name={name}
                        value={value}
                        disabled={disabled}
                        checked={checked}
                        onClick={handleCheckedClass(checked)}
                        onChange={onChange}
                        className={b.m(checkedClass)}
                        type="checkbox"
                        role="switch"
                    />
                    <div role="button" aria-pressed={checked} aria-controls={id} onAnimationEnd={handleAnimationEnd} className={sB.e("box").m("toggle")}/>
            </div>
        </div>
    );
};

Toggle.defaultProps = {
    label: undefined,
    id: "",
    name: undefined,
    disabled: false,
    labelPosition: "right",
    value: undefined,
};

Toggle.propTypes = {
    /** Checked state of the selection box */
    checked: bool.isRequired,
    /** Change handler */
    onChange: func.isRequired,
    /** Optional text label */
    label: string,
    /** Unique id specified for the input element */
    id: string,
    /** Name of the input element */
    name: string,
    /** Prevents interaction with the checkbox and renders a disabled state */
    disabled: bool,
    /** Position of where the label is rendered with respect to the checkbox */
    labelPosition: oneOf([
        "left",
        "right",
        "top",
        "bottom"
    ]),
    /** Value of the input element, used for form submission */
    value: string,
};

export default Toggle;
