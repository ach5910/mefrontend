/**
 * Returns a number bounds to an inclusive upper and lower limit
 *
 * @param {number} val
 * @param {number} min lower bound
 * @param {number} max upper bound
 *
 * @returns {number}
 */
export default function clamp(val, min = 0, max = 100) {
    return Math.min(Math.max(val, min), max);
}