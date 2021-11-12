export function InvalidTypeException(expectedType) {
    this.message = `Invalid type, expected ${expectedType}`;
    this.name = "InvalidTypeException";
}

/**
 * @param {string} variableName snake-cased string
 *
 * @returns {string} string formatted to camel-case
 */
export function underscoresToCamelCase(variableName) {
    if (typeof variableName !== "string") {
        throw new InvalidTypeException("string");
    }
    const variableNameChunks = variableName.split("_");
    if (variableNameChunks.length > 1) {
        return variableNameChunks.reduce(
            (newVariableName, nameChunk, index) =>
                newVariableName +
                (index === 0 ? nameChunk.toLowerCase() : nameChunk[0].toUpperCase() + nameChunk.slice(1))
        );
    }
    return variableName;
}

/**
 * @param {Object} responseData snake-cased object
 *
 * @return {Object} object formatted to camel-case
 */
export default function transformPythonResponse(responseData) {
    if (Array.isArray(responseData)) {
        return responseData.map(
            (item) => (typeof item === "object" && item !== null ? transformPythonResponse(item) : item),
            []
        );
    }
    if (typeof responseData === "object" && responseData !== null) {
        const newObject = {};
        Object.keys(responseData).forEach((oldKey) => {
            const newKey = underscoresToCamelCase(oldKey);
            const newVal = transformPythonResponse(responseData[oldKey]);
            newObject[newKey] = newVal;
        });
        return newObject;
    }
    return responseData;
}