import {string, number, oneOfType} from "prop-types";

/**
 * PropType that defines a string or number
 */
export default oneOfType([string, number]);
