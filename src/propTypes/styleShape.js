import {objectOf, oneOfType, string, number} from "prop-types";

/**
 * Prop Type for an element's style object
 */
export default objectOf(oneOfType([string, number]));