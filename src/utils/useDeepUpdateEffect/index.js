import { useRef } from "react";
import useDeepEffect from "../useDeepEffect";

/**
 * Custom hooks that doesn't fire the callback when the component mounts and does a deep
 * object comparison to register a change in it's dependencies
 * @param {function} fn
 * @param {any[]} deps Dependencies
 */
export default function useDeepUpdateEffect(fn, deps) {
    const isMounted = useRef(false);

    useDeepEffect(() => {
        if (isMounted.current) {
            fn();
        } else {
            isMounted.current = true;
        }
    }, deps);
}