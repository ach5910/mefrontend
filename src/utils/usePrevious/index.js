import { useRef, useEffect } from "react";

/**
 * Creates a reference to a variables previous value.
 * @param {any} value 
 * 
 * @returns {any} Previous value
 */
export default function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}