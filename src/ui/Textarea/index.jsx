import React, {useRef, useEffect} from "react";
import PropTypes from "prop-types";
import bem from "bembo";
import {alphaNumeric, numLike} from "../../propTypes";
import {noop, getLineHeight, useUpdateEffect} from "../../utils";
// import "../../styles/styles.scss";
import "../../styles/partials/_input.scss";

const b = bem("input");

const Textarea = ({
    label,
    name,
    required,
    className,
    onChange,
    value,
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
            className={`${b.m({"edit-on-focus": editOnFocus && value !== ""})} ${className}`}
        >
            <textarea
                ref={inputRef}
                name={`textarea--${name}`}
                tabIndex="0"
                readOnly={readOnly}
                onKeyDown={handleKeyDown}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                aria-describedby={`input__${name}--error`}
                autoComplete="off"
                spellCheck="false"
                className={b.e("value")}
            />
            {label && (
                <label htmlFor={`textarea__${name}`} className={b.e("label")}>
                    {label}
                </label>
            )}
            <span id={`input__${name}--error`} className={b.e("error")}>
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
    /** Optional text label */
    label: PropTypes.string,
    /** Unique id specified for the input element */
    id: PropTypes.string,
    /** Text are name */
    name: PropTypes.string,
    /** Optional class */
    className: PropTypes.string,
    /** Placeholder string when the textarea is empty */
    placeholder: PropTypes.string,
    /** Handler for change events */
    onChange: PropTypes.func.isRequired,
    /** Textarea value as a string */
    value: alphaNumeric.isRequired,
    /** 
     * When active, the input element renders as a text element with no border or background. When the
     * text is click the component toggled to behave like editable input element which returns back to
     * it's static text appearance when a valid value is set and the element isn not focused.
     */
    editOnFocus: PropTypes.bool,
    /** Boolean indicating whether the textarea must hold a truthy value */
    required: PropTypes.bool,
    /** Optional keydown event handler */
    handleKeyDown: PropTypes.func,
    /** Controls whether the textarea's value can be updated while not rendering a disabled state */
    readOnly: PropTypes.bool,
    /** Minimum number of rows the textarea should render */
    minRows: numLike,
    /** Error  message supplied for an invalid value */
    error: PropTypes.string
};

export default Textarea;
