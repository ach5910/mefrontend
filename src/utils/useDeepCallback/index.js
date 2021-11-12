import { useCallback } from "react";
import useDeepCompareDeps from "../useDeepCompareDeps";

/**
 * Deep compares useCallback dependencies
 * 
 * @param {Function} callback 
 * @param {any[]} deps Hook dependencies
 * 
 * @returns {Function}
 */
export default function useDeepCallback(callback, deps) {
    return useCallback(callback, useDeepCompareDeps(deps));
}