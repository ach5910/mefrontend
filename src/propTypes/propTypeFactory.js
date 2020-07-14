import PropTypes from "prop-types";

/**
 * Creates a PropType shape from the propObj and the requested optional
 * and requested props to apply
 *
 * @param {Object} propObj The custom propType's props object wrapped in a object so the name can be used
 *
 * @returns PropType.shape
 */
const propTypeFactory = (propObj) => (
    /** @param {{optional: string[], required: string[]}={}} */ {optional, required} = {}
) => {
    const propTypeObject = {};
    const [[propTypeName, propType]] = Object.entries(propObj);

    /**
     * Throws an error when a prop couldn't be accessed on a propType
     *
     * @param {string} prop
     */
    function logError(prop) {
        throw new Error(`Invalid prop value for ${propTypeName}
            \n${propTypeName}: [${Object.keys(propType)}]
            \nRecieved prop: ${prop}\n`);
    }

    /**
     * Adds the required PropTypes
     *
     * @param {string} prop
     */
    function requiredForEach(prop) {
        if (Object.prototype.hasOwnProperty.call(propType, prop)) {
            propTypeObject[prop] = propType[prop].isRequired;
        } else {
            logError(prop);
        }
    }

    /**
     * Adds the optional PropTypes
     *
     * @param {string} prop
     */
    function optionalForEach(prop) {
        if (Object.prototype.hasOwnProperty.call(propType, prop)) {
            propTypeObject[prop] = propType[prop];
        } else {
            logError(prop);
        }
    }

    if (Array.isArray(optional)) optional.forEach(optionalForEach);

    if (Array.isArray(required)) required.forEach(requiredForEach);

    if (Object.keys(propTypeObject).length == 0) return PropTypes.shape(propType);

    return PropTypes.shape(propTypeObject);
};

export default propTypeFactory;
