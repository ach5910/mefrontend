import React, {useRef, useEffect} from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import {alphaNumeric, numLike} from "../../propTypes";
import {noop, getLineHeight, useUpdateEffect} from "../../utils";
import "../Input/_input.scss";

const Textarea = ({
    label,
    name,
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
    minRows,
    error
}) => {
    const inputRef = useRef(null);
    const baseScrollHeight = useRef(0);
    const lineHeight = useRef(0);

    useEffect(() => {
        const savedValue = inputRef.current.value;
        inputRef.current.value = "";
        inputRef.current.rows = minRows;
        baseScrollHeight.current = inputRef.current.scrollHeight;
        inputRef.current.value = savedValue;
        lineHeight.current = getLineHeight(inputRef.current);

        setTimeout(() => {
            if (inputRef.current){
                inputRef.current.rows = minRows;
                const rows = Math.ceil((inputRef.current.scrollHeight - baseScrollHeight.current) / lineHeight.current);
                inputRef.current.rows = rows + minRows;
            }
        }, 200);
    }, []);

    // Logic for auto auto-sizing the textarea's height base on it's content
    useUpdateEffect(() => {
        inputRef.current.rows = minRows;
        const rows = Math.ceil((inputRef.current.scrollHeight - baseScrollHeight.current) / lineHeight.current);
        inputRef.current.rows = rows + minRows;
    }, [value]);

    return (
        <div
            className={cn("input", className, {
                "input--active-on-focus": editOnFocus && value !== "",
            })}
        >
            <textarea
                ref={inputRef}
                name={`textarea--${name}`}
                tabIndex="0"
                readOnly={readOnly}
                onKeyDown={handleKeyDown}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                required={required}
                aria-describedby={`input__${name}--error`}
                autoComplete="off"
                spellCheck="false"
                className="input__value"
            />
            {label && (
                <label htmlFor={`textarea__${name}`} className="input__label">
                    {label}
                </label>
            )}
            <span id={`input__${name}--error`} className="input__error">
                {error}
            </span>
        </div>
    );
};

Textarea.defaultProps = {
    label: "",
    name: "",
    className: "",
    placeholder: "",
    editOnFocus: false,
    required: false,
    handleKeyDown: noop,
    readOnly: false,
    minRows: 1,
    error: ""
};

Textarea.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    value: alphaNumeric.isRequired,
    editOnFocus: PropTypes.bool,
    required: PropTypes.bool,
    handleKeyDown: PropTypes.func,
    readOnly: PropTypes.bool,
    minRows: numLike,
    error: PropTypes.string
};

export default Textarea;
