export const oneDay = 60 * 60 * 24 * 1000;
export const todayDate = dateString(new Date(Date.now()));

export const monthMap = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];


export function getOffsetTimestamp(timestamp){
    return timestamp - (timestamp % oneDay) + new Date().getTimezoneOffset() * 1000 * 60;
}

/**
 * Returns an array containing the year and month that precedes the
 * current date by one month. Months are evaluated by their index
 * @param {number} year 
 * @param {number} month 
 * 
 * @returns {number[]}
 */
export function prevMonth(year, month) {
    const prevMonth = (month + 11) % 12;
    const prevYear = prevMonth == 11 ? year - 1 : year;
    return [prevYear, prevMonth];
}

export function getDayIndex(idx) {
    return idx % 7;
}

/**
 * Returns the month's position relative to the active month. The returned
 * number will either be -1 for the prev month, 0 for the curr month or 
 * 1 for the next month.
 * 
 * @param {number} days Number of days in the month
 * @param {number} dateIdx Index of that date based on the months first day
 * 
 * @returns {number}
 */
export function monthInc(days, dateIdx) {
    return [0, days, Infinity].findIndex((v) => dateIdx < v) - 1;
}

/**
 * Returns a day object that includes the values required to render the date
 * on the calendar. 
 * @param {{idx: number, firstDay: number, year: number, month: number, numberOfDays:number}}
 * 
 * @returns {{value: number: dayIndex: number, monthPosition: number, date: string}}
 */
export function getDayDetails({idx, firstDay, year, month, numberOfDays}) {
    let dateIdx = idx - firstDay;
    // Day display value
    let value = dateIdx % numberOfDays;

    // When the day is from the prev month, calc the value for the date based on
    // the number of days in the month
    if (dateIdx < 0) {
        value = getNumberOfDays(...prevMonth(year, month)) + dateIdx;
    }
    value++;

    // Get the month offset with respect to the active month
    const monthPosition = monthInc(numberOfDays, dateIdx);
    return {
        value,
        dayIndex: getDayIndex(idx),
        monthPosition,
        date: new Date(year, month + monthPosition, value).toISOString().split("T")[0],
    };
}

export function getNumberOfDays(year, month) {
    return 40 - new Date(year, month, 40).getDate();
}

/**
 * Creates arrays of day objects used to render a
 * calendar
 * 
 * @param {number} year
 * @param {number} month
 */
export function getCalendarDays(year, month) {
    const firstDay = new Date(year, month).getDay();
    const numberOfDays = getNumberOfDays(year, month);

    // Calendar size is 7x6
    const days = [];
    for (let idx = 0; idx < 42; idx++){
        days.push(getDayDetails({idx, numberOfDays, firstDay, year, month}))
    }
    return days;
}

export function dateString(timestamp) {
    let dateObject = new Date(timestamp);
    return dateObject.toISOString().split("T")[0];
}

export function getYearMonth(dateValue) {
    const date = new Date(dateValue);
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
    };
}

export const getMonthStr = (month) => monthMap[Math.max(Math.min(11, month), 0)] || "Month";


export const isCurrentDay = ({date}) => date == todayDate;

export const isDisabledDay = ({monthPosition}) => monthPosition != 0;

export const isValidValue = (value) => /\d{4}-\d{2}-\d{2}/.test(value) && !Number.isNaN(new Date(value).getTime())

export function getInitialState(value){
    if (isValidValue(value)){
        const {year, month} = getYearMonth(value)
        return {
            year,
            month,
            days: getCalendarDays(year, month)
        }
    }
    return null;
}