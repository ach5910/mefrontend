import React from "react";
import {func, string, arrayOf} from "prop-types";
import bem from "bembo";
import ChevronDownIcon from "../Icons/ChevronDownIcon";

const b = bem("date-picker-header");

const PickerButton = ({classNames, handleClick}) => (
    <div className={b.e("btn-container")}>
        <div className={b.e("btn")} onClick={handleClick}>
            {classNames.map(((className, i) => (
                <ChevronDownIcon className={b.e(className)} key={`picker-button--${className}--${i}`} />
            )))}
        </div>
    </div>
)

PickerButton.propTypes = {
    classNames: arrayOf(string).isRequired,
    handleClick: func.isRequired
}

export default PickerButton;