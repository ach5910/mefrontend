import React, {useCallback} from "react";
import {func, string, shape, number, arrayOf} from "prop-types";
import bem from "bembo";
import "../../styles/partials/_calendar.scss";

const b = bem("calendar");

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayShortNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const Calendar = ({isSelectedDay, isCurrentDay, isDisabledDay, handleClick, days}) => {
    const getDayModifiers = useCallback(
        (day) => ({
            disabled: isDisabledDay(day),
            current: isCurrentDay(day),
            selected: isSelectedDay(day),
        }),
        [isSelectedDay, isCurrentDay, isDisabledDay]
    );

    return (
        <div className={b}>
            <div className={b.e("container")}>
                <div className={b.e("weekdays")}>
                    {dayShortNames.map((name) => (
                        <div key={name} className={b.e("weekday")}>
                            {name}
                        </div>
                    ))}
                </div>
                <div className={b.e("body")}>
                    {days.map((day) => (
                        <div className={b.e("day", getDayModifiers(day))} key={day.date}>
                            <div className={b.e("day-container")}>
                                <span onClick={handleClick(day.date)}>{day.value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

Calendar.propTypes = {
    isSelectedDay: func.isRequired,
    isCurrentDay: func.isRequired,
    isDisabledDay: func.isRequired,
    handleClick: func.isRequired,
    days: arrayOf(shape({
        date: string,
        value: number
    })).isRequired
};

export default Calendar;
