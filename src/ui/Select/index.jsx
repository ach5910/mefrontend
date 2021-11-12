import React, {useState, useCallback, useRef, useEffect} from "react";
import PropTypes from "prop-types";
// import cn from "classnames";
import bem from "bembo";
// import SelectMenu from "./SelectMenu";
import {alphaNumeric, ref} from "../../propTypes";
// import ChevronDown from "../Icons/ChevronDown";
import stopAllPropagation from "../../utils/stopAllPropagation";
import noop from "../../utils/noop";
import ChevronDownIcon from "../Icons/ChevronDownIcon";
import Menu from "../Menu";
import "../../styles/partials/_select.scss";
import Chip from "../Chip";
import { useMeasure, useDeepUpdateEffect } from "../../utils";

const b = bem("select")

const renderText = (val) => `${val}`.replace(/,/gi, ", ");

function renderInputValue(value, renderValue, handleRemove){
    if (Array.isArray(value)){
        if (typeof handleRemove == "function"){
            return value.map((name) => <Chip label={name} remove onClick={handleRemove(name)} />)
        }
        if (typeof renderValue == "function"){
            return  value.map(renderValue)
        }
    }
    return renderText(value)
}
const Select = ({
    options,
    value,
    label,
    chips,
    handleRemove,
    className,
    renderValue,
    children
}) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    useDeepUpdateEffect(() => {
        if (!Array.isArray(value)){
            setOpen(false)
        }
    }, [value, setOpen])

    const handleClose = useCallback(
        (e) => {
            // Cancel event bubbling so select div's onClick handler isn't triggered
            stopAllPropagation(e);
            setOpen(false);
        },
        [setOpen]
    );

    const [{ref}] = useMeasure(open);
    ref.current = anchorRef.current;

    const menu = React.cloneElement(children, {anchorRef, options, selected: value,  handleClose, open});
    return (
        <div ref={anchorRef} onClick={() => setOpen(true)} role="menu" tabIndex="-1" className={`${b} ${className}`}>
            <div className={b.e("value", {chips})}>
                {renderInputValue(value, renderValue, handleRemove)}
            </div>
            <span className={b.e("label")}>{label}</span>
            <ChevronDownIcon className={b.e("arrow")} />
            {menu}
        </div>
    );
};

Select.defaultProps = {
    value: "",
    label: "",
    multi: false,
    className: "",
    anchorRef: null,
    renderValue: null,
    containerRef: null,
    handleRemove: undefined,
    handleSelect: undefined
};

Select.propTypes = {
    /** The selected menu option(s) */
    value: PropTypes.oneOfType([alphaNumeric, PropTypes.arrayOf(alphaNumeric)]),
    /** Input description */
    label: PropTypes.string,
    /** Array of objects to render list items */
    options: PropTypes.arrayOf(
        PropTypes.oneOfType([
            alphaNumeric,
            PropTypes.shape({
                value: alphaNumeric,
            }),
        ])
    ).isRequired,
    /** onClick handlers for list items */
    handleSelect: PropTypes.func,
    /** Optional className appended to the container component */
    className: PropTypes.string,
    /** Render Prop func called on every input value passing its value as an argument */
    renderValue: PropTypes.func,
    /** Reference to the element that the menu should position itself in */
    containerRef: ref,
    /** Deselect input callback only used for rendering chips */
    handleRemove: PropTypes.func
};

export default Select;
