import React, {useState, useCallback} from "react";
import {bool, string, func, oneOf} from "prop-types";
import bem from "bembo";
import {stopAllPropagation} from "../../utils";
import "../../styles/partials/_radio.scss";

const b = bem("radio");
const sB = bem("selection")
const wB = bem("selection-wrapper")


const Radio = ({checked, name, value, disabled, onChange, label, id:_id, labelPosition}) => {
    const id = _id || name || label;
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
            e.persist();
            const className = checked ? "unchecked" : "checked";
            setCheckedClass(className);
        },
        [setCheckedClass]
    );

    const handleAnimationEnd = useCallback(
        (e) => {
            if (/opacity-out/.test(e.animationName)){
                setCheckedClass("")
            }
        },
        [setCheckedClass]
    )

    return (
        <div role="group" aria-owns={`${id}-container`} className={wB.m({[`label-${labelPosition}`]: !!label})}>
            {label && (
                <label
                    className={sB.e("label")}
                    value={value}
                    onClick={handleClickLabel}
                    htmlFor={value}
                >
                    {label}
                </label>
            )}
            <div id={`${id}-container`} role="group" aria-owns={id} className="selection-container">
                <input
                    id={value}
                    name={name}
                    value={value}
                    checked={checked}
                    onClick={handleCheckedClass(checked)}
                    onChange={onChange}
                    className={b.m(checkedClass)}
                    type="radio"
                    disabled={disabled}
                />
                <div
                    onAnimationEnd={handleAnimationEnd}
                    className={sB.e("box").m("radio")}
                    aria-controls={`${id},${id}__check`}
                >
                    <span id={`${id}__check`} role="radio" aria-checked={checked} className={b.e("check")} />
                </div>
            </div>
        </div>
    );
};

Radio.defaultProps = {
    label: undefined,
    id: "",
    name: undefined,
    disabled: false,
    labelPosition: "right",
    value: undefined,
};

Radio.propTypes = {
    /**Checked state of the selection box */
    checked: bool.isRequired,
    /**Change handler */
    onChange: func.isRequired,
    /**Optional text label */
    label: string,
    /**Unique id specified for the input element */
    id: string,
    /**Name of the input element */
    name: string,
    /**Prevents interaction with the checkbox and renders a disabled state */
    disabled: bool,
    /**Position of where the label is rendered with respect to the checkbox */
    labelPosition: oneOf([
        "left",
        "right",
        "top",
        "bottom"
    ]),
    /**Value of the input element, used for form submission */
    value: string,
};

export default Radio;
