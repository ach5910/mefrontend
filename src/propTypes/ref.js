import {oneOfType, func, shape, instanceOf} from "prop-types";

/**
 *
 * Represents a React ref of an element
 *
 */
export default oneOfType([func, shape({current: instanceOf(Element)})]);