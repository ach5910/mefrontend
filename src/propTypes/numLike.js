import {string, number, oneOfType} from 'prop-types';

/**
 * PropType that defines number that may be represented as a string.
 */
export default oneOfType([string, number]);