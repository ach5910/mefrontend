import { useRef, useState, useEffect } from "react";

import ResizeObserver from "resize-observer-polyfill";

/**
 * Hook that's used to observe changes to a components bounding client rect
 *
 * @return {Object:bind, Object:rect}
 */
export default function useMeasure(connect = true) {
    const ref = useRef();
    const [bounds, set] = useState({left: 0, top: 0, width: 0, height: 0});
    const [ro] = useState(
        () =>
            new ResizeObserver(([entry]) => {
                set(entry.contentRect);
            })
    );
    useEffect(() => {
        if (connect) {
            ro.observe(ref.current);
        } else if (ro && ro.disconnect) {
            ro.disconnect();
        }
        return () => {
            if (ro && ro.disconnect) {
                ro.disconnect();
            }
        };
    }, [connect]);
    return [{ref}, bounds];
}