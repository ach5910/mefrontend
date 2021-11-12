import React from "react";
import {func, string} from "prop-types";
import bem from "bembo";
import PickerButton from "./PickerButton";

const b = bem("date-picker-header");

const DatePickerHeader = ({handleMonth, handleYear, year, month}) => {
    return (
        <div className={b}>
            <PickerButton classNames={["left-arrows", "left-arrows"]} handleClick={handleYear(-1)}/>
            <PickerButton classNames={["left-arrow"]} handleClick={handleMonth(-1)}/>
            <div className={b.e("center")}>
                <div className={b.e("year")}>{year}</div>
                <div className={b.e("month")}>{month}</div>
            </div>
            <PickerButton classNames={["right-arrow"]} handleClick={handleMonth(1)}/>
            <PickerButton classNames={["right-arrows", "right-arrows"]} handleClick={handleYear(1)}/>
        </div>
    );
};

DatePickerHeader.propTypes = {
    handleMonth: func.isRequired,
    handleYear: func.isRequired,
    year: string.isRequired,
    month: string.isRequired
};

export default DatePickerHeader;
