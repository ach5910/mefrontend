import React, {useState, useCallback, useRef, useEffect} from "react";
import {string, func} from "prop-types";
import bem from "bembo";
import CalendarIcon from "../Icons/CalendarIcon";
import Calendar from "../Calendar";
import DatePickerHeader from "./DatePickerHeader";

import useDeepCallback from "../../utils/useDeepCallback";
import stopAllPropagation from "../../utils/stopAllPropagation";
import useDeepEffect from "../../utils/useDeepEffect";
import useOnClickOutside from "../../utils/useOnClickOutside";
import useStateObject from "../../utils/useStateObject";

import { getCalendarDays, getInitialState, getMonthStr, isCurrentDay, isDisabledDay, isValidValue, todayDate } from "./utils";

import "../../styles/partials/_date-picker.scss";

const b = bem("date-picker");
const inB = bem("search");



export const DatePicker = ({name, label, value, handleChange}) => {
    const fallbackValue = useRef(todayDate);
    const prevValue = useRef(value)
    const [showPicker, setShowPicker] = useState(false);
    const [state, setState] = useStateObject(null);
    const ref = useRef(null);

    // Handle fallback value support
    useEffect(() => {
        if (!isValidValue(value)){
            handleChange(fallbackValue.current)
        } else if (fallbackValue.current != value){
            fallbackValue.current = value;
        }
    }, [value, handleChange]);

    // Initialize state with a valid value
    useEffect(() => {
        if (state === null && isValidValue(value)){
            setState(getInitialState(value))
        }
    }, [setState, state,  value])

    

    const closePicker = useCallback(() => {
        if (showPicker) setShowPicker(false);
    }, [showPicker, setShowPicker]);

    const togglePicker = useCallback(
        (e) => {
            stopAllPropagation(e);
            setShowPicker((prev) => !prev);
        },
        [setShowPicker]
    );

    useOnClickOutside(ref, closePicker);

    const isSelectedDay = useCallback(
        (day) => {
            return day.date === value;
        },
        [value]
    );

    const handleYear = useDeepCallback(
        (offset) => () => {
            const year = state.year + offset;
            setState({
                year,
                days: getCalendarDays(year, state.month),
            });
        },
        [state, setState]
    );

    const handleMonth = useDeepCallback(
        (offset) => () => {
            let {month, year} = state;
            month += offset;
            if (month < 0 || month > 11) {
                year += offset;
                month -= offset * 12;
            }
            setState({
                year,
                month,
                days: getCalendarDays(year, month),
            });
        },
        [state, setState]
    );

    // Update state when value changes
    useDeepEffect(() => {
        if(prevValue.current !== value){
            if (typeof state?.year == "number" && typeof state?.month == "number" && isValidValue(value)){
                const newVals = value.split("-").map(Number);
                const {year, month} = state;

                if (newVals[0] != year) {
                    handleYear(newVals[0] - year)();
                } else if (newVals[1] != month + 1) {
                    handleMonth(newVals[1] - (month + 1))();
                }
            }
            prevValue.current = value;
        }
    }, [value, state, setState, handleMonth, handleYear])

    /**
     * Handles changes from date input via changing the
     * date text
     *
     * @param {e: {target: {value: string}}} value Date input value in YYYY-MM-DD format
     */
    const handleInputChange = useCallback(
        (e) => {
            // Only update the state if the timestamp extracted from the input value is valid
            if (isValidValue(e.target.value)) {
                handleChange(e.target.value);
            }
        },
        [handleChange]
    );

    const handleDateClick = useCallback(
        (date) => () => {
            handleChange(date)
        },
        [handleChange]
    );

    console.log(DatePicker.__docgenInfo);

    return (
        <div className={b} ref={ref}>
            <div className={inB} onClick={stopAllPropagation}>
                <input
                    required
                    className={inB.e("input")}
                    id={`date-picker__${name}`}
                    onChange={handleInputChange}
                    type="date"
                    value={value}
                />
                {label && false && (
                    <label htmlFor={`date-picker__${name}`} className={inB.e("label")}>
                        {label}
                    </label>
                )}
                <div
                    onClick={togglePicker}
                    tabIndex="-1"
                    role="button"
                    className={inB.e("icon")}
                    style={{cursor: "pointer"}}
                >
                    <CalendarIcon />
                </div>
            </div>
            {showPicker && state && (
                <div className={b.e("container")}>
                    <DatePickerHeader
                        handleYear={handleYear}
                        handleMonth={handleMonth}
                        year={state.year}
                        month={getMonthStr(state.month)}
                    />
                    <Calendar
                        days={state.days}
                        isSelectedDay={isSelectedDay}
                        isCurrentDay={isCurrentDay}
                        isDisabledDay={isDisabledDay}
                        handleClick={handleDateClick}
                    />
                </div>
            )}
        </div>
    );
};

DatePicker.defaultProps = {
    value: "",
    name: "date-picker",
    label: "Date"
};

DatePicker.propTypes = {
    /** ISO representation of the selected date */
    value: string,
    /** Callback for handling date input changes */
    handleChange: func.isRequired,
    /** Unique name within the applications namespace for setting aria ids */
    name: string,
    /** Descriptive title rendered above the input */
    label: string
};

export default DatePicker;