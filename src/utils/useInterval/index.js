import { useRef, useEffect } from "react";

/**
 * Custom hook that sets up an interval and clears it after unmounting.
 * It’s a combo of setInterval and clearInterval tied to the component lifecycle.
 * 
 * @param {function} callback
 * @param {int} delay
 */
export default function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    // eslint-disable-next-line consistent-return
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}