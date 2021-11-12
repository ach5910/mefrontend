import { useState } from "react";

/**
 * Tracks the focused state of a Component by spreading the bind object on the 
 * component that should be tracked.
 * 
 * @returns {{focused: bool, bind: {onFocus: Function, onBlur: Function}} 
 */
export default function useFocus() {
    const [focused, set] = useState(false);
    return {
        focused,
        bind: {
            onFocus: () => set(true),
            onBlur: () => set(false),
        },
    };
}