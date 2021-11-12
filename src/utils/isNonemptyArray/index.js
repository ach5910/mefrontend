/**
 * @param {*} arr
 *
 * @returns {boolean}
 */
export default function isNonemptyArray(arr) {
    return Array.isArray(arr) && arr.length > 0;
}