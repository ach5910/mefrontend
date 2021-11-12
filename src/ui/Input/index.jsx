/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import bem from "bembo";
import {alphaNumeric, numLike, ref} from "../../propTypes";
import {noop} from "../../utils";
// import "../../styles/styles.scss";
import "../../styles/partials/_input.scss";

const b = bem("input");

const Input = ({
    label,
    name,
    pattern,
    required,
    className,
    handleChange,
    value,
    /**
     * When active, the input element renders as a text element with no border or background. When the
     * text is click the component toggled to behave like editable input element which returns back to
     * it's static text appearance when a valid value is set and the element isn not focused.
     * @type {bool}
     */
    editOnFocus,
    placeholder,
    handleKeyDown,
    readOnly,
    bindInput,
    tabIndex,
    type,
    min,
    max,
    step,
    error
}) => (
    <div
        className={`${b.m({"edit-on-focus": editOnFocus && value !== ""})} ${className}`}
    >
        <input
            name={name}
            type={type}
            tabIndex={tabIndex}
            readOnly={readOnly}
            pattern={pattern}
            onKeyDown={handleKeyDown}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            required={required}
            autoComplete="off"
            className={b.e("value")}
            aria-describedby={`input__${name}--error`}
            id={`input__${name}`}
            min={min}
            max={max}
            step={step}
            {...bindInput}
        />
        {label && (
            <label htmlFor={`input__${name}`} className={b.e("label")}>
                {label}
            </label>
        )}
        <span id={`input__${name}--error`} className={b.e("error")}>
            {error}
        </span>
    </div>
);

Input.defaultProps = {
    label: "",
    name: "",
    className: "",
    placeholder: undefined,
    editOnFocus: false,
    required: false,
    pattern: undefined,
    handleKeyDown: noop,
    readOnly: false,
    bindInput: {},
    tabIndex: "0",
    type: "text",
    min: "",
    max: "",
    step: "any",
    error: ""
};

Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    value: alphaNumeric.isRequired,
    editOnFocus: PropTypes.bool,
    required: PropTypes.bool,
    pattern: PropTypes.string,
    handleKeyDown: PropTypes.func,
    readOnly: PropTypes.bool,
    tabIndex: numLike,
    type: PropTypes.string,
    min: numLike,
    max: numLike,
    step: alphaNumeric,
    error: PropTypes.string,
    bindInput: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func, ref])),
};

export default Input;
