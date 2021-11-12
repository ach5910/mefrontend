import React, {useState, useCallback} from "react";
import {bool, string, func, oneOf} from "prop-types";
import bem from "bembo";
import {CheckIcon} from "../Icons";
import {stopAllPropagation} from "../../utils";
// import "../../styles/styles.scss";
// import "../../styles/partials/_selection.scss";
import "../../styles/partials/_checkbox.scss";

const b = bem("checkbox");
const sB = bem("selection")
const wB = bem("selection-wrapper")

const Checkbox = ({checked, disabled, label, id:_id, name, onChange, labelPosition}) => {
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
        <div role="group" className={wB.m({[`label-${labelPosition}`]: !!label})}>
            {label && (
                <label
                    className={sB.e("label")}
                    onClick={handleClickLabel}
                    id={`${id}__label`}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <div role="group" className="selection-container">
                <input
                    id={id}
                    name={name}
                    checked={checked}
                    onClick={handleCheckedClass(checked)}
                    onChange={onChange}
                    className={b.m(checkedClass)}
                    type="checkbox"
                    aria-hidden="true"
                    disabled={disabled}
                />
                <div
                    onAnimationEnd={handleAnimationEnd}
                    role="checkbox"
                    aria-checked={checked}
                    aria-disabled={disabled}
                    aria-labelledby={`${id}__label`}
                    className={sB.e("box").m("checkbox")}
                >
                    <CheckIcon role="presentation" className={b.e("check")} />
                </div>
            </div>
        </div>
    );
};

Checkbox.defaultProps = {
    label: undefined,
    id: "",
    name: undefined,
    disabled: false,
    labelPosition: "right"
};

Checkbox.propTypes = {
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
    ])
};

export default Checkbox;
