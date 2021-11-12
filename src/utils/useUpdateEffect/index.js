import { useRef, useEffect } from "react";

/**
 * Custom hooks that doesn't fire the callback when the component mounts.
 * Replicates the React class componentDidUpdate life cycle method.
 * @param {function} fn
 * @param {any[]} deps Dependencies
 */
export default function useUpdateEffect(fn, deps) {
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) {
            fn();
        } else {
            isMounted.current = true;
        }
    }, deps);
}